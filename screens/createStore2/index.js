import React, {Component, useEffect, useState, useRef} from 'react';
import AppText from '../../Components/AppText';
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
import Icon from 'react-native-vector-icons/Ionicons';
import LocationDetail from '../../Components/LocationDetail';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import storage from '@react-native-firebase/storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppPicker from '../../Components/AppPicker';
import SignatureCapture from 'react-native-signature-capture';
import RNFetchBlob from 'rn-fetch-blob';
import AppPhotoPicker from '../../Components/AppPhotoPicker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {countryCodes} from '../../config/data';

export default function CreateStore2({navigation, route, changeFirstTime}) {
  const [administrativeContact, setAdministrativeContact] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [administrativePhone, setAdministrativePhone] = useState('');
  const [technicalContact, setTechnicalContact] = useState('');
  const [technicalPhone, setTechnicalPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [whatsappLine, setWhatsappLine] = useState('');
  const [photoOfOperationNotice, setPhotoOfOperationNotice] = useState();
  const [photoIDLegalRepresentative, setPhotoIDLegalRepresentative] =
    useState();
  const [photoBusiness, setPhotoBusiness] = useState();
  const [photoDigitalSignature, setPhotoDigitalSignature] = useState();
  const [photoOfOperationNoticeUrl, setPhotoOfOperationNoticeUrl] = useState();
  const [photoIDLegalRepresentativeUrl, setPhotoIDLegalRepresentativeUrl] =
    useState();
  const [photoBusinessUrl, setPhotoBusinessUrl] = useState();
  const [photoDigitalSignatureUrl, setPhotoDigitalSignatureUrl] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showCameraGalleryModal, setShowCameraGalleryModal] = useState(false);
  const [selectType, setSelectType] = useState(false);

  const sign = useRef();

  const createStoreFunc = async () => {
    changeFirstTime();

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

  const createStore = async () => {
    setLoading(true);
    var store1Data = route.params.store1Data;

    if (
      !Number.isInteger(Number(administrativePhone)) &&
      !Number.isInteger(Number(technicalPhone)) &&
      !Number.isInteger(Number(whatsappLine))
    ) {
      Alert.alert('Error', 'Some field have incorrect data', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    const photos = [
      photoOfOperationNotice,
      photoIDLegalRepresentative,
      photoBusiness,
    ];
    var user = JSON.parse(await AsyncStorage.getItem('user'));
    var nameArray = [
      'photoOfOperationNoticeUrl',
      'photoIDLegalRepresentativeUrl',
      'photoBusinessUrl',
    ];
    var promises = [];
    for (var i = 0; i < photos.length; i++) {
      var uri = photos[i].uri;
      var name = nameArray[i];
      var response = await fetch(uri);
      var blob = await response.blob();
      var promise = new Promise((resolve, reject) => {
        storage()
          .ref(`documents/${user.userId}/${Date.now()}`)
          .put(blob)
          .on(
            'state_changed',
            () => {},
            () => {},
            (imgRes) => {
              imgRes.ref
                .getDownloadURL()
                .then((url) => {
                  resolve(url);
                })
                .catch((err) => {
                  reject(err);
                });
            },
          );
      });
      promises.push(promise);
    }
    Promise.all(promises)
      .then(async (urls) => {
        var obj = {
          administrativeContact,
          administrativePhone,
          userId: user.userId,
          open: true,
          technicalContact,
          technicalPhone,
          whatsappLine: countryCode.value + whatsappLine,
          createdAt: Date.now(),
          ...store1Data,
        };
        for (var i = 0; i < urls.length; i++) {
          obj = {...obj, [nameArray[i]]: urls[i]};
        }
        var result = photoDigitalSignature;
        await RNFetchBlob.fs.writeFile(result.pathName, result.uri, 'base64');
        storage()
          .ref(`documents/${user.uerId}/${Date.now()}`)
          .putFile(result.pathName)
          .on(
            'state_changed',
            () => {},
            () => {},
            async (imgRes) => {
              imgRes.ref
                .getDownloadURL()
                .then(async (url) => {
                  console.log(url, 'url');
                  setLoading(false);
                  obj.photoDigitalSignatureUrl = url;
                  await firestore()
                    .collection('vendorStores')
                    .doc(user.userId)
                    .set(obj);
                  // await firestore().collection('vendorStores').add(obj);
                  await firestore()
                    .collection('vendors')
                    .doc(user.userId)
                    .update({firstTime: false});
                  user.firstTime = false;
                  await AsyncStorage.setItem(
                    'user',
                    await JSON.stringify(user),
                  );
                  Alert.alert(
                    'Store Created',
                    'Your store has been created successfully.',
                    [{text: 'OK', onPress: () => changeFirstTime()}],
                    {cancelable: false},
                  );
                })
                .catch((e) => {
                  setLoading(false);
                  Alert.alert(
                    'Error',
                    e.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                });
            },
          );
      })
      .catch((e) => {
        setLoading(false);
        Alert.alert(
          'Error',
          e.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  // const handleImageUpload = (type) => {
  //   try {
  //     ImagePicker.showImagePicker(
  //       {
  //         noData: true,
  //       },
  //       (response) => {
  //         if (!response.didCancel) {
  //           console.log(response.data, 'response . data');
  //           switch (type) {
  //             case 'ON':
  //               setPhotoOfOperationNotice(response);
  //               break;
  //             case 'LR':
  //               console.log('LR case chala');
  //               setPhotoIDLegalRepresentative(response);
  //               break;
  //             case 'LP':
  //               setPhotoLogo(response);
  //               break;
  //             case 'BP':
  //               setPhotoBusiness(response);
  //               break;
  //             case 'DS':
  //               setPhotoDigitalSignature(response);
  //               break;
  //             default:
  //               break;
  //           }
  //         }
  //         // response && setImage(response);
  //       },
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleImageUpload = (type) => {
    setShowCameraGalleryModal(true);
    setSelectType(type);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          ImagePicker.launchCamera(
            {
              noData: false,
              mediaType: 'photo',
              maxWidth: 500,
            },
            (response) => {
              console.log(response);
              setImage(response);
            },
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = (option) => {
    switch (option) {
      case 'camera':
        try {
          requestCameraPermission();
        } catch (error) {
          console.log(error);
        }
        break;
      case 'gallery':
        try {
          ImagePicker.launchImageLibrary(
            {
              noData: false,
              mediaType: 'photo',
              maxWidth: 500,
            },
            (response) => {
              console.log(response);
              setImage(response);
            },
          );
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  const setImage = (response) => {
    if (!response.didCancel) {
      switch (selectType) {
        case 'ON':
          console.log('ON case chala');
          setPhotoOfOperationNotice(response);
          break;
        case 'LR':
          console.log('LR case chala');
          setPhotoIDLegalRepresentative(response);
          break;
        case 'LP':
          console.log('LP case chala');
          setPhotoLogo(response);
          break;
        case 'BP':
          setPhotoBusiness(response);
          break;
        case 'DS':
          setPhotoDigitalSignature(response);
          break;
        default:
          break;
      }
    }
  };

  const saveSign = () => {
    sign.current.saveImage();
  };

  const resetSign = () => {
    sign.current.resetImage();
  };

  const saveSignEvent = (result) => {
    console.log(result, 'sign result');
    // setPhotoDigitalSignature({ uri: `data:image/png;base64,${result.encoded}`,pathName:result.pathName});
    setShowModal(false);
    setPhotoDigitalSignature({
      uri: `${result.encoded}`,
      pathName: result.pathName,
    });
    // setPhotoDigitalSignature({ uri:result.pathName});
  };
  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <AppTextInput
          value={administrativeContact}
          onChangeText={(txt) => {
            setAdministrativeContact(txt);
          }}
          style={styles.mVertical}
          placeHolder="Administrative Contact"
          keyboardType="numeric"
        />
        <AppTextInput
          value={administrativePhone}
          onChangeText={(txt) => {
            setAdministrativePhone(txt);
          }}
          style={styles.mVertical}
          placeHolder="Administrative Phone"
          keyboardType="numeric"
        />

        <AppTextInput
          value={technicalContact}
          onChangeText={(txt) => {
            setTechnicalContact(txt);
          }}
          style={styles.mVertical}
          placeHolder="Technical Contact"
          keyboardType="numeric"
        />

        <AppTextInput
          value={technicalPhone}
          onChangeText={(txt) => {
            setTechnicalPhone(txt);
          }}
          style={styles.mVertical}
          placeHolder="Technical Phone"
          keyboardType="numeric"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: '25%'}}>
            <AppPicker
              selectedItem={countryCode}
              onSelectItem={(item) =>
                item && setCountryCode(item) && console.log('hello')
              }
              color={countryCode ? colors.black : colors.dark}
              items={countryCodes}
              style={styles.mVertical}
              title="CC"
            />
          </View>
          <View style={{paddingLeft: 10, width: '75%'}}>
            <AppTextInput
              value={whatsappLine}
              onChangeText={(txt) => {
                setWhatsappLine(txt);
              }}
              style={styles.mVertical}
              placeHolder="Whatsapp line"
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* <View
          style={[
            styles.photoView,
            {
              backgroundColor: photoOfOperationNotice
                ? colors.secondary
                : 'white',
            },
          ]}>
          <View style={styles.PhotocontentView}>
            <AppText style={styles.photoText}>Photo of operation notice</AppText>
          </View>

          <View style={styles.IconStyle}>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload('ON');
              }}>
              <Icon
                style={styles.icon}
                name="md-images"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            styles.photoView,
            {
              backgroundColor: photoIDLegalRepresentative
                ? colors.secondary
                : 'white',
            },
          ]}>
          <View style={styles.PhotocontentView}>
            <Text style={styles.photoText}>
              Photo of the ID of the Legal Representative
            </Text>
          </View>

          <View style={styles.IconStyle}>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload('LR');
              }}>
              <Icon
                style={styles.icon}
                name="md-images"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            styles.photoView,
            {backgroundColor: photoBusiness ? colors.secondary : 'white'},
          ]}>
          <View style={styles.PhotocontentView}>
            <AppText style={styles.photoText}>Business Photo</AppText>
          </View>

          <View style={styles.IconStyle}>
            <TouchableOpacity
              onPress={() => {
                handleImageUpload('BP');
              }}>
              <Icon
                style={styles.icon}
                name="md-images"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View> */}

        <AppPhotoPicker
          condition={photoOfOperationNotice}
          placeHolder="Photo of operation notice"
          onPress={() => handleImageUpload('ON')}
        />

        <AppPhotoPicker
          condition={photoIDLegalRepresentative}
          placeHolder="Photo of the ID of the Legal Representative"
          onPress={() => handleImageUpload('LR')}
        />

        {/* <AppPhotoPicker
          condition={photoLogo}
          placeHolder="Logo Photo"
          onPress={() => handleImageUpload('LP')}
        /> */}

        <AppPhotoPicker
          condition={photoBusiness}
          placeHolder="Photo of the ID of the Legal Representative"
          onPress={() => handleImageUpload('BP')}
        />

        <View
          style={[
            styles.photoView,
            {
              backgroundColor: photoDigitalSignature
                ? colors.secondary
                : 'white',
            },
          ]}>
          <View style={styles.PhotocontentView}>
            <AppText style={styles.photoText}>Digital Signature</AppText>
          </View>
          <View style={styles.IconStyle}>
            <TouchableOpacity
              onPress={() => {
                // setShowTermsAndConditionModal(false);
                setShowModal(true);
              }}>
              <Icon
                style={styles.icon}
                name="md-images"
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.imageContainer}>
            {photoDigitalSignature && (
              <Image
                source={{
                  uri: `data:image/png;base64,${photoDigitalSignature.uri}`,
                }}
                style={styles.image}
              />
            )}
            {photoBusiness && (
              <Image
                source={{
                  uri: photoBusiness.uri,
                }}
                style={styles.image}
              />
            )}
            {photoOfOperationNotice && (
              <Image
                source={{
                  uri: photoOfOperationNotice.uri,
                }}
                style={styles.image}
              />
            )}
            {photoIDLegalRepresentative && (
              <Image
                source={{
                  uri: photoIDLegalRepresentative.uri,
                }}
                style={styles.image}
              />
            )}
          </View>
          <AppText style={styles.termsHead}>Terms and Conditions</AppText>
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
            <Text style={{fontSize: 12}}>
              I have read and accept the terms and conditions{' '}
            </Text>
          </View>
        </View>
        <View style={styles.createBtnView}>
          <AppButton
            disabled={
              !administrativeContact ||
              !administrativePhone ||
              !termsAccepted ||
              !technicalContact ||
              !technicalPhone ||
              !sign ||
              !photoBusiness ||
              !photoOfOperationNotice ||
              !photoIDLegalRepresentative
            }
            loading={loading}
            style={{...styles.btn, marginVertical: 10}}
            title="Create"
            color={colors.primary}
            onPress={createStore}
          />
        </View>
      </ScrollView>
      <Modal visible={showModal} animationType="slide">
        <SignatureCapture
          style={styles.signature}
          ref={sign}
          onSaveEvent={saveSignEvent}
          // onDragEvent={this._onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
        />
        <View style={styles.modalBtnContainer}>
          <AppButton
            style={[styles.modalBtn, {backgroundColor: colors.white}]}
            title="Close"
            onPress={() => setShowModal(false)}
          />
          <AppButton
            style={styles.modalBtn}
            color={colors.primary}
            title="Done"
            onPress={saveSign}
          />
        </View>
      </Modal>

      {/* Modal For Select gallery or camera */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCameraGalleryModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                pickImage('camera');
                setShowCameraGalleryModal(!showCameraGalleryModal);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="camera" size={22} color={colors.black} />
                <AppText style={styles.textStyle}>Launch Camera</AppText>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: 4,
                borderBottomWidth: 2,
                marginBottom: 10,
                paddingBottom: 10,
                borderBottomColor: colors.grey,
              }}
            />
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                pickImage('gallery');
                setShowCameraGalleryModal(!showCameraGalleryModal);
              }}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name="photo" size={24} color={colors.black} />
                <AppText style={styles.textStyle}>Launch Gallery</AppText>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <AppButton
                style={{marginLeft: '65%', width: 100, height: 50}}
                color={colors.primary}
                title="Cancel"
                onPress={() =>
                  setShowCameraGalleryModal(!showCameraGalleryModal)
                }
              />
            </View>
          </View>
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
    alignItems: 'flex-end',
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
  signature: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  PhotocontentView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '85%',
  },
  photoView: {
    // borderWidth:2,
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
    height: 45,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
  photoText: {
    color: 'grey',
    padding: 10,
    fontSize: 12,
    // justifyContent:'center',
    // alignSelf:'center'
  },
  IconStyle: {
    backgroundColor: colors.secondary,
    width: 40,
    marginHorizontal: 5,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  DigitalSignatureView: {
    justifyContent: 'center',
    // alignSelf:'flex-start',
    // flex:4,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 100,
  },
  openButton: {
    width: '100%',
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 20,
  },
});
