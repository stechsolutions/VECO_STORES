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
import {corregimientos, provinces, districts} from '../../config/data';

export default function UpdateStore({navigation}) {
  const [storeName, setStoreName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [nameOfTheLegalRepresentative, setNameOfTheLegalRepresentative] =
    useState('');
  const [IDOfTheLegalRepresentative, setIDOfTheLegalRepresentative] =
    useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [corregimiento, setCorregimiento] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [noOfBranches, setNoOfBranches] = useState('');
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

  const next = async () => {
    const data = {
      tradeName: storeName,
      DV,
      IDOfTheLegalRepresentative,
      RUC,
      businessName,
      location: locationDetailsArray,
      district,
      corregimiento,
      fullAddress,
      nameOfTheLegalRepresentative,
      province,
      noOfBranches,
    };
    navigation.navigate('UpdateStore2', {update1Data: data});
  };

  useEffect(() => {
    getCurrentLocation();
    getData();
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
    var arr = [];
    if (locationDetailsArray.length) arr = [...locationDetailsArray];
    arr.push(temp);
    // setLocation('');
    setLocationDetailsArray(arr);
  };

  const handleUpdateLocation = () => {
    console.log('BEFORE UPDATE >>>', locationDetailsArray);
    let arr = [];
    if (locationDetailsArray.length) arr = [...locationDetailsArray];
    arr[locationToEdit.index] = {
      coordinate: tempCoordinate,
      location: location ? location : locationToEdit.item.location,
    };
    setLocationDetailsArray(arr);
    setLocationToEdit(null);
    // setLocation('');
    setShowModal(false);
    console.log('AFTER UPDATE >>>', locationDetailsArray);
  };

  const handleRemoveLocation = (index) => {
    console.log(index);
    const arr = [...locationDetailsArray];
    arr.splice(index, 1);

    try {
      arr.length >= 0
        ? setLocation(arr[arr.length - 1]['location'])
        : setLocation('');
    } catch (e) {
      console.log(e);
      setLocation('');
    }

    setLocationDetailsArray(arr);
  };

  const getLocationCordinates = () => {
    try {
      return `${
        locationDetailsArray[locationDetailsArray.length - 1]?.coordinate
          .latitude
      } ${
        locationDetailsArray[locationDetailsArray.length - 1]?.coordinate
          .longitude
      }`;
    } catch (e) {
      console.log(e);
    }
  };

  const getLocationName = () => {
    try {
      return locationDetailsArray[locationDetailsArray.length - 1]?.location;
    } catch (error) {
      console.log(error);
    }
    return 'Location';
  };

  const getData = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    const {
      tradeName,
      DV,
      IDOfTheLegalRepresentative,
      RUC,
      administrativeContact,
      businessName,
      location,
      district,
      corregimiento,
      fullAddress,
      name,
      nameOfTheLegalRepresentative,
      province,
      noOfBranches,
    } = store;
    setStoreName(tradeName);
    setBusinessName(businessName);
    setDV(DV);
    setIDOfTheLegalRepresentative(IDOfTheLegalRepresentative);
    setRUC(RUC);
    setNameOfTheLegalRepresentative(nameOfTheLegalRepresentative);
    setProvince(province);
    setDistrict(district);
    setCorregimiento(corregimiento);
    setFullAddress(fullAddress);
    setNoOfBranches(noOfBranches);
    setLocationDetailsArray(location);
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
          placeHolder="Trade Name"
        />
        <AppTextInput
          value={businessName}
          onChangeText={(txt) => {
            setBusinessName(txt);
          }}
          style={styles.mVertical}
          placeHolder="Business Name"
        />
        <View style={[styles.subContainer, styles.mVertical]}>
          <AppTextInput
            value={RUC}
            onChangeText={(txt) => {
              setRUC(txt);
            }}
            style={styles.halfInput}
            placeholder="RUC"
          />
          <AppTextInput
            value={DV}
            onChangeText={(txt) => {
              setDV(txt);
            }}
            style={styles.halfInput}
            placeholder="DV "
          />
        </View>
        <AppTextInput
          value={nameOfTheLegalRepresentative}
          onChangeText={(txt) => {
            setNameOfTheLegalRepresentative(txt);
          }}
          style={styles.mVertical}
          placeHolder="Name of the legal Representative"
        />
        <AppTextInput
          value={IDOfTheLegalRepresentative}
          onChangeText={(txt) => {
            setIDOfTheLegalRepresentative(txt);
          }}
          style={styles.mVertical}
          placeHolder="ID of the legal Representative"
        />

        <AppPicker
          items={provinces}
          onSelectItem={(item) => item && setProvince(item.label)}
          style={styles.mVertical}
          color={province ? colors.black : colors.dark}
          title={province ? province : 'Province'}
        />
        <AppPicker
          items={districts}
          onSelectItem={(item) => item && setDistrict(item.label)}
          style={styles.mVertical}
          color={district ? colors.black : colors.dark}
          title={district ? district : 'District'}
        />

        <AppPicker
          items={corregimientos}
          onSelectItem={(item) => item && setCorregimiento(item.label)}
          style={styles.mVertical}
          color={corregimiento ? colors.black : colors.dark}
          title={corregimiento ? corregimiento : 'Corregimiento'}
        />

        {/* distributor code */}
        <AppTextInput
          value={location}
          onChangeText={(txt) => {
            setLocation(txt);
          }}
          style={styles.mVertical}
          placeHolder={getLocationName() ? getLocationName() : 'Location'}
        />
        <AppPhotoInput
          style={styles.mVertical}
          add
          placeHolder={
            locationDetailsArray.length > 0
              ? getLocationCordinates()
              : 'Latitude Longitude'
          }
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
          {!!locationDetailsArray.length &&
            locationDetailsArray.map((item, index) => {
              console.log(item, 'ccord');
              return item.location ? (
                <LocationDetail
                  title={`${
                    item.location
                      ? `${item.location}\n${item.coordinate.latitude} ${item.coordinate.longitude}`
                      : `${item.coordinate.latitude} ${item.coordinate.longitude}`
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
              ) : (
                <View key={index} />
              );
            })}
        </View>

        {/* distributor code */}
        <AppTextInput
          value={fullAddress}
          onChangeText={(txt) => {
            setFullAddress(txt);
          }}
          style={styles.mVertical}
          placeHolder="Full Address"
        />
        <AppTextInput
          value={noOfBranches}
          onChangeText={(txt) => {
            setNoOfBranches(txt);
          }}
          style={styles.mVertical}
          placeHolder="Number of Branches"
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
            style={[styles.btn, styles.mVertical, {width: '30%'}]}
            title="NEXT"
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
    alignItems: 'flex-end',
  },
});
