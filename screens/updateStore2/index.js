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

export default function UpdateStore2({navigation, route, changeFirstTime}) {
  const [administrativeContact, setAdministrativeContact] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [administrativePhone, setAdministrativePhone] = useState('');
  const [technicalContact, setTechnicalContact] = useState('');
  const [technicalPhone, setTechnicalPhone] = useState('');
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

  useEffect(() => {
    getData();
  }, []);

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

  const getData = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    // console.log(route.params.update1Data, 'update1Data');
    // console.log(store, 'store');
    const {
      administrativeContact,
      administrativePhone,
      technicalContact,
      technicalPhone,
      whatsappLine,
      photoDigitalSignatureUrl,
      photoOfOperationNoticeUrl,
      photoIDLegalRepresentativeUrl,
      photoBusinessUrl,
    } = store;
    setAdministrativeContact(administrativeContact);
    setAdministrativePhone(administrativePhone);
    setTechnicalContact(technicalContact);
    setTechnicalPhone(technicalPhone);
    setWhatsappLine(whatsappLine);
    setPhotoOfOperationNotice({uri: photoOfOperationNoticeUrl});
    setPhotoBusiness({uri: photoBusinessUrl});
    setPhotoIDLegalRepresentative({uri: photoIDLegalRepresentativeUrl});
    setPhotoDigitalSignature({uri: photoDigitalSignatureUrl});
  };

  const updateStore = async () => {
    const store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log(store, 'store in update Sotre');
    setLoading(true);
    var update1Data = route.params.update1Data;

    const photos = [
      photoOfOperationNotice.uri.slice(0, 5) !== 'https' &&
        photoOfOperationNotice,
      photoIDLegalRepresentative.uri.slice(0, 5) !== 'https' &&
        photoIDLegalRepresentative,
      photoBusiness.uri.slice(0, 5) !== 'https' && photoBusiness,
    ];
    const unUpdatedPhotos = [
      photoOfOperationNotice.uri.slice(0, 5) === 'https' &&
        photoOfOperationNotice,
      photoIDLegalRepresentative.uri.slice(0, 5) === 'https' &&
        photoIDLegalRepresentative,
      photoBusiness.uri.slice(0, 5) === 'https' && photoBusiness,
    ];
    // console.log('photos,', photos);
    var user = JSON.parse(await AsyncStorage.getItem('user'));
    console.log(user, 'userF');
    var names = [
      'photoOfOperationNoticeUrl',
      'photoIDLegalRepresentativeUrl',
      'photoBusinessUrl',
    ];
    var nameArray = [];
    var promises = [];
    for (var i = 0; i < photos.length; i++) {
      if (photos[i]) {
        nameArray.push(names[i]);
        var uri = photos[i].uri;
        // var name = nameArray[i];
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
    }
    Promise.all(promises)
      .then(async (urls) => {
        // console.log(urls, 'urls');
        console.log(nameArray, 'nameArray');
        // var obj = {
        //   administrativeContact, administrativePhone, userId: user.userId, open: true,
        //   technicalContact, technicalPhone, whatsappLine, ...store1Data
        // };
        var obj = {
          administrativeContact,
          administrativePhone,
          technicalContact,
          technicalPhone,
          whatsappLine,
          ...update1Data,
        };
        for (var i = 0; i < urls.length; i++) {
          obj = {...obj, [nameArray[i]]: urls[i]};
        }
        for (var i = 0; i < unUpdatedPhotos.length; i++) {
          if (unUpdatedPhotos[i])
            obj = {...obj, [names[i]]: unUpdatedPhotos[i].uri};
        }
        obj.open = store.open;
        var result = photoDigitalSignature;
        if (result.uri.slice(0, 5) !== 'https') {
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
                    setLoading(false);
                    obj.photoDigitalSignatureUrl = url;
                    console.log(obj, 'final Obj');
                    await firestore()
                      .collection('vendorStores')
                      .doc(store.storeId)
                      .update({...obj});
                    var newStore = await firestore()
                      .collection('vendorStores')
                      .doc(store.storeId)
                      .get();
                    console.log(newStore, 'newStore');
                    await AsyncStorage.setItem(
                      'store',
                      await JSON.stringify({
                        id: newStore.id,
                        ...newStore.data(),
                      }),
                    );
                    setLoading(false);
                    Alert.alert(
                      'Store Updated',
                      'Your store has been updated successfully.',
                      [{text: 'OK'}],
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
        } else {
          obj.photoDigitalSignatureUrl = photoDigitalSignature.uri;
          console.log(obj, 'final Obj');
          await firestore()
            .collection('vendorStores')
            .doc(store.storeId)
            .update(obj);
          var newStore = await firestore()
            .collection('vendorStores')
            .doc(store.storeId)
            .get();
          await AsyncStorage.setItem(
            'store',
            await JSON.stringify({storeId: newStore.id, ...newStore.data()}),
          );
          setLoading(false);
          Alert.alert(
            'Store Updated',
            'Your store has been updated successfully.',
            [{text: 'OK'}],
            {cancelable: false},
          );

          // catch (e) {
          //   console.log(e, 'e');
          //   setLoading(false);
          //   Alert.alert(
          //     "Something Went Wrong",
          //     "",
          //     [
          //       { text: "OK" }
          //     ],
          //     { cancelable: false }
          //   );
          // }
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e, 'err');
        Alert.alert(
          'Error',
          e.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

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
        <AppTextInput
          value={whatsappLine}
          onChangeText={(txt) => {
            setWhatsappLine(txt);
          }}
          style={styles.mVertical}
          placeHolder="Whatsapp line"
          keyboardType="numeric"
        />

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

        <View>
          <View style={styles.imageContainer}>
            {photoDigitalSignature && (
              <Image
                source={{
                  uri:
                    photoDigitalSignature.uri.slice(0, 5) === 'https'
                      ? photoDigitalSignature.uri
                      : `data:image/png;base64,${photoDigitalSignature.uri}`,
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
            style={[styles.btn, styles.mVertical]}
            title="Update"
            onPress={updateStore}
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
            title="CLose"
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
