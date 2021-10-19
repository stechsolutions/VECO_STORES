import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppImageTitleView from '../../Components/AppImageTitleView';
import MapView, {Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
// import colors from '../../config/colors';
import AppPicker from '../../Components/AppPicker';
import AppRadioButton from '../../Components/AppRadioButton';
import AppButton from '../../Components/AppButton';
import AppTextInput from '../../Components/AppTextInput';
import AppPhotoInput from '../../Components/AppPhotoInput';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const moreMessages = [
  {
    id: 1,
    title: 'Product Name',
    subTitle: 'Approved',

    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 8,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 9,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 10,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 11,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 12,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 13,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
];

const lessMessages = [
  {
    id: 1,
    title: 'Product Name',
    subTitle: 'Approved',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
];

const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [moreMessage, setMoreMessage] = useState(moreMessages);
  const [lessMessage, setLessMessage] = useState(lessMessages);
  const [tab, setTab] = useState('more');
  const [location, setLocation] = useState('');
  const [locationToEdit, setLocationToEdit] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationDetailsArray, setLocationDetailsArray] = useState([]);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [tempCoordinate, setTempCoordinate] = useState();
  const [checked, setchecked] = useState('COD');
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subAdminsList, setSubAdminsList] = useState([]);

  useEffect(() => {
    console.log('USE EFFECT >>>>');
    getCurrentLocation();
    getSubAdmins();
  }, []);

  const create = async () => {
    setLoading(true);
    const store = JSON.parse(await AsyncStorage.getItem('store'));
    const obj = {fullName, phone, email, storeId: store.storeId, location};
    var profile = await fetch(image);
    var profileBlob = await profile.blob();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        storage()
          .ref(`subAdmins/${res.user.uid}/${Date.now()}`)
          .put(profileBlob)
          .on(
            'state_changed',
            () => {},
            () => {},
            (imgResponse) =>
              imgResponse.ref.getDownloadURL().then((url) => {
                console.log(url, 'url');
                obj.image = url;
                return firestore()
                  .collection('subAdmins')
                  .doc(res.user.uid)
                  .set(obj);
              }),
          );
      })
      .then(() => {
        setLoading(false);
        console.log('subAdmin Created');
        Alert.alert(
          'SubAdmin Created',
          'SubAdmin has been created successfully',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      })
      .catch((e) => {
        setLoading(false);
        Alert.alert('Error', e.message, [{text: 'OK'}], {cancelable: false});
        console.log(e.message, 'err');
      });
  };

  const getSubAdmins = async () => {
    const store = JSON.parse(await AsyncStorage.getItem('store'));
    firestore()
      .collection('subAdmins')
      .where('storeId', '==', store.storeId)
      .onSnapshot((snapshot) => {
        var subAdmins = [];
        snapshot.forEach((e) => {
          subAdmins.push({...e.data(), userId: e.id});
        });
        setSubAdminsList(subAdmins);
        console.log(subAdmins, 'subAdmins');
      });
  };
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
  const pickImageHandler = () => {
    setShowModal(false);
    ImagePicker.launchImageLibrary(
      {
        title: 'Pick an Image',
        maxWidth: 800,
        maxHeight: 600,
      },
      (res) => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          console.log(res.uri, 'uri');
          setImage(res.uri);
        }
      },
    );
  };
  return (
    <Screen style={styles.container}>
      {console.log('tab>>>', tab)}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('more')}>
          <Text
            style={[styles.text, tab === 'more' && {color: colors.primary}]}>
            Create
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('less')}>
          <Text
            style={[styles.text, tab === 'less' && {color: colors.primary}]}>
            View and Edit
          </Text>
        </TouchableOpacity>
      </View>
      {/* create sales man section */}
      {tab === 'more' && (
        <ScrollView style={{flex: 1, padding: 10}}>
          <AppImageTitleView
            onPress={pickImageHandler}
            image={image}
            title="Order Name"
            subTitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab necessitatibus incidunt in debitis, nostrum doloremque quae nemo eius dolor sit temporibus aperiam commodi fugit possimus sunt consectetur similique explicabo maiores."
          />
          <View style={styles.inputView}>
            <AppTextInput
              value={fullName}
              onChangeText={(txt) => setFullName(txt)}
              placeHolder="Full Name"
            />
          </View>
          <View style={styles.inputView}>
            <AppTextInput
              value={phone}
              onChangeText={(txt) => setPhone(txt)}
              placeHolder="Phone/ Whatsapp"
            />
          </View>
          <View style={styles.inputView}>
            <AppPhotoInput
              map
              style={styles.mVertical}
              placeHolder={
                location
                  ? `${location.latitude}, ${location.longitude}`
                  : 'Longitude/Latitude'
              }
              onPress={() => {
                checkPermission();
              }}
            />
          </View>
          <View style={styles.inputView}>
            <AppTextInput
              value={email}
              onChangeText={(txt) => setEmail(txt)}
              placeHolder="E-mail"
            />
          </View>
          <View style={styles.inputView}>
            <AppTextInput
              value={password}
              onChangeText={(txt) => setPassword(txt)}
              placeHolder="Password"
            />
          </View>
          <View>
            <Text style={styles.termsHead}>Terms and Conditions</Text>
            <Text style={styles.termsText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              {termsAccepted ? (
                <AntDesign
                  onPress={() => {
                    setTermsAccepted(false);
                  }}
                  color={colors.primary}
                  size={20}
                  name="checkcircle"
                  style={{paddingRight: 5}}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setTermsAccepted(true);
                  }}>
                  <View
                    style={{
                      width: 21,
                      height: 21,
                      backgroundColor: colors.white,
                      borderWidth: 2,
                      borderColor: colors.primary,
                      borderRadius: 20,
                      marginRight: 5,
                    }}></View>
                </TouchableOpacity>
              )}
              <Text style={styles}>
                I have read and accept the terms and conditions{' '}
              </Text>
            </View>
          </View>

          <View style={styles.subContainer}>
            <AppButton
              disabled={
                !fullName ||
                !phone ||
                !image ||
                !location ||
                !email ||
                !password ||
                !termsAccepted
              }
              loading={loading}
              onPress={create}
              color={colors.primary}
              style={styles.btn}
              title="Create SubAdmin"
            />
          </View>
        </ScrollView>
      )}
      {tab === 'less' && (
        <FlatList
          data={subAdminsList}
          keyExtractor={(message) => message.userId.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.fullName}
              image={{uri: item.image}}
              btnText="View"
              variant="success"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      )}
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
              // locationToEdit ? handleUpdateLocation : handleCoordinateSet
              () => {
                setLocation(tempCoordinate ? tempCoordinate : markerCoordinate);
                setShowModal(false);
              }
            }
          />
        </View>
      </Modal>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 16,
    color: colors.medium,
  },
  subContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radionButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  cardIcons: {
    margin: 5,
  },
  btn: {
    padding: 15,
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  inputView: {
    margin: 10,
  },
  termsHead: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  termsText: {
    marginHorizontal: 10,
    paddingBottom: 20,
    fontSize: 12,
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
