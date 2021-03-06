import React, {useState, useEffect, useRef} from 'react';
import AppText from '../../Components/AppText';
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
  TouchableHighlight,
  Platform,
  Alert,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppAttachFileButton from '../../Components/AppAttachFileButton';
import AppButton from '../../Components/AppButton';
import AppMultiLineInput from '../../Components/AppMultiLineInput';
import AppPhotoInput from '../../Components/AppPhotoInput';
import * as ImagePicker from 'react-native-image-picker';
import AppTextInput from '../../Components/AppTextInput';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignatureCapture from 'react-native-signature-capture';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

const {width: WIDTH} = Dimensions.get('window');

const Registration3 = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [whatsAppLine, setWhatsAppLine] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [uploadingFile, setUploadingFile] = useState('');
  const [transferred, setTransferred] = useState('');
  const [showTermsAndConditionModal, setShowTermsAndConditionModal] =
    useState(false);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [photoOfOperationNotice, setPhotoOfOperationNotice] = useState();
  const [photoIDLegalRepresentative, setPhotoIDLegalRepresentative] =
    useState();
  const [photoLogo, setPhotoLogo] = useState();
  const [photoBusiness, setPhotoBusiness] = useState();
  const [photoDigitalSignature, setPhotoDigitalSignature] = useState();
  const [photoOfOperationNoticeUrl, setPhotoOfOperationNoticeUrl] = useState();
  const [photoIDLegalRepresentativeUrl, setPhotoIDLegalRepresentativeUrl] =
    useState();
  const [photoLogoUrl, setPhotoLogoUrl] = useState();
  const [photoBusinessUrl, setPhotoBusinessUrl] = useState();
  const [photoDigitalSignatureUrl, setPhotoDigitalSignatureUrl] = useState();
  const sign = useRef();

  const next = () => {
    if (!termsAccepted) {
      Alert.alert(
        'Please Accept Terms and Conditions',
        'you will have to accept terms and conditions to proceed',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    }
    const reg2Data = route.params.reg2Data;
    const reg1Data = route.params.reg1Data;
    console.log(reg1Data.email, reg1Data.password, 'reg1Data');
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(reg1Data.email, reg1Data.password)
      .then(async (res) => {
        delete reg1Data.password;
        var imagesArray = [
          photoOfOperationNotice,
          photoIDLegalRepresentative,
          photoLogo,
          photoBusiness,
        ];
        var nameArray = [
          'photoOfOperationNoticeUrl',
          'photoIDLegalRepresentativeUrl',
          'photoLogoUrl',
          'photoBusinessUrl',
        ];
        var blobs = [];
        for (var i = 0; i < imagesArray.length; i++) {
          var uri = imagesArray[i].uri;
          var response = await fetch(uri);
          var blob = await response.blob();
          blobs[i] = blob;
        }
        var result = photoDigitalSignature;
        await RNFetchBlob.fs.writeFile(result.pathName, result.uri, 'base64');
        setUploadingFile(i);

        // signature to storage

        storage()
          .ref(`documents/${res.user.uid}/${Date.now()}`)
          .putFile(result.pathName)
          .on(
            'state_changed',
            () => {},
            () => {},
            (imgResponse) =>
              imgResponse.ref
                .getDownloadURL()
                .then((url) => {
                  setPhotoDigitalSignatureUrl(url);
                  var photoDigitalSignatureUrl = url;
                  // photo of Operation Notice  to storage

                  storage()
                    .ref(`documents/${res.user.uid}/${Date.now()}`)
                    .put(blobs[0])
                    .on(
                      'state_changed',
                      () => {},
                      () => {},
                      (imgResponse) =>
                        imgResponse.ref
                          .getDownloadURL()
                          .then((url) => {
                            console.log(url, 'url');
                            var photoOfOperationNoticeUrl = url;
                            setPhotoOfOperationNoticeUrl(url);

                            // photo of id legal representative Notice  to storage

                            storage()
                              .ref(`documents/${res.user.uid}/${Date.now()}`)
                              .put(blobs[1])
                              .on(
                                'state_changed',
                                () => {},
                                () => {},
                                (imgResponse) =>
                                  imgResponse.ref
                                    .getDownloadURL()
                                    .then((url) => {
                                      console.log(url, 'url');
                                      var photoIDLegalRepresentativeUrl = url;
                                      setPhotoIDLegalRepresentativeUrl(url);

                                      // photo logo to storage

                                      storage()
                                        .ref(
                                          `documents/${
                                            res.user.uid
                                          }/${Date.now()}`,
                                        )
                                        .put(blobs[2])
                                        .on(
                                          'state_changed',
                                          () => {},
                                          () => {},
                                          (imgResponse) =>
                                            imgResponse.ref
                                              .getDownloadURL()
                                              .then((url) => {
                                                console.log(url, 'url');
                                                var photoLogoUrl = url;
                                                setPhotoLogoUrl(url);

                                                // photo  business  to storage

                                                storage()
                                                  .ref(
                                                    `documents/${
                                                      res.user.uid
                                                    }/${Date.now()}`,
                                                  )
                                                  .put(blobs[3])
                                                  .on(
                                                    'state_changed',
                                                    () => {},
                                                    () => {},
                                                    (imgResponse) =>
                                                      imgResponse.ref
                                                        .getDownloadURL()
                                                        .then((url) => {
                                                          console.log(
                                                            url,
                                                            'url',
                                                          );
                                                          var photoBusinessUrl =
                                                            url;
                                                          setPhotoBusinessUrl(
                                                            url,
                                                          );
                                                          //sending data to firestore database
                                                          const reg3Data = {
                                                            whatsAppLine,
                                                            photoOfOperationNoticeUrl,
                                                            photoLogoUrl,
                                                            photoBusinessUrl,
                                                            photoDigitalSignatureUrl,
                                                            photoIDLegalRepresentativeUrl,
                                                          };
                                                          console.log(
                                                            reg3Data,
                                                            'reg3data',
                                                          );
                                                          firestore()
                                                            .collection(
                                                              'distributer',
                                                            )
                                                            .doc(res.user.uid)
                                                            .set({
                                                              ...reg1Data,
                                                              ...reg2Data,
                                                              ...reg3Data,
                                                              firstTime: true,
                                                              approved:
                                                                'Pending',
                                                            })
                                                            .then(() => {
                                                              setLoading(false);
                                                              console.log(
                                                                'user added to firestore',
                                                              );
                                                              navigation.navigate(
                                                                'Login page',
                                                              );
                                                            })
                                                            .catch((e) => {
                                                              Alert.alert(
                                                                'Something Went Wrong',
                                                                e.message,
                                                                [
                                                                  {
                                                                    text: 'OK',
                                                                    onPress:
                                                                      () =>
                                                                        console.log(
                                                                          'OK Pressed',
                                                                        ),
                                                                  },
                                                                ],
                                                                {
                                                                  cancelable: false,
                                                                },
                                                              );
                                                              setLoading(false);
                                                              console.log(
                                                                e,
                                                                'err',
                                                              );
                                                            });
                                                        })
                                                        .catch((e) => {
                                                          Alert.alert(
                                                            'Something Went Wrong',
                                                            e.message,
                                                            [
                                                              {
                                                                text: 'OK',
                                                                onPress: () =>
                                                                  console.log(
                                                                    'OK Pressed',
                                                                  ),
                                                              },
                                                            ],
                                                            {cancelable: false},
                                                          );
                                                        }),
                                                  );
                                              })
                                              .catch((e) => {
                                                Alert.alert(
                                                  'Something Went Wrong',
                                                  e.message,
                                                  [
                                                    {
                                                      text: 'OK',
                                                      onPress: () =>
                                                        console.log(
                                                          'OK Pressed',
                                                        ),
                                                    },
                                                  ],
                                                  {cancelable: false},
                                                );
                                              }),
                                        );
                                    })
                                    .catch((e) => {
                                      Alert.alert(
                                        'Something Went Wrong',
                                        e.message,
                                        [
                                          {
                                            text: 'OK',
                                            onPress: () =>
                                              console.log('OK Pressed'),
                                          },
                                        ],
                                        {cancelable: false},
                                      );
                                    }),
                              );
                          })
                          .catch((e) => {
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
                          }),
                    );
                })
                .catch((e) => {
                  Alert.alert(
                    'Something Went Wrong',
                    e.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                }),
          );
      })
      .catch((err) => {
        Alert.alert(
          'Something Went Wrong',
          err.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        console.log(err, 'err');
      });
  };

  const handleImageUpload = (type) => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
          maxWidth: 500,
          mediaType: 'photo',
        },
        (response) => {
          if (response) {
            console.log(response.data, 'response . data');
            switch (type) {
              case 'ON':
                setPhotoOfOperationNotice(response);
                break;
              case 'LR':
                console.log('LR case chala');
                setPhotoIDLegalRepresentative(response);
                break;
              case 'LP':
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
          // response && setImage(response);
        },
      );
    } catch (error) {
      console.log(error);
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
            <AppText style={styles.title}>Registration</AppText>
            <AppTextInput
              style={styles.mVertical}
              placeHolder="WhatsApp Number"
              value={whatsAppLine}
              onChangeText={(txt) => {
                setWhatsAppLine(txt);
              }}
            />
            <AppPhotoInput
              style={styles.mVertical}
              placeHolder="Photo of operation notice"
              onPress={() => handleImageUpload('ON')}
            />
            <AppPhotoInput
              style={styles.mVertical}
              placeHolder="Photo of the ID of the Legal Representative"
              onPress={() => handleImageUpload('LR')}
            />
            <AppPhotoInput
              style={styles.mVertical}
              placeHolder="Logo Photo"
              onPress={() => handleImageUpload('LP')}
            />
            <AppPhotoInput
              style={styles.mVertical}
              placeHolder="Business Photo"
              onPress={() => handleImageUpload('BP')}
            />
            <AppPhotoInput
              style={styles.mVertical}
              placeHolder="Digital Signature"
              onPress={() => {
                setShowTermsAndConditionModal(false);
                setShowModal(true);
              }}
            />
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
                    setPrivacyPolicyAccepted(false);
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
                    setPrivacyPolicyAccepted(true);
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
              <Text>I have read and accept the </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setShowPrivacyPolicyModal(false);
                  setShowTermsAndConditionModal(true);
                }}>
                <Text
                  style={{
                    color: colors.primary,
                    borderBottomColor: colors.primary,
                    borderBottomWidth: 1,
                  }}>
                  terms and conditions
                </Text>
              </TouchableOpacity>
              <Text> and </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setShowTermsAndConditionModal(false);
                  setShowPrivacyPolicyModal(true);
                }}>
                <Text
                  style={{
                    color: colors.primary,
                    borderBottomColor: colors.primary,
                    borderBottomWidth: 1,
                  }}>
                  privacy policies
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.btnContainer, styles.mVertical]}>
              <View style={styles.circle} />
              <View style={styles.circle} />
              <View style={[styles.circle, styles.filled]} />
              <AppButton
                loading={loading}
                onPress={next}
                style={styles.btn}
                title="Create Account"
                color={colors.primary}
                disabled={
                  !termsAccepted ||
                  !privacyPolicyAccepted ||
                  !whatsAppLine ||
                  !photoOfOperationNotice ||
                  !photoLogo ||
                  !photoBusiness ||
                  !photoDigitalSignature ||
                  !photoIDLegalRepresentative
                }
              />
            </View>
            <View style={styles.imageContainer}>
              {photoDigitalSignature && (
                <Image
                  source={{
                    uri: `data:image/png;base64,${photoDigitalSignature.uri}`,
                    // height: 200,
                    // width: 200,
                  }}
                  style={styles.image}
                />
              )}
              {photoBusiness && (
                <Image
                  source={{
                    uri: photoBusiness.uri,

                    // height: 200, width: 200
                  }}
                  style={styles.image}
                />
              )}
              {photoOfOperationNotice && (
                <Image
                  source={{
                    uri: photoOfOperationNotice.uri,

                    // height: 200, width: 200
                  }}
                  style={styles.image}
                />
              )}
              {photoIDLegalRepresentative && (
                <Image
                  source={{
                    uri: photoIDLegalRepresentative.uri,

                    // height: 200, width: 200
                  }}
                  style={styles.image}
                />
              )}
              {photoLogo && (
                <Image
                  source={{
                    uri: photoLogo.uri,

                    // height: 200, width: 200
                  }}
                  style={styles.image}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
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
      <Modal visible={showTermsAndConditionModal} animationType="slide">
        <View style={{flex: 1}}>
          <ScrollView style={{padding: 10}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 20,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Terms And Conditions
            </Text>
            <Text style={styles.termsText}>
              1. Condiciones de acceso y utilizaci??n El sitio y sus servicios
              son de acceso libre y gratuitos, no obstante, VECO podr??
              condicionar la utilizaci??n de algunos de los servicios al previo
              diligenciamiento de formularios y el pago correspondiente por la
              prestaci??n de sus servicios. El usuario garantiza la autenticidad
              y actualidad de todos los datos que comunique y ser?? el ??nico
              responsable de las manifestaciones falsas o inexactas que realice.
            </Text>
            <Text style={styles.termsText}>
              2. Contenido El contenido de este sitio es ??nicamente para
              prop??sitos educativos. En consecuencia, la aplicaci??n o no de
              dicho contenido a su caso, depende exclusivamente de su situaci??n
              particular; por lo tanto, para tomar decisiones y actuar u omitir
              actuar con base en el contenido del mismo, debe buscar consejos de
              expertos o profesionales.
            </Text>
            <Text style={styles.termsText}>
              Todos los contenidos de este sitio han sido publicados con fines
              informativos y de ninguna manera comprometen la responsabilidad de
              VECO ni de ninguna de sus entidades afiliadas. VECO no asume
              responsabilidad alguna por las decisiones que el Usuario tome con
              fundamento en la informaci??n publicada. La disponibilidad del
              contenido est?? sujeta a cambios sin aviso previo.
            </Text>
            <Text style={styles.termsText}>
              Est?? expresamente prohibida la recolecci??n de cualquier contenido
              de esta p??gina, con la finalidad de crear o compilar, directa o
              indirectamente, una colecci??n, compilaci??n, base de datos o
              directorio, sin permiso previo y por escrito por parte de VECO.
            </Text>
            <Text style={styles.termsText}>
              3. Licencia limitada de uso VECO autoriza al usuario a acceder a
              este sitio para consultar su contenido para prop??sitos
              informativos. Se proh??be cualquier tipo de reproducci??n o
              modificaci??n de cualquier contenido publicado en este sitio, a
              menos de que VECO autorice lo contrario, de manera expresa y por
              escrito.
            </Text>
            <Text style={styles.termsText}>
              VECO se reserva todos los derechos que no est??n expl??citamente
              otorgados en este documento.
            </Text>
            <Text style={styles.termsText}>
              4. Condiciones de acceso El usuario se compromete a no utilizar el
              sitio para fines il??citos o por fuera de lo autorizado o de
              cualquier manera que pueda lesionar derechos de terceros o que
              puedan da??ar, perjudicar o deteriorar el servicio prestado por
              VECO, sus equipos inform??ticos, la propiedad o la imagen de VECO o
              de terceros.
            </Text>
            <Text style={styles.termsText}>
              El usuario se compromete expresamente a realizar un uso adecuado
              de los contenidos y servicios ofrecidos. De manera enunciativa
              pero no limitativa, Usted se compromete a no:
            </Text>
            <Text style={styles.termsText}>
              El usuario se compromete expresamente a realizar un uso adecuado
              de los contenidos y servicios ofrecidos. De manera enunciativa
              pero no limitativa, Usted se compromete a no:
            </Text>
            <Text style={styles.termsText}>
              i. Utilizar el contenido para incurrir y/o incitar a terceros a
              incurrir en actividades il??citas, ilegales o contrarias a la buena
              fe y al orden p??blico, o para difundir contenidos o propaganda de
              car??cter racista, xen??foba, pornogr??fico-ilegal, de apolog??a del
              terrorismo o atentatorio contra los derechos humanos;
            </Text>
            <Text style={styles.termsText}>
              ii. Usar secuencias de comandos automatizadas para recopilar
              informaci??n publicada en el portal o a trav??s del portal o para
              interactuar de cualquier otro modo con los mismos;
            </Text>
            <Text style={styles.termsText}>
              iii. Provocar da??os en los sistemas f??sicos y l??gicos de VECO, de
              sus proveedores o de terceras personas, introducir o difundir en
              la red virus inform??ticos, troyanos, c??digo malicioso o
              cualesquiera otros sistemas f??sicos o l??gicos que sean
              susceptibles de provocar da??os en y/o est??n dise??ados para
              interrumpir, destruir o limitar la funcionalidad de cualquier
              software, hardware o equipo de telecomunicaciones o para da??ar,
              deshabilitar, sobrecargar o perjudicar el Portal de cualquier
              modo; e
            </Text>
            <Text style={styles.termsText}>
              iv. Intentar acceder, recolectar o almacenar los datos personales
              de otros visitantes y/o usuarios del portal y, en su caso,
              utilizar las cuentas de correo electr??nico de otros visitantes y/o
              usuarios y modificar o manipular sus mensajes.
            </Text>
            <Text style={styles.termsText}>
              5. Responsabilidad y exclusi??n de garant??as El contenido del sitio
              es de car??cter general y tiene una finalidad meramente
              informativa, sin que se garantice plenamente el acceso a todos los
              contenidos, ni su vigencia o actualidad, idoneidad o utilidad para
              un objetivo espec??fico.
            </Text>
            <Text style={styles.termsText}>
              Todos los servicios y los contenidos publicados en este sitio son
              proporcionados tal como est??n disponibles y con posibles defectos.
              El uso de este sitio y de sus contenidos se hace por cuenta y
              riesgo del usuario. No se garantiza que los contenidos est??n
              libres de virus o de componentes inform??ticos nocivos.
            </Text>
            <Text style={styles.termsText}>
              Debido a que t??cnicamente no es posible garantizar que terceras
              personas interfieran en los sitios de Internet, VECO no puede
              garantizar la exactitud o veracidad de todo o parte de la
              informaci??n contenida en este sitio, ni su actualizaci??n, ni que
              dicha informaci??n haya sido alterada o modificada en todo o en
              parte luego de haber sido incluida en el sitio, ni cualquier otro
              aspecto o caracter??stica de la informaci??n brindada por medio de
              este sitio o a trav??s de los links eventualmente incluidos en el
              mismo.
            </Text>
            <Text style={styles.termsText}>
              VECO excluye, dentro de los l??mites establecidos en la legislaci??n
              de la Rep??blica de Colombia, cualquier responsabilidad por los
              da??os y perjuicios de toda naturaleza derivados de:
            </Text>
            <Text style={styles.termsText}>
              i. La imposibilidad de acceso al sitio Web o la falta de de
              veracidad, exactitud, y/o actualidad de los contenidos, as?? como
              la existencia de vicios y defectos de toda clase de los contenidos
              transmitidos, difundidos, almacenados, puestos a disposici??n a los
              que se haya accedido a trav??s del sitio Web o de los servicios que
              se ofrecen de manera tradicional o por medios electr??nicos (en
              l??nea).
            </Text>
            <Text style={styles.termsText}>
              ii. La presencia de virus o de otros elementos en los contenidos
              que puedan producir alteraciones en los sistemas inform??ticos,
              documentos electr??nicos o datos de los Usuarios.
            </Text>
            <Text style={styles.termsText}>
              iii. El incumplimiento de las leyes, la buena fe, el orden
              p??blico, los usos del tr??fico y las presentes condiciones
              generales de uso como consecuencia del uso incorrecto del sitio
              Web.
            </Text>
            <Text style={styles.termsText}>
              6. Propiedad intelectual e industrial El sitio y el contenido
              incluido en el mismo son propiedad exclusiva de VECO o de terceros
              que han autorizado su uso a VECO de manera expresa o en virtud de
              las normas vigentes con todos los derechos reservados y est??n
              protegidos por las leyes colombianas y por las leyes y tratados
              internacionales que les sean aplicables. La compilaci??n,
              organizaci??n y publicaci??n del contenido, as?? como el software y
              las invenciones utilizadas en el sitio y en relaci??n con el sitio
              son propiedad exclusiva de VECO.
            </Text>
            <Text style={styles.termsText}>
              Por lo tanto todos los contenidos, la informaci??n y los signos
              distintivos incluidos en este sitio Web o en cualquiera de sus
              p??ginas, tales como textos, fotograf??as, gr??ficos, im??genes,
              iconos, software, nombres de dominio, entre otros, as?? como su
              dise??o gr??fico, c??digos fuente, marcas, logo-s??mbolos, ense??as,
              nombres comerciales, lemas, modelos de utilidad, dise??os
              industriales, etc., constituyen una obra cuya propiedad es de
              VECO.
            </Text>
            <Text style={styles.termsText}>
              El usuario reconoce y acepta que todos los derechos de propiedad
              intelectual sobre los contenidos y/o cualesquiera otros elementos
              insertados en el sitio pertenecen a VECO. En ning??n caso, el
              acceso al sitio implica alg??n tipo de renuncia, transmisi??n,
              licencia o cesi??n total o parcial de dichos derechos, salvo que se
              establezca expresamente lo contrario. Las presentes condiciones
              generales de uso no confieren a los usuarios ning??n otro derecho
              de utilizaci??n, alteraci??n, explotaci??n, reproducci??n,
              distribuci??n o comunicaci??n p??blica del sitio Web y/o de sus
              contenidos distintos de los aqu?? expresamente previstos. Cualquier
              otro uso o explotaci??n de tales derechos estar?? sujeto a la previa
              y expresa autorizaci??n espec??ficamente otorgada a tal efecto por
              VECO o del titular de los derechos afectados.
            </Text>
            <Text style={styles.termsText}>
              7. Notificaci??n violaci??n de condiciones de uso y derechos de
              propiedad intelectual En caso que usted encuentre en el portal
              contenido que considere violatorio de sus derechos, o si conoce
              que un usuario ha violado las condiciones de uso, le solicitamos
              enviar una comunicaci??n a nuestro correo electr??nico
              educacionfinanciera@VECO.com, con la indicaci??n precisa del
              aspecto a denunciar y si se trata de violaci??n de derechos de
              autor las justificaciones y documentos que estime necesarios
              adjuntar para demostrar la infracci??n.
            </Text>
            <Text style={styles.termsText}>
              VECO revisar?? cada caso, podr?? solicitar ampliar o procesar la
              informaci??n y solicitar documentos adicionales que apoyen una
              denuncia, y si encuentra m??rito en su queja, tomar?? las acciones
              correspondientes, dentro del marco legal aplicable a cada caso.
            </Text>
            <Text style={styles.termsText}>
              8. Marcas registradas Las ??Marcas registradas?? de la VECO se
              refieren a todos los nombres, marcas, l??neas de marcas, logotipos,
              dise??os, empaques y otras designaciones de marca que la asociaci??n
              utiliza.
            </Text>
            <Text style={styles.termsText}>
              Todas las marcas registradas y marcas de servicio de VECO o de
              terceros que aparecen en nuestro sitio son de propiedad de sus
              respectivos due??os y su uso o explotaci??n ha sido debidamente
              autorizado por los terceros o por la ley.
            </Text>
            <Text style={styles.termsText}>
              No est?? autorizada la incorporaci??n de las marcas de propiedad del
              usuario o de terceros a ninguna marca registrada de VECO y/o de
              terceros cuyas marcas aparezcan en este sitio, as?? como nombres,
              logotipos, nombres de sus campos de acci??n, conexiones o
              denominaciones.
            </Text>
            <Text style={styles.termsText}>
              9. Pol??tica de privacidad Este sitio est?? abierto al p??blico en
              general, VECO no archiva su informaci??n personal a menos que usted
              la suministre voluntariamente para acceder a ciertos contenidos,
              en los que requerimos el registro. El registro le permite acceder
              a contenidos o a servicios que no est??n disponibles para todos los
              visitantes. Al registrarse y hacer clic en el bot??n ??Acepto??, est??
              aceptando la recolecci??n y uso de dicha informaci??n seg??n lo
              dispuesto en estos t??rminos y especialmente en esta pol??tica de
              privacidad. La informaci??n personal que podr??a solicitarse
              comprende, entre otros, nombre completo, direcci??n electr??nica,
              ciudad, tel??fono; etc.).
            </Text>
            <Text style={styles.termsText}>
              VECO proporcionar?? los medios para la protecci??n de la informaci??n
              personal que suministre a trav??s de este sitio Web. Lo anterior
              incluye medidas para que la informaci??n permanezca protegida
              contra el acceso o uso no autorizado, destrucci??n o modificaci??n.
              La obligaci??n y responsabilidad de VECO al respecto se limita a
              disponer de los medios que considere razonables para este fin, de
              conformidad con la legislaci??n aplicable. En todo caso, VECO no
              garantiza la seguridad total de su informaci??n.
            </Text>
            <Text style={styles.termsText}>
              La informaci??n que suministre en cuestionarios o encuestas ser??
              utilizada, en general, para reportes estad??sticos y an??lisis
              internos. VECO no utilizar?? dicha informaci??n para fines
              comerciales ni la entregar?? a otra entidad para estos fines. En
              general, la informaci??n que suministre a este sitio ser?? utilizada
              para el desarrollo de las actividades que desarrolla la VECO entre
              las cuales puede estar incluida su publicaci??n respetando las
              normas vigentes sobre la materia.
            </Text>
            <Text style={styles.termsText}>
              Al registrarse en este Sitio y/o al enviar correos electr??nicos a
              los contactos disponibles en el, se est?? comunicando VECO y ello
              implica que autoriza a VECO comunicarse con usted a trav??s de su
              correo electr??nico que ha suministrado.
            </Text>
            <Text style={styles.termsText}>
              10. Recolecci??n autom??tica de informaci??n VECO a trav??s de este
              sitio recolecta, de manera autom??tica, ??nicamente informaci??n
              concerniente al uso de esta p??gina, por ejemplo, el IP de su
              computador, el enlace utilizado para ver el sitio (browser), el IP
              de su proveedor de Internet, la direcci??n de Internet desde la
              cual llego a este sitio, la fecha y hora de acceso, las
              operaciones efectuadas y los contenidos y servicios utilizados.
              Esta informaci??n no se vincula a la informaci??n personal y
              solamente es utilizada para mejorar este sitio y su sistema de
              administraci??n. Este sitio usa ??cookies?? que son peque??os archivos
              de datos enviados y guardados en su computador para rastrear su
              uso de Este Sitio.
            </Text>
            <Text style={styles.termsText}>
              11. Uso de hiperv??nculos o links Este sitio puede contener
              hiperv??nculos (links) a otros sitios Web. El acceso y uso de tales
              sitios es por cuenta y riesgo del usuario.
            </Text>
            <Text style={styles.termsText}>
              La creaci??n de un hiperv??nculo (link) hacia sitios Web de terceros
              no implica que VECO avale o recomiende el contenido, la
              informaci??n o cualquiera de los productos o servicios ofrecidos en
              dichos sitios. VECO no asume ninguna responsabilidad por el uso de
              estos sitios ni por sus t??rminos de uso y pol??ticas de privacidad.
            </Text>
            <Text style={styles.termsText}>
              12. Acciones en caso de incumplimiento VECO se reserva el derecho
              a ejercer todas las acciones judiciales y/o administrativas que se
              encuentren a su disposici??n para exigir las responsabilidades que
              se deriven del incumplimiento por parte de un Usuario, de
              cualquiera de las disposiciones de estas condiciones generales de
              uso del sitio.
            </Text>
            <Text style={styles.termsText}>
              13. Duraci??n y terminaci??n La prestaci??n del servicio de portal y
              de los dem??s servicios del sitio, en principio tendr?? duraci??n
              indefinida, no obstante, VECO est?? autorizada para dar por
              terminada o suspender la prestaci??n del servicio del portal y/o de
              cualquiera de los servicios del sitio en cualquier momento, sin
              perjuicio de lo que se hubiere dispuesto al respecto en las
              correspondientes condiciones particulares. Cuando ello sea
              razonablemente posible, VECO, advertir?? previamente la suspensi??n
              terminaci??n.
            </Text>
            <Text style={styles.termsText}>
              14. Ley aplicable y jurisdicci??n Los presentes t??rminos y
              condiciones de uso se rigen por la Ley Colombiana. Cualquier
              controversia surgida del uso de este sitio ser?? sometida a la
              jurisdicci??n de los juzgados y tribunales competentes de la ciudad
              de Bogot?? D.C., Colombia.
            </Text>
            <Text style={styles.termsText}>
              15. Uso de correos electr??nicos Las cuentas de correo electr??nico
              que aparecen en este sitio deben usarse ??nicamente para el fin
              expresamente establecido para dichos correos. En especial ??stos no
              podr??n ser utilizados para:
            </Text>
            <Text style={styles.termsText}>
              i. Env??o de contenidos ilegales.
            </Text>
            <Text style={styles.termsText}>
              ii. Difusi??n masiva de mensajes, en especial de publicidad no
              solicitada.
            </Text>
            <Text style={styles.termsText}>
              iii. Cualquier tipo de ataque encaminado a entorpecer o dificultar
              el servicio de correo u otros servicios.
            </Text>
            <Text style={styles.termsText}>
              16. Recomendaciones a el Usuario i. Aseg??rese de terminar su
              operaci??n o cerrar su sesi??n antes de retirarse de cualquier medio
              donde requiera digitar su clave.
            </Text>
            <Text style={styles.termsText}>
              ii. Varios exploradores o browsers (Software utilizados para
              navegar por Internet, como por ejemplo Netscape o Internet
              Explorer), permiten almacenar las contrase??as que se le solicitan
              en algunos sitios. Debido a que otras personas pueden tener acceso
              a esa informaci??n, no es recomendable hacer uso de esta opci??n.
            </Text>
            <View style={styles.modalTermsBtnContainer}>
              <AppButton
                style={[
                  styles.modalTermsBtn,
                  {backgroundColor: colors.white, borderWidth: 1},
                ]}
                title="Reject"
                onPress={() => {
                  setTermsAccepted(false);
                  setShowTermsAndConditionModal(false);
                }}
              />
              <AppButton
                style={styles.modalTermsBtn}
                color={colors.primary}
                title="Accept"
                onPress={() => {
                  setTermsAccepted(true);
                  setShowTermsAndConditionModal(false);
                }}
              />
            </View>
          </ScrollView>
        </View>
        {/* <AppButton
          style={{padding: 10}}
          title="Close"
          color={colors.primary}
          onPress={() => setShowTermsAndConditionModal(false)}
        /> */}
      </Modal>
      <Modal visible={showPrivacyPolicyModal} animationType="slide">
        <View style={{flex: 1}}>
          <ScrollView style={{padding: 10}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 20,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Terms And Conditions
            </Text>
            <Text style={styles.termsText}>
              1. Condiciones de acceso y utilizaci??n El sitio y sus servicios
              son de acceso libre y gratuitos, no obstante, VECO podr??
              condicionar la utilizaci??n de algunos de los servicios al previo
              diligenciamiento de formularios y el pago correspondiente por la
              prestaci??n de sus servicios. El usuario garantiza la autenticidad
              y actualidad de todos los datos que comunique y ser?? el ??nico
              responsable de las manifestaciones falsas o inexactas que realice.
            </Text>
            <Text style={styles.termsText}>
              2. Contenido El contenido de este sitio es ??nicamente para
              prop??sitos educativos. En consecuencia, la aplicaci??n o no de
              dicho contenido a su caso, depende exclusivamente de su situaci??n
              particular; por lo tanto, para tomar decisiones y actuar u omitir
              actuar con base en el contenido del mismo, debe buscar consejos de
              expertos o profesionales.
            </Text>
            <Text style={styles.termsText}>
              Todos los contenidos de este sitio han sido publicados con fines
              informativos y de ninguna manera comprometen la responsabilidad de
              VECO ni de ninguna de sus entidades afiliadas. VECO no asume
              responsabilidad alguna por las decisiones que el Usuario tome con
              fundamento en la informaci??n publicada. La disponibilidad del
              contenido est?? sujeta a cambios sin aviso previo.
            </Text>
            <Text style={styles.termsText}>
              Est?? expresamente prohibida la recolecci??n de cualquier contenido
              de esta p??gina, con la finalidad de crear o compilar, directa o
              indirectamente, una colecci??n, compilaci??n, base de datos o
              directorio, sin permiso previo y por escrito por parte de VECO.
            </Text>
            <Text style={styles.termsText}>
              3. Licencia limitada de uso VECO autoriza al usuario a acceder a
              este sitio para consultar su contenido para prop??sitos
              informativos. Se proh??be cualquier tipo de reproducci??n o
              modificaci??n de cualquier contenido publicado en este sitio, a
              menos de que VECO autorice lo contrario, de manera expresa y por
              escrito.
            </Text>
            <Text style={styles.termsText}>
              VECO se reserva todos los derechos que no est??n expl??citamente
              otorgados en este documento.
            </Text>
            <Text style={styles.termsText}>
              4. Condiciones de acceso El usuario se compromete a no utilizar el
              sitio para fines il??citos o por fuera de lo autorizado o de
              cualquier manera que pueda lesionar derechos de terceros o que
              puedan da??ar, perjudicar o deteriorar el servicio prestado por
              VECO, sus equipos inform??ticos, la propiedad o la imagen de VECO o
              de terceros.
            </Text>
            <Text style={styles.termsText}>
              El usuario se compromete expresamente a realizar un uso adecuado
              de los contenidos y servicios ofrecidos. De manera enunciativa
              pero no limitativa, Usted se compromete a no:
            </Text>
            <Text style={styles.termsText}>
              El usuario se compromete expresamente a realizar un uso adecuado
              de los contenidos y servicios ofrecidos. De manera enunciativa
              pero no limitativa, Usted se compromete a no:
            </Text>
            <Text style={styles.termsText}>
              i. Utilizar el contenido para incurrir y/o incitar a terceros a
              incurrir en actividades il??citas, ilegales o contrarias a la buena
              fe y al orden p??blico, o para difundir contenidos o propaganda de
              car??cter racista, xen??foba, pornogr??fico-ilegal, de apolog??a del
              terrorismo o atentatorio contra los derechos humanos;
            </Text>
            <Text style={styles.termsText}>
              ii. Usar secuencias de comandos automatizadas para recopilar
              informaci??n publicada en el portal o a trav??s del portal o para
              interactuar de cualquier otro modo con los mismos;
            </Text>
            <Text style={styles.termsText}>
              iii. Provocar da??os en los sistemas f??sicos y l??gicos de VECO, de
              sus proveedores o de terceras personas, introducir o difundir en
              la red virus inform??ticos, troyanos, c??digo malicioso o
              cualesquiera otros sistemas f??sicos o l??gicos que sean
              susceptibles de provocar da??os en y/o est??n dise??ados para
              interrumpir, destruir o limitar la funcionalidad de cualquier
              software, hardware o equipo de telecomunicaciones o para da??ar,
              deshabilitar, sobrecargar o perjudicar el Portal de cualquier
              modo; e
            </Text>
            <Text style={styles.termsText}>
              iv. Intentar acceder, recolectar o almacenar los datos personales
              de otros visitantes y/o usuarios del portal y, en su caso,
              utilizar las cuentas de correo electr??nico de otros visitantes y/o
              usuarios y modificar o manipular sus mensajes.
            </Text>
            <Text style={styles.termsText}>
              5. Responsabilidad y exclusi??n de garant??as El contenido del sitio
              es de car??cter general y tiene una finalidad meramente
              informativa, sin que se garantice plenamente el acceso a todos los
              contenidos, ni su vigencia o actualidad, idoneidad o utilidad para
              un objetivo espec??fico.
            </Text>
            <Text style={styles.termsText}>
              Todos los servicios y los contenidos publicados en este sitio son
              proporcionados tal como est??n disponibles y con posibles defectos.
              El uso de este sitio y de sus contenidos se hace por cuenta y
              riesgo del usuario. No se garantiza que los contenidos est??n
              libres de virus o de componentes inform??ticos nocivos.
            </Text>
            <Text style={styles.termsText}>
              Debido a que t??cnicamente no es posible garantizar que terceras
              personas interfieran en los sitios de Internet, VECO no puede
              garantizar la exactitud o veracidad de todo o parte de la
              informaci??n contenida en este sitio, ni su actualizaci??n, ni que
              dicha informaci??n haya sido alterada o modificada en todo o en
              parte luego de haber sido incluida en el sitio, ni cualquier otro
              aspecto o caracter??stica de la informaci??n brindada por medio de
              este sitio o a trav??s de los links eventualmente incluidos en el
              mismo.
            </Text>
            <Text style={styles.termsText}>
              VECO excluye, dentro de los l??mites establecidos en la legislaci??n
              de la Rep??blica de Colombia, cualquier responsabilidad por los
              da??os y perjuicios de toda naturaleza derivados de:
            </Text>
            <Text style={styles.termsText}>
              i. La imposibilidad de acceso al sitio Web o la falta de de
              veracidad, exactitud, y/o actualidad de los contenidos, as?? como
              la existencia de vicios y defectos de toda clase de los contenidos
              transmitidos, difundidos, almacenados, puestos a disposici??n a los
              que se haya accedido a trav??s del sitio Web o de los servicios que
              se ofrecen de manera tradicional o por medios electr??nicos (en
              l??nea).
            </Text>
            <Text style={styles.termsText}>
              ii. La presencia de virus o de otros elementos en los contenidos
              que puedan producir alteraciones en los sistemas inform??ticos,
              documentos electr??nicos o datos de los Usuarios.
            </Text>
            <Text style={styles.termsText}>
              iii. El incumplimiento de las leyes, la buena fe, el orden
              p??blico, los usos del tr??fico y las presentes condiciones
              generales de uso como consecuencia del uso incorrecto del sitio
              Web.
            </Text>
            <Text style={styles.termsText}>
              6. Propiedad intelectual e industrial El sitio y el contenido
              incluido en el mismo son propiedad exclusiva de VECO o de terceros
              que han autorizado su uso a VECO de manera expresa o en virtud de
              las normas vigentes con todos los derechos reservados y est??n
              protegidos por las leyes colombianas y por las leyes y tratados
              internacionales que les sean aplicables. La compilaci??n,
              organizaci??n y publicaci??n del contenido, as?? como el software y
              las invenciones utilizadas en el sitio y en relaci??n con el sitio
              son propiedad exclusiva de VECO.
            </Text>
            <Text style={styles.termsText}>
              Por lo tanto todos los contenidos, la informaci??n y los signos
              distintivos incluidos en este sitio Web o en cualquiera de sus
              p??ginas, tales como textos, fotograf??as, gr??ficos, im??genes,
              iconos, software, nombres de dominio, entre otros, as?? como su
              dise??o gr??fico, c??digos fuente, marcas, logo-s??mbolos, ense??as,
              nombres comerciales, lemas, modelos de utilidad, dise??os
              industriales, etc., constituyen una obra cuya propiedad es de
              VECO.
            </Text>
            <Text style={styles.termsText}>
              El usuario reconoce y acepta que todos los derechos de propiedad
              intelectual sobre los contenidos y/o cualesquiera otros elementos
              insertados en el sitio pertenecen a VECO. En ning??n caso, el
              acceso al sitio implica alg??n tipo de renuncia, transmisi??n,
              licencia o cesi??n total o parcial de dichos derechos, salvo que se
              establezca expresamente lo contrario. Las presentes condiciones
              generales de uso no confieren a los usuarios ning??n otro derecho
              de utilizaci??n, alteraci??n, explotaci??n, reproducci??n,
              distribuci??n o comunicaci??n p??blica del sitio Web y/o de sus
              contenidos distintos de los aqu?? expresamente previstos. Cualquier
              otro uso o explotaci??n de tales derechos estar?? sujeto a la previa
              y expresa autorizaci??n espec??ficamente otorgada a tal efecto por
              VECO o del titular de los derechos afectados.
            </Text>
            <Text style={styles.termsText}>
              7. Notificaci??n violaci??n de condiciones de uso y derechos de
              propiedad intelectual En caso que usted encuentre en el portal
              contenido que considere violatorio de sus derechos, o si conoce
              que un usuario ha violado las condiciones de uso, le solicitamos
              enviar una comunicaci??n a nuestro correo electr??nico
              educacionfinanciera@VECO.com, con la indicaci??n precisa del
              aspecto a denunciar y si se trata de violaci??n de derechos de
              autor las justificaciones y documentos que estime necesarios
              adjuntar para demostrar la infracci??n.
            </Text>
            <Text style={styles.termsText}>
              VECO revisar?? cada caso, podr?? solicitar ampliar o procesar la
              informaci??n y solicitar documentos adicionales que apoyen una
              denuncia, y si encuentra m??rito en su queja, tomar?? las acciones
              correspondientes, dentro del marco legal aplicable a cada caso.
            </Text>
            <Text style={styles.termsText}>
              8. Marcas registradas Las ??Marcas registradas?? de la VECO se
              refieren a todos los nombres, marcas, l??neas de marcas, logotipos,
              dise??os, empaques y otras designaciones de marca que la asociaci??n
              utiliza.
            </Text>
            <Text style={styles.termsText}>
              Todas las marcas registradas y marcas de servicio de VECO o de
              terceros que aparecen en nuestro sitio son de propiedad de sus
              respectivos due??os y su uso o explotaci??n ha sido debidamente
              autorizado por los terceros o por la ley.
            </Text>
            <Text style={styles.termsText}>
              No est?? autorizada la incorporaci??n de las marcas de propiedad del
              usuario o de terceros a ninguna marca registrada de VECO y/o de
              terceros cuyas marcas aparezcan en este sitio, as?? como nombres,
              logotipos, nombres de sus campos de acci??n, conexiones o
              denominaciones.
            </Text>
            <Text style={styles.termsText}>
              9. Pol??tica de privacidad Este sitio est?? abierto al p??blico en
              general, VECO no archiva su informaci??n personal a menos que usted
              la suministre voluntariamente para acceder a ciertos contenidos,
              en los que requerimos el registro. El registro le permite acceder
              a contenidos o a servicios que no est??n disponibles para todos los
              visitantes. Al registrarse y hacer clic en el bot??n ??Acepto??, est??
              aceptando la recolecci??n y uso de dicha informaci??n seg??n lo
              dispuesto en estos t??rminos y especialmente en esta pol??tica de
              privacidad. La informaci??n personal que podr??a solicitarse
              comprende, entre otros, nombre completo, direcci??n electr??nica,
              ciudad, tel??fono; etc.).
            </Text>
            <Text style={styles.termsText}>
              VECO proporcionar?? los medios para la protecci??n de la informaci??n
              personal que suministre a trav??s de este sitio Web. Lo anterior
              incluye medidas para que la informaci??n permanezca protegida
              contra el acceso o uso no autorizado, destrucci??n o modificaci??n.
              La obligaci??n y responsabilidad de VECO al respecto se limita a
              disponer de los medios que considere razonables para este fin, de
              conformidad con la legislaci??n aplicable. En todo caso, VECO no
              garantiza la seguridad total de su informaci??n.
            </Text>
            <Text style={styles.termsText}>
              La informaci??n que suministre en cuestionarios o encuestas ser??
              utilizada, en general, para reportes estad??sticos y an??lisis
              internos. VECO no utilizar?? dicha informaci??n para fines
              comerciales ni la entregar?? a otra entidad para estos fines. En
              general, la informaci??n que suministre a este sitio ser?? utilizada
              para el desarrollo de las actividades que desarrolla la VECO entre
              las cuales puede estar incluida su publicaci??n respetando las
              normas vigentes sobre la materia.
            </Text>
            <Text style={styles.termsText}>
              Al registrarse en este Sitio y/o al enviar correos electr??nicos a
              los contactos disponibles en el, se est?? comunicando VECO y ello
              implica que autoriza a VECO comunicarse con usted a trav??s de su
              correo electr??nico que ha suministrado.
            </Text>
            <Text style={styles.termsText}>
              10. Recolecci??n autom??tica de informaci??n VECO a trav??s de este
              sitio recolecta, de manera autom??tica, ??nicamente informaci??n
              concerniente al uso de esta p??gina, por ejemplo, el IP de su
              computador, el enlace utilizado para ver el sitio (browser), el IP
              de su proveedor de Internet, la direcci??n de Internet desde la
              cual llego a este sitio, la fecha y hora de acceso, las
              operaciones efectuadas y los contenidos y servicios utilizados.
              Esta informaci??n no se vincula a la informaci??n personal y
              solamente es utilizada para mejorar este sitio y su sistema de
              administraci??n. Este sitio usa ??cookies?? que son peque??os archivos
              de datos enviados y guardados en su computador para rastrear su
              uso de Este Sitio.
            </Text>
            <Text style={styles.termsText}>
              11. Uso de hiperv??nculos o links Este sitio puede contener
              hiperv??nculos (links) a otros sitios Web. El acceso y uso de tales
              sitios es por cuenta y riesgo del usuario.
            </Text>
            <Text style={styles.termsText}>
              La creaci??n de un hiperv??nculo (link) hacia sitios Web de terceros
              no implica que VECO avale o recomiende el contenido, la
              informaci??n o cualquiera de los productos o servicios ofrecidos en
              dichos sitios. VECO no asume ninguna responsabilidad por el uso de
              estos sitios ni por sus t??rminos de uso y pol??ticas de privacidad.
            </Text>
            <Text style={styles.termsText}>
              12. Acciones en caso de incumplimiento VECO se reserva el derecho
              a ejercer todas las acciones judiciales y/o administrativas que se
              encuentren a su disposici??n para exigir las responsabilidades que
              se deriven del incumplimiento por parte de un Usuario, de
              cualquiera de las disposiciones de estas condiciones generales de
              uso del sitio.
            </Text>
            <Text style={styles.termsText}>
              13. Duraci??n y terminaci??n La prestaci??n del servicio de portal y
              de los dem??s servicios del sitio, en principio tendr?? duraci??n
              indefinida, no obstante, VECO est?? autorizada para dar por
              terminada o suspender la prestaci??n del servicio del portal y/o de
              cualquiera de los servicios del sitio en cualquier momento, sin
              perjuicio de lo que se hubiere dispuesto al respecto en las
              correspondientes condiciones particulares. Cuando ello sea
              razonablemente posible, VECO, advertir?? previamente la suspensi??n
              terminaci??n.
            </Text>
            <Text style={styles.termsText}>
              14. Ley aplicable y jurisdicci??n Los presentes t??rminos y
              condiciones de uso se rigen por la Ley Colombiana. Cualquier
              controversia surgida del uso de este sitio ser?? sometida a la
              jurisdicci??n de los juzgados y tribunales competentes de la ciudad
              de Bogot?? D.C., Colombia.
            </Text>
            <Text style={styles.termsText}>
              15. Uso de correos electr??nicos Las cuentas de correo electr??nico
              que aparecen en este sitio deben usarse ??nicamente para el fin
              expresamente establecido para dichos correos. En especial ??stos no
              podr??n ser utilizados para:
            </Text>
            <Text style={styles.termsText}>
              i. Env??o de contenidos ilegales.
            </Text>
            <Text style={styles.termsText}>
              ii. Difusi??n masiva de mensajes, en especial de publicidad no
              solicitada.
            </Text>
            <Text style={styles.termsText}>
              iii. Cualquier tipo de ataque encaminado a entorpecer o dificultar
              el servicio de correo u otros servicios.
            </Text>
            <Text style={styles.termsText}>
              16. Recomendaciones a el Usuario i. Aseg??rese de terminar su
              operaci??n o cerrar su sesi??n antes de retirarse de cualquier medio
              donde requiera digitar su clave.
            </Text>
            <Text style={styles.termsText}>
              ii. Varios exploradores o browsers (Software utilizados para
              navegar por Internet, como por ejemplo Netscape o Internet
              Explorer), permiten almacenar las contrase??as que se le solicitan
              en algunos sitios. Debido a que otras personas pueden tener acceso
              a esa informaci??n, no es recomendable hacer uso de esta opci??n.
            </Text>
            <View style={styles.modalTermsBtnContainer}>
              <AppButton
                style={[
                  styles.modalTermsBtn,
                  {backgroundColor: colors.white, borderWidth: 1},
                ]}
                title="Reject"
                onPress={() => {
                  setPrivacyPolicyAccepted(false);
                  setShowPrivacyPolicyModal(false);
                }}
              />
              <AppButton
                style={styles.modalTermsBtn}
                color={colors.primary}
                title="Accept"
                onPress={() => {
                  setPrivacyPolicyAccepted(true);
                  setShowPrivacyPolicyModal(false);
                }}
              />
            </View>
          </ScrollView>
        </View>
        {/* <AppButton
          style={{padding: 10}}
          title="Close"
          color={colors.primary}
          onPress={() => setShowTermsAndConditionModal(false)}
        /> */}
      </Modal>
    </Screen>
  );
};

export default Registration3;

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
    width: 140,
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
  signature: {
    flex: 1,
  },
  modalBtnContainer: {
    // position: 'absolute',
    // bottom: 20,
    flexDirection: 'row',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    padding: 15,
    margin: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  termsText: {
    marginVertical: 10,
  },
  modalTermsBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  modalTermsBtn: {
    flex: 1,
    padding: 15,
    margin: 15,
  },
});
