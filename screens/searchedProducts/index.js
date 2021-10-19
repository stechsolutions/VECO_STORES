import React, {Component, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
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
import {color} from 'react-native-reanimated';
import ProductCard from '../../Components/ProductCard';
import BrandsCard from '../../Components/brandsCard';
import ProductListItem from '../../Components/ProductListItem';
import MapView, {Marker} from 'react-native-maps';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AppButton from '../../Components/AppButton';

export default function SearchedProducts({navigation, route}) {
  const changeCatogery = (val) => {
    setSelectedItem(val);
  };
  const openFilterModal = () => {
    //open filter modal code
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
  useEffect(() => {
    console.log(route.params, 'params');
  }, []);
  const goToProduct = (product) => {
    navigation.navigate('ProductDetail', {product});
  };
  const [selectedItem, setSelectedItem] = useState('Milks');
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
  const [products, setProducts] = useState([]);

  const [queryString, setQueryString] = useState('');
  const handleSearchProduct = (queryString) => {
    const searchedProducts = products.filter(
      (i) =>
        i &&
        (i?.productName.toLowerCase().includes(queryString.toLowerCase()) ||
          i?.productType.toLowerCase().includes(queryString.toLowerCase())),
    );
    setProducts(searchedProducts);
    if (queryString === '' || queryString.length < 0)
      setProducts(route.params.products);
  };

  useEffect(() => {
    console.log('USE EFFECT >>>>');
    getCurrentLocation();
    var products = route.params.products;
    console.log('products in searched products', products);
    setProducts(products);
  }, []);

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
            onChangeText={(text) => {
              handleSearchProduct(text);
              setQueryString(text);
            }}
            placeholder="Search Products"
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
          <Text style={styles.bold}>Result Found ({products.length})</Text>
          <TouchableOpacity delayPressIn="300ms" onPress={openFilterModal}>
            <Ionicons name="md-filter-sharp" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
          {products &&
            products.map((e, i) => {
              return (
                <ProductListItem
                  key={i}
                  image={e.image}
                  name={e.storeName}
                  title={e.productName}
                  price={e.productPrice}
                  rating={e.rating}
                  onPress={() => goToProduct(e)}
                />
              );
            })}
          {/* <ProductListItem onPress={goToProduct} />
                    <ProductListItem onPress={goToProduct} />
                    <ProductListItem onPress={goToProduct} />
                    <ProductListItem onPress={goToProduct} />
                    <ProductListItem onPress={goToProduct} />
                    <ProductListItem onPress={goToProduct} /> */}
        </ScrollView>
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
  searchBarView: {
    // margin: 10, padding: 5,
    // flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 20, borderWidth: 1,
    // borderColor: colors.dark,
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#EEF8FB',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    margin: 10,
    justifyContent: 'space-around',
    padding: 5,
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
