import React, {Component, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Modal,
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
import ImagePicker from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import storage from '@react-native-firebase/storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import RNLocation from 'react-native-location';

export default function EditStore(props) {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [docImage, setDocImage] = useState('');
  const [image, setImage] = useState();
  const [documentImage, setDocumentImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [tempCoordinate, setTempCoordinate] = useState();
  const [locationDetailsArray, setLocationDetailsArray] = useState([]);
  const [locationToEdit, setLocationToEdit] = useState();

  useEffect(() => {
    console.log('effect chala');
    setStoreValues();
    enableLocationPermission();
  }, []);

  const enableLocationPermission = () => {
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

  const setStoreValues = async () => {
    const store = JSON.parse(await AsyncStorage.getItem('store'));
    setStoreName(store.storeName);
    setLocation(store.location);
    setLocationDetailsArray(store.latLongs);
    setImage(store.imageUrl);
    setDocumentImage(store.documentUrl);
    console.log(image, 'imageee');
  };

  const editStore = async () => {
    setLoading(true);
    var user = JSON.parse(await AsyncStorage.getItem('user'));
    var storeId = JSON.parse(await AsyncStorage.getItem('store'));
    console.log(storeId, 'storeId');
    if (image !== storeId.imageUrl && documentImage !== storeId.documentUrl) {
      var response = await fetch(image);
      var imageBlob = await response.blob();
      var response2 = await fetch(documentImage);
      var documentBlob = await response2.blob();
      storage()
        .ref(`store/${user.userId}/${Date.now()}`)
        .put(imageBlob)
        .on(
          'state_changed',
          () => {},
          () => {},
          (imageResponse) => {
            imageResponse.ref.getDownloadURL().then((url) => {
              var imageUrl = url;
              storage()
                .ref(`store/${user.userId}/${Date.now()}`)
                .put(documentBlob)
                .on(
                  'state_changed',
                  () => {},
                  () => {},
                  (imageResponse) => {
                    imageResponse.ref.getDownloadURL().then((url) => {
                      var documentUrl = url;
                      const store = {
                        storeName,
                        location,
                        latLongs: locationDetailsArray,
                        documentUrl,
                        imageUrl,
                        userId: user.userId,
                      };
                      console.log(store, 'store');
                      firestore()
                        .collection('store')
                        .doc(storeId.storeId)
                        .update(store)
                        .then(() => {
                          AsyncStorage.setItem(
                            'store',
                            JSON.stringify({
                              storeId: storeId.storeId,
                              ...store,
                            }),
                          ).then(() => {
                            setLoading(false);
                            Alert.alert(
                              'Store Updated',
                              'your store has been updated successfully',
                              [
                                {
                                  text: 'OK',
                                  onPress: () => console.log('pressed ok'),
                                },
                              ],
                              {cancelable: false},
                            );
                            console.log('Store updated');
                            props.route.params.updateStore();

                            console.log('Navigation');
                          });
                        })
                        .catch((e) => {
                          console.log(e, 'eeee');
                          setLoading(false);
                          Alert.alert(
                            'Something Went Wrong',
                            e.message,
                            [
                              {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                              },
                            ],
                            {cancelable: false},
                          );
                        });
                    });
                  },
                );
            });
          },
        );
    } else if (documentImage !== storeId.documentUrl) {
      var response = await fetch(documentImage);
      var documentBlob = await response.blob();
      storage()
        .ref(`store/${user.userId}/${Date.now()}`)
        .put(documentBlob)
        .on(
          'state_changed',
          () => {},
          () => {},
          (imageResponse) => {
            imageResponse.ref.getDownloadURL().then((url) => {
              var documentUrl = url;
              const store = {
                storeName,
                location,
                latLongs: locationDetailsArray,
                documentUrl,
                imageUrl: image,
                userId: user.userId,
              };
              firestore()
                .collection('store')
                .doc(storeId.storeId)
                .update(store)
                .then(() => {
                  AsyncStorage.setItem(
                    'store',
                    JSON.stringify({storeId: storeId.storeId, ...store}),
                  ).then(() => {
                    setLoading(false);
                    Alert.alert(
                      'Store Updated',
                      'your store has been updated successfully',
                      [{text: 'OK', onPress: () => console.log('pressed ok')}],
                      {cancelable: false},
                    );
                    console.log('Store updated');
                    props.route.params.updateStore();
                  });
                })
                .catch((e) => {
                  console.log(e, 'eeee');
                  setLoading(false);
                  Alert.alert(
                    'Something Went Wrong',
                    e.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                });
            });
          },
        );
    } else if (image !== storeId.imageUrl) {
      var response = await fetch(image);
      var imageBlob = await response.blob();
      storage()
        .ref(`store/${user.userId}/${Date.now()}`)
        .put(imageBlob)
        .on(
          'state_changed',
          () => {},
          () => {},
          (imageResponse) => {
            imageResponse.ref.getDownloadURL().then((url) => {
              var imageUrl = url;
              const store = {
                storeName,
                location,
                latLongs: locationDetailsArray,
                documentUrl: documentImage,
                imageUrl,
                userId: user.userId,
              };
              firestore()
                .collection('store')
                .doc(storeId.storeId)
                .update(store)
                .then(() => {
                  AsyncStorage.setItem(
                    'store',
                    JSON.stringify({storeId: storeId.storeId, ...store}),
                  ).then(() => {
                    setLoading(false);
                    Alert.alert(
                      'Store Updated',
                      'your store has been updated successfully',
                      [{text: 'OK', onPress: () => console.log('pressed ok')}],
                      {cancelable: false},
                    );
                    console.log('Store updated');
                    props.route.params.updateStore();
                  });
                })
                .catch((e) => {
                  console.log(e, 'eeee');
                  setLoading(false);
                  Alert.alert(
                    'Something Went Wrong',
                    e.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                });
            });
          },
        );
    } else {
      const store = {
        storeName,
        location,
        latLongs: locationDetailsArray,
        documentUrl: documentImage,
        imageUrl: image,
        userId: user.userId,
      };
      firestore()
        .collection('store')
        .doc(storeId.storeId)
        .update(store)
        .then(() => {
          AsyncStorage.setItem(
            'store',
            JSON.stringify({storeId: storeId.storeId, ...store}),
          ).then(() => {
            setLoading(false);
            Alert.alert(
              'Store Updated',
              'your store has been updated successfully',
              [{text: 'OK', onPress: () => console.log('pressed ok')}],
              {cancelable: false},
            );
            console.log('Store updated');
            props.route.params.updateStore();
          });
        })
        .catch((e) => {
          console.log(e, 'eeee');
          setLoading(false);
          Alert.alert(
            'Something Went Wrong',
            e.message,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        });
    }
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

    if (!locationToEdit) enableLocationPermission();
    console.log(granted);
    setTempCoordinate(markerCoordinate);
    setShowModal(true);
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
        <AppTextInput
          value={storeName}
          onChangeText={(txt) => {
            setStoreName(txt);
          }}
          style={styles.mVertical}
          placeHolder="Store Name"
        />
        <AppTextInput
          value={location}
          onChangeText={(txt) => {
            setLocation(txt);
          }}
          style={styles.mVertical}
          placeHolder="Location"
        />
        <AppPhotoInput
          style={styles.mVertical}
          add
          placeHolder="Latitude Longitude"
          onPress={() => {
            checkPermission();
          }}
        />
        {locationDetailsArray.length > 0 && (
          <Text style={styles.title}>
            {locationDetailsArray.length} Location
            {locationDetailsArray.length > 1 && 's'} Added
          </Text>
        )}
        <View style={styles.locationDetailContainer}>
          {locationDetailsArray.map((item, index) => (
            <LocationDetail
              title={`${
                item.location
                  ? `${item.location}\n${item.coordinate.latitude}, ${item.coordinate.latitude}`
                  : `${item.coordinate.latitude}, ${item.coordinate.latitude}`
              }`}
              onPress={() => {
                setShowModal(true);
                setMarkerCoordinate({
                  latitude: item.coordinate.latitude,
                  longitude: item.coordinate.longitude,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                });
                setLocationToEdit({item, index});
              }}
              onClose={() => handleRemoveLocation(index)}
              key={index}
            />
          ))}
        </View>
        <AppPhotoInput
          onPress={handleDocumentImageUpload}
          style={styles.mVertical}
          placeHolder="Document Image"
        />
        {documentImage && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 100, height: 100, borderRadius: 20}}
              source={{uri: documentImage}}
            />
            <Text>Document Image</Text>
          </View>
        )}
        {image ? (
          <TouchableOpacity
            onPress={handleImageUpload}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Image
              style={{width: 100, height: 100, borderRadius: 20}}
              source={{uri: image}}
            />
          </TouchableOpacity>
        ) : (
          <AppImageUploadButton
            onPress={handleImageUpload}
            style={styles.imageButton}
            title="Add Store Logo"
          />
        )}
        <AppButton
          loading={loading}
          style={[styles.btn, styles.mVertical]}
          title="UPDATE STORE"
          onPress={editStore}
        />
      </ScrollView>
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
});
