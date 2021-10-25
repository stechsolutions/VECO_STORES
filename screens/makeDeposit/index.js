import React, {Component, useEffect, useState} from 'react';
import AppText from '../../Components/AppText';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Screen from '../../Components/Screen';
import AppTextInput from '../../Components/AppTextInput';
import colors from '../../config/colors';
import AppPhotoInput from '../../Components/AppPhotoInput';
import AppButton from '../../Components/AppButton';
import LocationDetail from '../../Components/LocationDetail';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import storage from '@react-native-firebase/storage';
import AppPicker from '../../Components/AppPicker';
// import { color } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from '../../Components/Modal';

export default function MakeDeposit({navigation, route, changeFirstTime}) {
  const [storeName, setStoreName] = useState('');
  const [RUC, setRUC] = useState('');
  const [DV, setDV] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const [location, setLocation] = useState('');
  const [docImage, setDocImage] = useState('');
  const [image, setImage] = useState();
  const [documentImage, setDocumentImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [documentImageUrl, setDocumentImageUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [tempCoordinate, setTempCoordinate] = useState();
  const [locationToEdit, setLocationToEdit] = useState();
  const [locationDetailsArray, setLocationDetailsArray] = useState([]);

  const [modal, setModal] = useState(false);

  const next = async () => {
    if (
      (amount !== '' || amount !== ' ') &&
      (RUC !== '' || RUC !== ' ') &&
      (DV !== '' || DV !== ' ') &&
      (storeName !== '' || storeName !== ' ') &&
      (cardNumber !== '' || cardNumber !== ' ') &&
      (location !== '' || location !== ' ')
    )
      setModal(true);
    else
      Alert.alert('Error', 'Please fill all the fields', [{text: 'OK'}], {
        cancelable: false,
      });
    // navigation.navigate('createStore2')
  };

  useEffect(() => {
    console.log('USE EFFECT >>>>');
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
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
    }).then((granted) => {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then((data) => {
          const getLoc = RNLocation.getLatestLocation();
          getLoc.then(({latitude, longitude}) => {
            console.log('Lat Long >>', latitude, longitude);
            setMarkerCoordinate({
              latitude,
              longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            });
          });
        })
        .catch((e) => console.log(e));
    });
  };

  const handleImageUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setImage(response.uri);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDocumentImageUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setDocumentImage(response.uri);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    // console.log(granted);
    if (granted) {
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access location?',
          message:
            'To get a store location, you need to provide the location access',
        },
      );
    }
    // console.log(granted);
    if (!locationToEdit) getCurrentLocation();
    setShowModal(true);
    setTempCoordinate(markerCoordinate);
  };

  const handleCoordinateSet = () => {
    setShowModal(false);
    const temp = {location, coordinate: tempCoordinate};
    const arr = [...locationDetailsArray];
    arr.push(temp);
    setLocation('');
    setLocationDetailsArray(arr);
  };

  const handleUpdateLocation = () => {
    console.log('BEFORE UPDATE >>>', locationDetailsArray);
    let arr = [...locationDetailsArray];
    arr[locationToEdit.index] = {
      coordinate: tempCoordinate,
      location: location ? location : locationToEdit.item.location,
    };
    setLocationDetailsArray(arr);
    setLocationToEdit(null);
    setLocation('');
    setShowModal(false);
    console.log('AFTER UPDATE >>>', locationDetailsArray);
  };

  const handleRemoveLocation = (index) => {
    console.log(index);
    const arr = [...locationDetailsArray];
    arr.splice(index, 1);
    setLocationDetailsArray(arr);
  };

  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <AppPicker style={styles.mVertical} title="Select Dealer" />
        <AppPicker style={styles.mVertical} title="Select the Purchase Order" />
        <AppTextInput
          multiline={true}
          numberOfLines={6}
          // value={location}
          onChangeText={(txt) => {
            // setLocation(txt);
          }}
          style={[
            styles.mVertical,
            {backgroundColor: 'white', borderWidth: 0.3, borderRadius: 20},
          ]}
          placeHolder="Description of the deposit"
        />
        <View style={{borderBottomWidth: 0.5, marginVertical: 30}} />
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{paddingHorizontal: 10, color: colors.dark}}>
            Your Card Details
          </Text>
          <View style={styles.iconsView}>
            <FontAwesome style={styles.icons} name="cc-mastercard" size={30} />
            <FontAwesome style={styles.icons} name="cc-visa" size={30} />
          </View>
        </View>
        <AppTextInput
          value={storeName}
          onChangeText={(txt) => {
            setStoreName(txt);
          }}
          style={styles.mVertical}
          placeHolder="Card Holder Name"
        />
        <AppTextInput
          value={cardNumber}
          onChangeText={(txt) => {
            setCardNumber(txt);
          }}
          style={styles.mVertical}
          placeHolder="Card Number"
        />
        <View style={[styles.subContainer, styles.mVertical]}>
          <AppTextInput
            value={RUC}
            onChangeText={(txt) => {
              setRUC(txt);
            }}
            style={styles.halfInput}
            placeholder="Expiry Date"
          />
          <AppTextInput
            value={DV}
            onChangeText={(txt) => {
              setDV(txt);
            }}
            style={styles.halfInput}
            placeholder="CVC "
          />
        </View>
        <AppTextInput
          value={amount}
          onChangeText={(txt) => {
            setAmount(txt);
          }}
          style={styles.mVertical}
          placeHolder="Amount"
        />
        <View style={styles.createBtnView}>
          <AppButton
            // disabled={
            //   !storeName ||
            //   !location ||
            //   !locationDetailsArray.length ||
            //   !documentImage ||
            //   !image
            // }
            loading={loading}
            style={[styles.btn, styles.mVertical, {width: '90%'}]}
            title="Make Deposit"
            onPress={next}
          />
        </View>
      </ScrollView>
      <Modal style={{flex: 1}} visible={showModal} animationType="slide">
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          showsMyLocationButton
          showsUserLocation
          // initialRegion={{
          // latitude: 24.860966,
          // longitude: 66.990501,
          // latitudeDelta: 0.04,
          // longitudeDelta: 0.05,
          // }}
          initialRegion={markerCoordinate}>
          <Marker
            draggable={true}
            onDragEnd={(e) => {
              console.log(e.nativeEvent.coordinate, 'coordinates');
              setTempCoordinate(e.nativeEvent.coordinate);
            }}
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
            onPress={
              locationToEdit ? handleUpdateLocation : handleCoordinateSet
            }
          />
        </View>
      </Modal>
      <Modal onClose={() => setModal(false)} visible={modal}>
        <AppText style={styles.modalHead}>Deposit Done!</AppText>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <AntDesign name="checkcircleo" color="#253370" size={100} />
        </View>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <AppText style={styles.link}>See Details</AppText>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <AppButton
            fontSize={14}
            onPress={() => navigation.navigate('PaymentMethods')}
            color={colors.primary}
            title="SEND PROOF PAYMENT TO DISTRIBUTOR"
            style={{
              marginVertical: 30,
              marginHorizontal: 20,
              padding: 15,
              width: '80%',
            }}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  mVertical: {
    marginVertical: 10,
  },
  locationDetailContainer: {
    flexDirection: 'row',
    padding: 15,
    flexWrap: 'wrap',
  },
  title: {
    color: colors.dark,
  },
  imageButton: {
    width: 150,
    alignSelf: 'center',
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  halfInput: {
    width: '48%',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createBtnView: {
    alignItems: 'center',
  },
  icons: {
    paddingHorizontal: 5,
  },
  iconsView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 5,
  },
  modalHead: {
    textAlign: 'center',
    fontSize: 20,
    color: '#666666',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 18,
  },
});
