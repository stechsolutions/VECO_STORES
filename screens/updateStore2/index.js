import React, { Component, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Modal,
  PermissionsAndroid,
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
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import storage from '@react-native-firebase/storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppPicker from '../../Components/AppPicker'

export default function UpdateStore2({ navigation, route, changeFirstTime }) {
  const [storeName, setStoreName] = useState('');
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
  const [RUC, setRUC] = useState('');
  const [DV, setDV] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const createStoreFunc = async () => {
    // changeFirstTime();
    // setLoading(true);
    // var user = JSON.parse(await AsyncStorage.getItem('user'));
    // console.log(user, 'userr');
    // var profile = await fetch(image);
    // var profileBlob = await profile.blob();
    // var document = await fetch(documentImage);
    // var documentBlob = await document.blob();
    // var imageUrl, documentUrl;
    // storage()
    //   .ref(`store/${user.userId}/${Date.now()}`)
    //   .put(profileBlob)
    //   .on(
    //     'state_changed',
    //     () => { },
    //     () => { },
    //     (imgResponse) =>
    //       imgResponse.ref.getDownloadURL().then((url) => {
    //         imageUrl = url;
    //         storage()
    //           .ref(`store/${user.userId}/${Date.now()}`)
    //           .put(documentBlob)
    //           .on(
    //             'state_changed',
    //             () => { },
    //             () => { },
    //             (imgResponse) =>
    //               imgResponse.ref.getDownloadURL().then((url) => {
    //                 documentUrl = url;
    //                 const store = {
    //                   storeName,
    //                   imageUrl,
    //                   // location, commenting because location is already provided in locationDetailArray
    //                   documentUrl,
    //                   userId: user.userId,
    //                   latLongs: locationDetailsArray,
    //                 };
    //                 console.log(store, 'store');
    //                 firestore()
    //                   .collection('store')
    //                   .add(store)
    //                   .then(async (storeData) => {
    //                     console.log('store Created');
    //                     await AsyncStorage.setItem(
    //                       'store',
    //                       JSON.stringify({ storeId: storeData.id, ...store }),
    //                     );
    //                     await firestore()
    //                       .collection('distributer')
    //                       .doc(user.userId)
    //                       .update({ firstTime: false });
    //                     changeFirstTime();
    //                     user.firstTime = false;
    //                     AsyncStorage.setItem(
    //                       'user',
    //                       await JSON.stringify(user),
    //                     ).then(() => {
    //                       console.log('user updated', user);
    //                       setLoading(false);
    //                       navigation.navigate('Home');
    //                     });
    //                   })
    //                   .catch((e) => {
    //                     setLoading(false);
    //                     console.log(e, 'err');
    //                   });
    //               }),
    //           );
    //       }),
    //   );
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
          getLoc.then(({ latitude, longitude }) => {
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
    const temp = { location, coordinate: tempCoordinate };
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
    <Screen style={{ backgroundColor: colors.light }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <AppTextInput
          value={storeName}
          onChangeText={(txt) => {
            setStoreName(txt);
          }}
          style={styles.mVertical}
          placeHolder="Administrative Contact"
        />
        <AppTextInput
          value={location}
          onChangeText={(txt) => {
            setLocation(txt);
          }}
          style={styles.mVertical}
          placeHolder="Administrative Phone"
        />

        <AppTextInput
          value={location}
          onChangeText={(txt) => {
            setLocation(txt);
          }}
          style={styles.mVertical}
          placeHolder="Technical Contact"
        />

        <AppTextInput
          value={location}
          onChangeText={(txt) => {
            setLocation(txt);
          }}
          style={styles.mVertical}
          placeHolder="Technical Phone"
        />
        <AppTextInput
          value={location}
          onChangeText={(txt) => {
            setLocation(txt);
          }}
          style={styles.mVertical}
          placeHolder="Whatsapp line"
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="Photo of the Operation"
          onPress={() => {
            handleImageUpload();
          }}
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="Photo of the ID of the Legal Representative"
          onPress={() => {
            handleImageUpload();
          }}
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="Business Photo"
          onPress={() => {
            handleImageUpload();
          }}
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="Digial Signature"
          onPress={() => {
            handleImageUpload();
          }}
        />
        {/* <AppPhotoInput
          onPress={handleDocumentImageUpload}
          style={styles.mVertical}
          placeHolder="Document Image"
        /> */}
        {/* {documentImage && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Image source={{ uri: documentImage }} style={styles.image} />
            <Text>Document Image</Text>
          </View>
        )}
        {image ? (
          <TouchableOpacity
            onPress={handleImageUpload}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ) : (
            <AppImageUploadButton
              style={styles.imageButton}
              onPress={handleImageUpload}
              title="Add Store Logo"
            />
          )} */}
        <View>
          <Text style={styles.termsHead}>Terms and Conditions</Text>
          <Text style={styles.termsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
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
                style={{ paddingRight: 5 }}
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
            <Text style={styles}>I have read and accept the terms and conditions </Text>
          </View>
        </View>
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
            style={[styles.btn, styles.mVertical]}
            title="Update Store"
            onPress={createStoreFunc}
          />
        </View>
      </ScrollView>
      <Modal style={{ flex: 1 }} visible={showModal} animationType="slide">
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
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
            style={[styles.modalBtn, { backgroundColor: colors.white }]}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
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
    alignItems: 'flex-end'
  },
  termsHead: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  termsText: {
    marginHorizontal: 10,
    paddingBottom: 20,
    fontSize: 12
  }
});
