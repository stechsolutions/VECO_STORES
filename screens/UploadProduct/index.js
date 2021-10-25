import React, {useEffect, useState} from 'react';
import AppText from '../../Components/AppText';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import Screen from '../../Components/Screen';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import colors from '../../config/colors';
import AppButton from '../../Components/AppButton';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTimePicker from '../../Components/AppTimePicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppLoader from '../../Components/AppLoader';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IMLocalized} from '../../i18n/Localize';

// const productTypes = [{label: 'Type 1'}, {label: 'Type 2'}];

const priceTypes = [
  {label: 'type 1', id: 1},
  {label: 'type 2', id: 2},
];
const colorsArr = [
  {label: 'red', id: 1},
  {label: 'blue', id: 2},
];
const sizes = [
  {label: 'large', id: 1},
  {label: 'medium', id: 2},
  {label: 'small', id: 3},
];
const index = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [total, setTotal] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState();
  const [presentation, setPresentation] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [unit, setUnit] = useState();
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const [showCameraGalleryModal, setShowCameraGalleryModal] = useState(false);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [searchText, setSearchtext] = useState('');

  const [productTypes, setProductTypes] = useState([
    {label: 'Type 1'},
    {label: 'Type 2'},
  ]);

  useEffect(() => {
    // if (data.length <= 0) setRefreshing(true);
    // else setRefreshing(false);
    getVendorProductCollections();
    getProductTypes();
  }, []);

  const getProductTypes = () => {
    const productTypesArray = [];
    firestore()
      .collection('productTypes')
      .get()
      .then((snapshot) => {
        for (const snap of snapshot.docs) {
          const snapData = {id: snap.id, ...snap.data()};
          productTypesArray.push(snapData);
        }
        setProductTypes(productTypesArray);
      });
  };

  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue, 'selected vale');
    setStartDate(selectedValue);
    setShowStartDatePicker(false);
  };
  // const handleImageUpload = () => {
  //   try {
  //     ImagePicker.launchImageLibrary(
  //       {
  //         noData: true,
  //       },
  //       (response) => {
  //         console.log('THIS IS THE IMAGE : ', response.uri);
  //         response && setImage(response.uri);
  //       },
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const uploadProductFunc = async () => {
    setLoading(true);
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    var response = await fetch(image);
    var blob = await response.blob();
    storage()
      .ref(`products/${store.storeId}/${Date.now()}`)
      .put(blob)
      .on(
        'state_changed',
        () => {},
        () => {},
        (imageRes) => {
          imageRes.ref.getDownloadURL().then((url) => {
            const product = {
              productType,
              productName,
              productPrice,
              image: url,
              total,
              price,
              color,
              size,
              shortDescription,
              longDescription,
              unit,
              presentation,
              expiryDate: startDate,
              comment1,
              comment2,
              available: total,
            };
            firestore()
              .collection('vendorStores')
              .doc(store.storeId)
              .collection('products')
              .add(product)
              .then((res) => {
                setLoading(false);
                Alert.alert(
                  'Product Created',
                  'Product has been created successfully',
                  [{text: 'OK', onPress: () => navigation.goBack()}],
                  {cancelable: false},
                );
                console.log(res);
              })
              .catch((e) => {
                setLoading(false);
                Alert.alert(
                  'Something Went Wrong',
                  '',
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              });
          });
        },
      );
  };
  const setPhoto = () => {
    setImage('../../assets/images/Spray.jpg');
    setShowGallery(false);
  };

  const getVendorProductCollections = async () => {
    setRefreshing(true);
    // const vendorProductCollections = await firestore()
    //   .collection('store')
    //   .get();
    // if (vendorProductCollections.size > 0) {
    //   const temp = [];
    //   const productCollections = [];
    //   vendorProductCollections.forEach((productCollection) => {
    //     const {storeName} = productCollection.data();
    //     const obj = {distributer: storeName, id: productCollection.id};
    //     temp.push(obj);
    //   });
    //   for (const collection in temp) {
    //     const productsCollection = await firestore()
    //       .collection('store')
    //       .doc(temp[collection].id)
    //       .collection('product')
    //       .get();
    //     if (productsCollection.size > 0) {
    //       const products = [];
    //       productsCollection.forEach((product) =>
    //         products.push(product.data()),
    //       );
    //       productCollections.push({
    //         distributer: temp[collection].distributer,
    //         products: products,
    //       });
    //     }
    //   }
    //   setData(productCollections);
    //   setFiltered(productCollections);

    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const distributers = await firestore().collection('distributer').get();
    const productsCollection = [];
    for (const distributer of distributers.docs) {
      const {key} = distributer.data();
      console.log('====================================');
      console.log('Key', key);
      console.log('====================================');
      const vendors = await firestore()
        .collection('distributer')
        .doc(key)
        .collection('vendors')
        .where('key', '==', user.key)
        .get();

      console.log('====================================');
      console.log(vendors.size);
      console.log('====================================');
      if (vendors.size > 0) {
        const storeRef = firestore()
          .collection('store')
          .where('userId', '==', key);

        const stores = await storeRef.get();

        for (const store of stores.docs) {
          const storeData = store.data();

          const productsRef = firestore()
            .collection('store')
            .doc(store.id)
            .collection('product');

          console.log('storeData', storeData);

          const distributerObj = {};

          const products = await productsRef.get();
          const productsArray = [];
          if (!products.empty || products.size > 0)
            for (const product of products.docs) {
              productsArray.push(product.data());
            }

          productsCollection.push({
            distributer: storeData.storeName,
            id: store.id,
            products: productsArray,
          });
          console.log(productsCollection);
        }
      }
    }

    setData(productsCollection);
    setFiltered(productsCollection);
    setRefreshing(false);
  };

  const setProductDetails = (item) => {
    setProductType(item.productType);
    setProductName(item.productName);
    setProductPrice(item.productPrice);
    // setTotalAvaliable(item.available);
    // setPriceType(item.priceType);
    setColor(item.color);
    setSize(item.size);
    setShortDescription(item.shortDescription);
    setLongDescription(item.longDescription);
    setImage(item.image);
    setStartDate(new Date(item.expiryDate._seconds * 1000));
    setUnit(item.unit);
    setPresentation(item.presentation);
    setComment1(item.comment1);
    setComment2(item.comment2);
    setImage(item.image);
    setShowGallery(false);
  };

  const handleImageUpload = () => {
    setShowCameraGalleryModal(true);
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
              response && setImage(response.uri);
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

  const pickImage = (value) => {
    switch (value) {
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
              response && setImage(response.uri);
            },
          );
        } catch (error) {
          console.log(error);
        }
        break;
      case 'distributerGallery':
        setShowGallery(true);
        getVendorProductCollections();
        break;
    }
  };

  const handleSearch = () => {
    if (searchText.length <= 1) {
      setFiltered(data);
    } else {
      const filteredData = data.filter((product) => {
        if (product.distributer.includes(searchText)) return product;
        else
          for (const i in product.products) {
            if (
              product.products[i].productName.toLowerCase().includes(searchText)
            )
              return product;
            // console.log(i.productName);
          }
      });
      console.log(filteredData);
      setFiltered(filteredData);
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView style={{flex: 1, padding: 10}}>
        {image ? (
          <TouchableOpacity
            onPress={() => handleImageUpload()}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: image}}
              style={{width: 100, height: 100, borderRadius: 20}}
            />
          </TouchableOpacity>
        ) : (
          <AppImageUploadButton
            style={[styles.imageUploadBtn, styles.mVertical]}
            title="Upload Product Picture"
            onPress={() => {
              handleImageUpload();
              console.log('Import Product Inventory >>>> Image Upload');
            }}
          />
        )}
        <AppPicker
          items={productTypes}
          style={styles.mVertical}
          title={productType ? productType : 'Select Item'}
          value={productType}
          onSelectItem={(txt) => {
            setProductType(txt.label);
          }}
        />
        <AppTextInput
          placeHolder="Product Name"
          style={[{backgroundColor: colors.white}, styles.mVertical]}
          value={productName}
          onChangeText={(txt) => {
            setProductName(txt);
          }}
        />
        <AppTextInput
          placeHolder="Product Price"
          style={[{backgroundColor: colors.white}, styles.mVertical]}
          value={productPrice}
          onChangeText={(txt) => {
            setProductPrice(txt);
          }}
        />
        <AppTextInput
          placeHolder="Presentation"
          style={[{backgroundColor: colors.white}, styles.mVertical]}
          value={presentation}
          onChangeText={(txt) => {
            setPresentation(txt);
          }}
        />
        <AppTextInput
          placeHolder="Unit"
          style={[{backgroundColor: colors.white}, styles.mVertical]}
          value={unit}
          onChangeText={(txt) => {
            setUnit(txt);
          }}
        />
        <AppTextInput
          placeHolder="Comment 1"
          style={[{backgroundColor: colors.white}, styles.mVertical]}
          value={comment1}
          onChangeText={(txt) => {
            setComment1(txt);
          }}
        />
        <AppTextInput
          placeHolder="Comment 2"
          style={[{backgroundColor: colors.white}, styles.mVertical]}
          value={comment2}
          onChangeText={(txt) => {
            setComment2(txt);
          }}
        />
        <View style={styles.subContainer}>
          <AppText style={styles.title}>Set Expiry Date</AppText>
          <View style={styles.timeContainer}>
            <AppTimePicker
              date={startDate ? startDate : new Date()}
              onPress={() => {
                setShowStartDatePicker(true);
              }}
            />
          </View>
        </View>
        {showStartDatePicker && (
          <DateTimePicker
            onTouchCancel={() => setShowStartDatePicker(false)}
            mode="date"
            value={startDate ? startDate : new Date()}
            onChange={onStartDateChange}
            // onChange={(date) => onStartDateChange(date)}
          />
        )}
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-evenly'},
            styles.mVertical,
          ]}>
          <AppTextInput
            style={[
              {width: '50%', backgroundColor: colors.white, marginRight: 5},
            ]}
            placeHolder="Total Available"
            value={total}
            onChangeText={(txt) => {
              setTotal(txt);
            }}
          />
          <AppPicker
            items={priceTypes}
            style={[
              {width: '50%', backgroundColor: colors.white, marginLeft: 5},
            ]}
            color={colors.dark}
            title={price ? price : 'Price Type'}
            value={price}
            onSelectItem={(txt) => {
              setPrice(txt.label);
            }}
          />
        </View>
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-evenly'},
            styles.mVertical,
          ]}>
          <AppPicker
            items={colorsArr}
            style={[
              {width: '50%', backgroundColor: colors.white, marginRight: 5},
            ]}
            color={colors.dark}
            title={color ? color : 'Color'}
            value={color}
            onSelectItem={(txt) => {
              setColor(txt.label);
            }}
          />
          <AppPicker
            items={sizes}
            style={[
              {width: '50%', backgroundColor: colors.white, marginLeft: 5},
            ]}
            color={colors.dark}
            title={size ? size : 'Size'}
            value={size}
            onSelectItem={(txt) => {
              setSize(txt.label);
            }}
          />
        </View>
        <AppTextInput
          style={styles.mVertical}
          placeHolder="Short Description"
          value={shortDescription}
          onChangeText={(txt) => {
            setShortDescription(txt);
          }}
        />
        <AppTextInput
          style={styles.mVertical}
          placeHolder="Long Description"
          value={longDescription}
          onChangeText={(txt) => {
            setLongDescription(txt);
          }}
        />
        <AppButton
          disabled={
            !image ||
            !productType ||
            !productPrice ||
            !productName ||
            !unit ||
            !presentation
          }
          loading={loading}
          title="UPLOAD"
          style={[styles.btn, styles.mVertical]}
          color={colors.primary}
          onPress={uploadProductFunc}
        />
      </ScrollView>
      {/* <Modal
        transparent
        style={styles.modal}
        visible={showModal}
        animationType="slide">
        <View style={styles.modalView}>
          <TouchableOpacity
            delayPressIn="300ms"
            onPress={() => setShowModal(false)}
            style={{
              flex: 0.1,
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <AntDesign size={30} name="close" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageHandler} style={styles.modalItem}>
            <AppText style={styles.modalItemText}> From Phone </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
              setShowGallery(true);
              getVendorProductCollections();
            }}
            style={styles.modalItem}>
            <Text style={styles.modalItemText}>
              {' '}
              From Distributor's Gallery{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      <Modal style={styles.modal} visible={showGallery} animationType="slide">
        <View style={styles.galleryHead}>
          <AppText style={styles.galleryHeadText}>Select Photo</AppText>
          <View style={{marginHorizontal: 20, paddingTop: 20}}>
            <View style={[styles.searchBarView]}>
              <FontAwesome
                style={styles.icon}
                name="search"
                size={30}
                color={colors.dark}
              />
              <TextInput
                style={styles.input}
                placeholder={IMLocalized('Search Distributer, products')}
                onChangeText={(text) => {
                  setSearchtext(text.toLowerCase());
                  handleSearch();
                }}
              />
            </View>
          </View>
        </View>
        {/* <ScrollView style={{flex: 0.8}}> */}
        <View style={styles.galleryView}>
          {/* <Text>No Photo</Text> */}

          {refreshing && <AppLoader />}
          {!refreshing && (
            <View style={styles.catelog}>
              <FlatList
                data={filtered}
                refreshing={refreshing}
                onRefresh={getVendorProductCollections}
                // pagingEnabled
                maxToRenderPerBatch={10}
                ItemSeparatorComponent={() => <View style={{padding: 10}} />}
                keyExtractor={(data, index) => Date.now().toString() + index}
                contentContainerStyle={{paddingBottom: 40}}
                renderItem={({item}) => {
                  return (
                    <View>
                      <Text
                        style={
                          styles.distributer
                        }>{`Distributer: ${item.distributer}`}</Text>
                      <FlatList
                        data={item.products}
                        pagingEnabled
                        maxToRenderPerBatch={5}
                        numColumns={3 || 0}
                        columnWrapperStyle={{
                          justifyContent: 'space-between',
                          flex: 1,
                          flexWrap: 'wrap',
                        }}
                        ItemSeparatorComponent={() => (
                          <View style={{padding: 10}} />
                        )}
                        keyExtractor={(data, index) =>
                          data.productCode + index + Date.now().toString()
                        }
                        renderItem={({item}) => {
                          return (
                            <TouchableOpacity
                              onPress={() => setProductDetails(item)}
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View style={styles.productContainer}>
                                <Image
                                  source={{uri: item.image}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 20,
                                  }}
                                />
                                <Text
                                  style={styles.productName}
                                  numberOfLines={1}
                                  ellipsizeMode="tail">
                                  {item.productName}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          )}
          {/* <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity> */}
        </View>
        {/* </ScrollView> */}
        <View style={styles.btnView}>
          <AppButton
            style={styles.modalBtn}
            color={colors.primary}
            title="Cancel"
            onPress={() => setShowGallery(false)}
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
                <Ionicons name="camera" size={24} color={colors.black} />
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
                pickImage('distributerGallery');
                setShowCameraGalleryModal(!showCameraGalleryModal);
              }}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name="photo" size={24} color={colors.black} />
                <AppText style={styles.textStyle}>
                  From Distributor's Gallery
                </AppText>
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
};

export default index;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: colors.light,
    // padding: 10,
  },
  btn: {
    width: '100%',
    padding: 15,
    marginBottom: 100,
  },
  imageUploadBtn: {
    width: '100%',
  },
  mVertical: {
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // upload modal style
  modal: {
    flex: 1,
  },
  modalView: {
    marginTop: '50%',
    borderRadius: 20,
    marginHorizontal: 40,
    backgroundColor: 'white',
    height: '30%',
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    width: '90%',
  },
  modalItemText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  //upload modal style ends

  //distributor gallery starts
  galleryHead: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  galleryHeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  galleryView: {
    flex: 1,
    // flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageView: {
    width: 150,
    height: 150,
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  btnView: {
    flex: 0.15,
  },
  modalBtn: {
    flex: 1,
    padding: 15,
    margin: 15,
  },

  productName: {
    textAlign: 'center',
    fontSize: 12,
  },
  distributer: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: colors.primary,
    backgroundColor: colors.secondary,
    marginVertical: 20,
  },
  catelog: {
    width: '100%',
  },

  productContainer: {
    width: 100,
    height: 140,
  },

  searchBarView: {
    borderRadius: 20,
    width: '100%',
    height: 60,
    backgroundColor: '#EEF8FB',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    paddingHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    width: '85%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  bold: {
    fontWeight: 'bold',
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
