import React, {Component, useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ProductCard2 from '../../Components/ProductCard2';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductCard from '../../Components/ProductCard';
import BrandsCard from '../../Components/brandsCard';
import ProductListItem from '../../Components/ProductListItem';
import MapView, {Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AppButton from '../../Components/AppButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTextInput from '../../Components/AppTextInput';
import { IMLocalized } from '../../i18n/Localize';

export default function PurchaseOrders({navigation}) {
  const changeCatogery = async (val) => {
    const brandProductsOfType = [];
    for (const brand of brands) {
      var res = firestore()
        .collection('store')
        .doc(brand.id)
        .collection('product');
      const totalProducts = await res.where('productType', '==', val).get();
      const tempProductsOfType = [];

      if (totalProducts.size > 0) {
        for (const productOfType of totalProducts.docs) {
          tempProductsOfType.push({
            id: productOfType.id,
            ...productOfType.data(),
            storeDetails: brand,
          });
        }
        console.log('====================================');
        console.log(tempProductsOfType);
        console.log('====================================');
        brandProductsOfType.push({
          id: brand.id,
          noOfProductAvailableOfType: totalProducts.size,
          products: tempProductsOfType,
          storeDetails: brand,
          randomColor: randomColor(),
        });
      }
    }
    console.log('====================================');

    console.log(brandProductsOfType);
    console.log('====================================');
    setBrandProductsOfType(brandProductsOfType);

    setSelectedItem(val);
  };
  const goToBrandProducts = (brand) => {
    console.log(brand, 'produxt');
    var newProducts = products.filter(
      (e) => e.storeDetails.id === brand.id && e,
    );
    navigation.navigate('SearchedProducts', {products: newProducts});
  };
  const getBrandProducts = (brand) => {
    console.log(brand, 'produxt');
    var newProducts = products.filter(
      (e) => e.storeDetails.id === brand.id && e,
    );
    console.log('====================================');
    console.log('Get Brand Products: ', newProducts);
    console.log('====================================');
    setBrandProducts(newProducts);
    // setBrandProductsLoading(newProducts);
  };
  const goToProduct = (product) => {
    navigation.navigate('ProductDetail', {product});
  };
  const randomColor = () => {
    var colors = ['#279EC2', '#7700FF', '#02B96A', '#FFB300'];
    var randomIndex = Math.floor(Math.random() * colors.length);
    console.log(randomIndex, 'index');
    return colors[randomIndex];
  };
  const goToList = (products) => {
    navigation.navigate('SearchedProducts', {products});
  };
  const goToPromotions = (e, i) => {
    console.log('====================================');
    console.log('Promo Products');
    console.log(e);
    console.log('====================================');

    navigation.navigate('SearchedProducts', {
      products: [{...e.selectedProduct, storeDetails: e.storeDetails}],
    });
  };
  const getFeaturedProducts = (promotions) => {
    var proProducts = [];
    promotions.map((e) => {
      proProducts.push({...e.selectedProduct, storeDetails: e.storeDetails});
    });
    setFeaturedProducts(proProducts);
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

  const getBrands = async () => {
    var user = JSON.parse(await AsyncStorage.getItem('user'));
    const res = await firestore()
      .collection('store')
      .where('userId', '!=', user.userId)
      .get();

    if (res) {
      var brands = [];
      res.forEach((e) => {
        brands.push({...e.data(), id: e.id});
      });
      await getProducts(brands);
      getPromotions(brands);
      setBrands(brands);
      // setBrandsLoading(false);

      console.log(brands, 'brands');
    }
    // .then(() => {
    //   setBrandsLoading(false);
    // });
  };

  const getPromotions = async (brandsArray) => {
    var promotions = [];
    // if (brands.length <= 0) {
    //   setPromotionsLoading(false);
    //   setFeaturedProductsLoading(false);
    // }

    for (const e of brandsArray) {
      var id = e.id;
      const res = await firestore()
        .collection('store')
        .doc(id)
        .collection('promotion')
        .get();
      if (res) {
        res.forEach((promotion) => {
          promotions.push({
            ...promotion.data(),
            id: promotion.id,
            storeDetails: e,
          });
        });
      }
      // .then(() => {
      //   setPromotionsLoading(false);
      //   setFeaturedProductsLoading(false);
      // });
    }
    setPromotions(promotions);
    getFeaturedProducts(promotions);
    console.log(promotions, 'promotions');
  };
  const getProducts = async (brands) => {
    var tempProducts = [];
    for (const e of brands) {
      var id = e.id;
      const res = await firestore()
        .collection('store')
        .doc(id)
        .collection('product')
        .get();
      if (res) {
        for (const pTemp of res.docs) {
          tempProducts.push({
            ...pTemp.data(),
            id: pTemp.id,
            storeDetails: e,
            randomColor: randomColor(),
          });
        }
      }
    }
    setProductsLoading(false);
    setProducts(tempProducts);
  };
  const getFilteredProducts = () => {
    console.log(productType, productCategory, 'protype,proCat');
    distributorName
      ? brands.map((brand) => {
          if (brand.storeName === distributorName) {
            var res = firestore()
              .collection('store')
              .doc(brand.id)
              .collection('product');
            if (productType) res = res.where('productType', '==', productType);
            if (productCategory)
              res = res.where('category', '==', productCategory);
            res.get().then((data) => {
              console.log(data, 'data');
              var filteredResult = [];
              data.forEach((e) => {
                filteredResult.push({
                  ...e.data(),
                  id: e.id,
                  storeDetails: brand,
                });
              });
              console.log(filteredResult, 'filteredResult');
              setShowFilterModal(false);
              navigation.navigate('SearchedProducts', {
                products: filteredResult,
              });
            });
          }
        })
      : brands.map((brand) => {
          var res = firestore()
            .collection('store')
            .doc(brand.id)
            .collection('product');
          if (productType) res = res.where('productType', '==', productType);
          if (productCategory)
            res = res.where('category', '==', productCategory);
          res.get().then((data) => {
            var filteredResult = [];
            data.forEach((e) => {
              filteredResult.push({
                ...e.data(),
                id: e.id,
                storeDetails: brand,
              });
            });
            console.log(filteredResult, 'filteredResult');
            setShowFilterModal(false);
            navigation.navigate('SearchedProducts', {products: filteredResult});
          });
        });
  };

  const [selectedItem, setSelectedItem] = useState('Milks');
  const [brandProductsModal, setBrandProductsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 24.860966,
    longitude: 66.990501,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [tempCoordinate, setTempCoordinate] = useState();
  const [locationToEdit, setLocationToEdit] = useState();
  const [locationDetailsArray, setLocationDetailsArray] = useState([]);
  const [location, setLocation] = useState('');
  const [newItems, setNewItems] = useState(false);
  const [brands, setBrands] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);
  const [productType, setProductType] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const [loadingProducts, setProductsLoading] = useState(false);
  const [loadingBrands, setBrandsLoading] = useState(false);
  const [loadingBrandsProducts, setBrandProductsLoading] = useState(false);
  const [loadingPromotions, setPromotionsLoading] = useState(false);
  const [loadingFeaturedProducts, setFeaturedProductsLoading] = useState(false);

  const [productTypes, setProductTypes] = useState([]);
  const [brandProductsOfType, setBrandProductsOfType] = useState([]);
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    setProductsLoading(true);
    // setBrandsLoading(true);
    // setBrandProductsLoading(true);
    // setPromotionsLoading(true);
    // setFeaturedProductsLoading(true);

    console.log('USE EFFECT >>>>');
    getCurrentLocation();
    getBrands().finally(() => {
      getProductTypes();
    });
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
        console.log(productTypesArray);
      });
  };

  const handleSearchProduct = () => {
    const searchedProducts = products.filter(
      (i) =>
        i.productName.toLowerCase().includes(queryString.toLowerCase()) ||
        i.productType.toLowerCase().includes(queryString.toLowerCase()),
    );
    navigation.navigate('SearchedProducts', {products: searchedProducts});
  };

  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <View style={styles.searchBarView}>
          <TouchableOpacity onPress={handleSearchProduct}>
            <FontAwesome
              style={styles.icon}
              name="search"
              size={30}
              color={colors.dark}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={IMLocalized("Search Products")}
            onChangeText={(text) => setQueryString(text)}
          />
          {/* <TouchableOpacity onPress={() => setShowModal(true)}>
            <Ionicons
              style={styles.icon}
              name="location-sharp"
              size={30}
              color={'#007598'}
            />
          </TouchableOpacity> */}
          <Ionicons
            style={styles.icon}
            name="chevron-back-outline"
            size={30}
            color={'#007598'}
          />
        </View>
        <View style={styles.row}>
          <AppText style={styles.bold}>Featured brands and products</AppText>
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Ionicons name="md-filter-sharp" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        {/* <View style={{height: 50, width: '100%'}}> */}
        <FlatList
          data={productTypes}
          horizontal={true}
          // style={{backgroundColor: 'red'}}
          keyExtractor={(pType) => pType.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => changeCatogery(item.label)}
              delayPressIn={'300ms'}
              style={
                selectedItem === item.label
                  ? styles.selectedHorizontalItems
                  : styles.horizontalItems
              }>
              <Text
                style={
                  selectedItem === item.label
                    ? styles.whiteText
                    : styles.blueText
                }>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* </View> */}
        {/* {products.length > 0 && ( */}
        <FlatList
          data={brandProductsOfType}
          horizontal={true}
          renderItem={({item, index}) => (
            <View key={index} style={{height: 200, width: 150, margin: 10}}>
              <ProductCard
                key={item.storeDetails.id}
                label={item.storeDetails.storeName}
                image={item.storeDetails.imageUrl}
                noOfProductAvailableOfType={item.noOfProductAvailableOfType}
                onPress={() => goToList(item.products)}
                color={item.randomColor}
              />
            </View>
          )}
        />
        {/* )} */}
        <View style={{marginHorizontal: 20}}>
          <AppText style={[styles.bold, {fontSize: 20}]}>Dealers</AppText>
        </View>
        {loadingBrands && (
          <ActivityIndicator style={{paddingHorizontal: 10}} color={'black'} />
        )}
        {!loadingBrands && (
          <ScrollView
            style={[styles.horizontalScroll]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {brands &&
              brands.map((e, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height: 80,
                      width: 300,
                      marginVertical: 10,
                      marginHorizontal: 20,
                    }}>
                    <BrandsCard
                      key={i}
                      onCardPress={() => goToBrandProducts(e)}
                      onDotsPress={() => {
                        getBrandProducts(e);
                        setBrandProductsModal(true);
                      }}
                      title={e.storeName}
                      subtitle={e.location}
                      color={i % 2 == 0 ? '#289EC2' : '#EEF8FB'}
                      subtitleColor={i % 2 != 0 && 'grey'}
                    />
                  </View>
                );
              })}
            {/* <View style={{ height: 80, width: 300, marginVertical: 10, }}>
                        <BrandsCard
                            onCardPress={goToBrandProducts}
                            onDotsPress={() => setBrandProductsModal(true)}
                            title="Kinner" subtitle="Meats and Grains"
                            color="#EEF8FB"
                            subtitleColor="grey" />
                    </View> */}
          </ScrollView>
        )}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <AppText style={[styles.bold, {fontSize: 20}]}>
            Available Promotions
          </AppText>
        </View>
        {loadingPromotions && (
          <ActivityIndicator style={{paddingHorizontal: 10}} color={'black'} />
        )}
        {!loadingPromotions && (
          <ScrollView
            style={{marginVertical: 20}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {!!promotions.length &&
              promotions.map((e, i) => {
                return (
                  <View key={i} style={{height: 200, width: 150, margin: 10}}>
                    <ProductCard
                      key={i}
                      color={randomColor()}
                      label={e.name}
                      image={e.imageUri}
                      onPress={() => goToPromotions(e, i)}
                    />
                  </View>
                );
              })}
          </ScrollView>
        )}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <AppText style={[styles.bold, {fontSize: 20}]}>
            Featured Products
          </AppText>
        </View>
        {loadingFeaturedProducts && (
          <ActivityIndicator style={{paddingHorizontal: 10}} color={'black'} />
        )}
        {!loadingFeaturedProducts && (
          <ScrollView
            style={{marginVertical: 20}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {featuredProducts.map((e, i) => {
              return (
                <View key={i} style={{height: 150, width: 230, margin: 10}}>
                  <ProductCard2
                    price={e.productPrice}
                    key={i}
                    image={e.image}
                    onPress={() => goToProduct(e)}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}
      </ScrollView>
      <Modal
        transparent
        style={styles.modal}
        visible={brandProductsModal}
        animationType="slide">
        <View style={styles.modalView}>
          <TouchableOpacity
            delayPressIn="300ms"
            onPress={() => setBrandProductsModal(false)}
            style={{
              flex: 0.1,
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <AntDesign size={30} name="close" />
          </TouchableOpacity>
          <ScrollView style={{flex: 1, width: '100%'}}>
            {brandProducts.map((e, i) => {
              return (
                <ProductListItem
                  key={i}
                  image={e.image}
                  name={e.storeName}
                  title={e.productName}
                  price={e.productPrice}
                  rating={e.rating}
                  onPress={() => {
                    setBrandProductsModal(false);
                    goToProduct(e);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <Modal
        transparent
        style={styles.modal}
        visible={showFilterModal}
        animationType="slide">
        <View style={styles.modalView}>
          <TouchableOpacity
            delayPressIn="300ms"
            onPress={() => setShowFilterModal(false)}
            style={{
              flex: 0.1,
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <AntDesign size={30} name="close" />
          </TouchableOpacity>
          <ScrollView style={{flex: 1, width: '100%'}}>
            <AppTextInput
              style={styles.mVertical}
              placeHolder="Product Type"
              value={productType}
              onChangeText={(txt) => {
                setProductType(txt);
              }}
            />
            <AppTextInput
              style={styles.mVertical}
              placeHolder="Distributor Name"
              value={distributorName}
              onChangeText={(txt) => {
                setDistributorName(txt);
              }}
            />
            <AppTextInput
              style={styles.mVertical}
              placeHolder="Product Category"
              value={productCategory}
              onChangeText={(txt) => {
                setProductCategory(txt);
              }}
            />
            <AppButton
              style={styles.modalBtn}
              color={colors.primary}
              title="Search"
              onPress={getFilteredProducts}
            />
          </ScrollView>
        </View>
      </Modal>
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
  searchBarView: {
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#EEF8FB',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    margin: 10,
    padding: 5,
    justifyContent: 'space-around',
  },
  icon: {
    marginHorizontal: 5,
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
  horizontalScroll: {
    flex: 1,
    // height:100,
  },
  horizontalItems: {
    flex: 1,
    backgroundColor: '#EEF8FB',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  selectedHorizontalItems: {
    backgroundColor: '#289EC2',
    flex: 1,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  whiteText: {
    color: 'white',
  },
  blueText: {
    color: '#289EC2',
  },
  input: {
    width: '65%',
  },
  // upload modal style
  modal: {
    flex: 1,
  },
  modalView: {
    marginTop: '25%',
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: '70%',
    elevation: 15,
    padding: 20,
    justifyContent: 'flex-start',
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
  mVertical: {
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  //upload modal style ends
});
