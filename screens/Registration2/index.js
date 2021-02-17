import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AppAttachFileButton from '../../Components/AppAttachFileButton';
import AppButton from '../../Components/AppButton';
import AppMultiLineInput from '../../Components/AppMultiLineInput';
import AppPhotoInput from '../../Components/AppPhotoInput';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const {width: WIDTH} = Dimensions.get('window');
const Registration2 = ({navigation, route}) => {
  const [address, setAddress] = useState('');
  const [latitude, setLatidute] = useState('');
  const [longitude, setLongitude] = useState('');
  const [noOfBranches, setNoOfBranches] = useState('');
  const [adminContact, setAdminContact] = useState('');
  const [technicalContact, setTechnicalContact] = useState('');
  const [technicalPhone, setTechnicalPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [tempCoordinate, setTempCoordinate] = useState();
  const [location, setLocation] = useState([]);

  useEffect(() => {
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    })
      .then((granted) => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then((data) => {
            const getLoc = RNLocation.getLatestLocation();
            getLoc.then(({latitude, longitude}) => {
              console.log('Lat LONG >>', latitude, longitude);
              setLatidute(latitude);
              setLongitude(longitude);
              setMarkerCoordinate({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
              });
            });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  const checkPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('Check PErmission>>>', granted);
    if (granted) {
      console.log(granted);
      setShowModal(true);
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access location?',
          message:
            'To get a store location, you need to provide the location access',
        },
      );
      console.log(granted);
      setShowModal(true);
    }
  };

  const handleCoordinateSet = () => {
    setShowModal(false);
    if (tempCoordinate) setLocation(tempCoordinate);
    else setLocation(markerCoordinate);
  };
  const next = () => {
    const reg1Data = route.params.reg1Data;
    const reg2Data = {
      address,
      latitude,
      longitude,
      noOfBranches,
      adminContact,
      technicalContact,
      technicalPhone,
    };
    navigation.navigate('Registration3', {reg2Data, reg1Data});
  };

  return (
    <Screen style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/icons/background.png')}
        style={{flex: 1}}
        resizeMode="cover">
        <View
          style={{
            flex: 1,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/icons/logo.png')}
            resizeMode="cover"
          />
          <Image
            source={require('../../assets/icons/slogan.png')}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          style={{elevation: 1}}
          onPress={() => navigation.goBack()}>
          <View style={styles.backIconContainer}>
            <MaterialCommunityIcons
              style={styles.backIcon}
              name="keyboard-backspace"
              color={colors.black}
              size={24}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 3,
            backgroundColor: colors.light,

            borderRadius: 30,
            overflow: 'hidden',
          }}>
          <ScrollView style={{paddingHorizontal: 10}}>
            <Text style={styles.title}>Registration</Text>
            <AppPhotoInput
              style={styles.mVertical}
              placeHolder={
                location.latitude && location.longitude
                  ? `${location.latitude}   ${location.longitude}`
                  : 'Latitude Longitude'
              }
              map
              onPress={checkPermission}
            />

            <AppMultiLineInput
              onChangeText={(txt) => setAddress(txt)}
              value={address}
              style={styles.mVertical}
              placeholder="Full Address"
            />
            <AppTextInput
              onChangeText={(txt) => setNoOfBranches(txt)}
              value={noOfBranches}
              style={styles.mVertical}
              placeHolder="Number of Branches"
            />
            <AppTextInput
              onChangeText={(txt) => setAdminContact(txt)}
              value={adminContact}
              style={styles.mVertical}
              placeHolder="Administrative Contact"
            />
            <AppTextInput
              onChangeText={(txt) => setTechnicalContact(txt)}
              value={technicalContact}
              style={styles.mVertical}
              placeHolder="Technical Contact"
            />
            <AppTextInput
              onChangeText={(txt) => setTechnicalPhone(txt)}
              value={technicalPhone}
              style={styles.mVertical}
              placeHolder="Technical Phone"
            />
            <View style={[styles.btnContainer, styles.mVertical]}>
              <View style={styles.circle} />
              <View style={[styles.circle, styles.filled]} />
              <View style={styles.circle} />
              <AppButton
                disabled={
                  !address ||
                  !latitude ||
                  !longitude ||
                  !noOfBranches ||
                  !adminContact ||
                  !technicalContact ||
                  !technicalPhone
                }
                onPress={next}
                style={styles.btn}
                title="Next"
                color={colors.primary}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <Modal style={{flex: 1}} visible={showModal} animationType="slide">
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          showsUserLocation
          initialRegion={markerCoordinate}>
          <Marker
            draggable
            onDragEnd={(e) => setTempCoordinate(e.nativeEvent.coordinate)}
            coordinate={markerCoordinate}
          />
        </MapView>
        <View style={styles.modalBtnContainer}>
          <AppButton
            style={[styles.modalBtn, {backgroundColor: colors.white}]}
            title="CLose"
            onPress={() => setShowModal(false)}
          />
          <AppButton
            style={styles.modalBtn}
            color={colors.primary}
            title="Done"
            onPress={handleCoordinateSet}
          />
        </View>
      </Modal>
    </Screen>
  );
};

export default Registration2;

const styles = StyleSheet.create({
  mVertical: {
    marginVertical: 10,
  },
  title: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  halfInput: {
    width: '50%',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  btn: {
    padding: 15,
    marginLeft: 10,
    width: 100,
  },
  circle: {
    margin: 3,
    height: 7,
    width: 7,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
  },
  filled: {
    backgroundColor: colors.secondary,
  },
  backIconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    marginLeft: 20,
    top: 13,
    elevation: 1,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    // position: 'absolute',
    // top: -10,
  },

  modalBtnContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    padding: 15,
    margin: 15,
  },
});
