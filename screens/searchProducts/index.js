import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductCard from '../../Components/ProductCard';
import BrandsCard from '../../Components/brandsCard';
import ProductListItem from '../../Components/ProductListItem';
import MapView, { Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AppButton from '../../Components/AppButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTextInput from '../../Components/AppTextInput';

export default function PurchaseOrders({ navigation }) {
    const changeCatogery = (val) => {
        setSelectedItem(val);
        // navigation.navigate('SearchedProducts', { category: val });
        setNewItems(!newItems);
    }
    const goToBrandProducts = (brand) => {
        console.log(brand, 'produxt');
        var newProducts = products.map(e => e.storeDetails.id === brand.id && e);
        navigation.navigate('SearchedProducts', { products: newProducts });
    };
    const getBrandProducts = (brand) => {
        console.log(brand, 'produxt');
        var newProducts = products.map(e => e.storeDetails.id === brand.id && e);
        setBrandProducts(newProducts);
    }
    const goToProduct = (product) => {
        navigation.navigate('ProductDetail', { product });
    }
    const randomColor = () => {
        var colors = ['#279EC2', '#7700FF', '#02B96A', '#FFB300'];
        var randomIndex = Math.floor(Math.random() * colors.length);
        console.log(randomIndex, 'index');
        return colors[randomIndex];
    }
    const goToList = (products) => {
        navigation.navigate('SearchedProducts', { products });
    }
    const goToPromotions = () => {
        var proProducts = [];
        promotions.map(e => {
            proProducts.push({ ...e.selectedProduct, storeDetails: e.storeDetails })
        })
        navigation.navigate('SearchedProducts', { products: proProducts });
    }
    const getFeaturedProducts = (promotions) => {
        var proProducts = [];
        promotions.map(e => {
            proProducts.push({ ...e.selectedProduct, storeDetails: e.storeDetails })
        })
        setFeaturedProducts(proProducts);
    }
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
    useEffect(() => {
        console.log('USE EFFECT >>>>');
        getCurrentLocation();
        getBrands();

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

    const getBrands = async () => {
        var user = JSON.parse(await AsyncStorage.getItem('user'));
        firestore().collection('store').where('userId', '!=', user.userId).get()
            .then(res => {
                var brands = [];
                res.forEach(e => {
                    brands.push({ ...e.data(), id: e.id });
                })
                setBrands(brands);
                getPromotions(brands);
                getProducts(brands);
                console.log(brands, 'brands');
            })
    };

    const getPromotions = (brands) => {
        var promotions = [];
        brands.forEach(e => {
            var id = e.id;
            firestore().collection('store').doc(id).collection('promotion').get()
                .then(res => {
                    res.forEach(promotion => {
                        promotions.push({
                            ...promotion.data(), id: promotion.id,
                            storeDetails: e
                        });
                        setPromotions(promotions);
                        getFeaturedProducts(promotions);
                        console.log(promotions, 'promotions')
                    })
                })
        })
    }
    const getProducts = (brands) => {
        var products = [];
        brands.forEach(e => {
            var id = e.id;
            firestore().collection('store').doc(id).collection('product').get()
                .then(res => {
                    res.forEach(product => {
                        products.push({
                            ...product.data(), id: product.id,
                            storeDetails: e
                        });
                        console.log(products, 'products')
                    })
                    setProducts(products);
                })
        })
    }
    const getFilteredProducts = () => {
        console.log(productType, productCategory, 'protype,proCat')
        distributorName ? brands.map(brand => {
            if (brand.storeName === distributorName) {
                var res = firestore().collection('store').doc(brand.id).collection('product');
                if (productType) res = res.where('productType', '==', productType);
                if (productCategory) res = res.where('category', '==', productCategory);
                res.get().then(data => {
                    console.log(data, 'data');
                    var filteredResult = [];
                    data.forEach(e => {
                        filteredResult.push({
                            ...e.data(), id: e.id, storeDetails: brand
                        })
                    })
                    console.log(filteredResult, 'filteredResult')
                    setShowFilterModal(false);
                    navigation.navigate('SearchedProducts', { products: filteredResult });
                })
            }
        }) : brands.map(brand => {
            var res = firestore().collection('store').doc(brand.id).collection('product');
            if (productType) res = res.where('productType', '==', productType);
            if (productCategory) res = res.where('category', '==', productCategory);
            res.get().then(data => {
                var filteredResult = [];
                data.forEach(e => {
                    filteredResult.push({
                        ...e.data(), id: e.id, storeDetails: brand
                    })
                })
                console.log(filteredResult, 'filteredResult')
                setShowFilterModal(false);
                navigation.navigate('SearchedProducts', { products: filteredResult });
            })
        })
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

    return (
        <Screen style={{ backgroundColor: colors.light }}>
            <ScrollView style={{ flex: 1, padding: 10 }}>
                <View style={styles.searchBarView}>
                    <FontAwesome style={styles.icon} name='search' size={30} color={colors.dark} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search Dealers, brands and products" />
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                    >
                        <Ionicons
                            style={styles.icon}
                            name='location-sharp'
                            size={30} color={'#007598'} />
                    </TouchableOpacity>
                    <Ionicons
                        style={styles.icon}
                        name='chevron-back-outline'
                        size={30}
                        color={'#007598'} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.bold}>Featured brands and products</Text>
                    <TouchableOpacity onPress={() => setShowFilterModal(true)}>
                        <Ionicons
                            name='md-filter-sharp'
                            size={30}
                            color={'black'} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.horizontalScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => changeCatogery('Milks')} delayPressIn={'300ms'} style={selectedItem === 'Milks' ?
                        styles.selectedHorizontalItems : styles.horizontalItems}
                    >
                        <Text style={selectedItem === 'Milks' ?
                            styles.whiteText : styles.blueText}>Milks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeCatogery('meats')} delayPressIn={'300ms'} style={selectedItem === 'meats' ?
                        styles.selectedHorizontalItems : styles.horizontalItems}
                    >
                        <Text style={selectedItem === 'meats' ?
                            styles.whiteText : styles.blueText}>Meats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeCatogery('Grains')} delayPressIn={'300ms'} style={selectedItem === 'Grains' ?
                        styles.selectedHorizontalItems : styles.horizontalItems}
                    >
                        <Text style={selectedItem === 'Grains' ?
                            styles.whiteText : styles.blueText}>Grains</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeCatogery('drinks')} delayPressIn={'300ms'} style={selectedItem === 'drinks' ?
                        styles.selectedHorizontalItems : styles.horizontalItems}
                    >
                        <Text style={selectedItem === 'drinks' ?
                            styles.whiteText : styles.blueText}>drinks</Text>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView style={{ marginVertical: 20, }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {products && products.map((e, i) => {
                        return <View key={i} style={{ height: 200, width: 150, margin: 10, }}>
                            <ProductCard
                                key={e.productId}
                                label={e.productName}
                                image={e.image}
                                onPress={() => goToList(products)} color={randomColor()} />
                        </View>
                    })
                    }
                </ScrollView>
                <View style={{ marginHorizontal: 20, }}>
                    <Text style={[styles.bold, { fontSize: 20, }]}>
                        Brands
                    </Text>
                </View>
                <ScrollView
                    style={[styles.horizontalScroll]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {
                        brands && brands.map((e, i) => {
                            return <View style={{ height: 80, width: 300, marginVertical: 10, marginHorizontal: 20, }}>
                                <BrandsCard
                                    key={i}
                                    onCardPress={() => goToBrandProducts(e)}
                                    onDotsPress={() => {
                                        getBrandProducts(e);
                                        setBrandProductsModal(true);
                                    }}
                                    title={e.storeName}
                                    subtitle={e.location}
                                    color={i % 2 == 0 ? "#289EC2" : "#EEF8FB"}
                                    subtitleColor={i % 2 != 0 && "grey"}
                                />
                            </View>
                        })
                    }
                    {/* <View style={{ height: 80, width: 300, marginVertical: 10, }}>
                        <BrandsCard
                            onCardPress={goToBrandProducts}
                            onDotsPress={() => setBrandProductsModal(true)}
                            title="Kinner" subtitle="Meats and Grains"
                            color="#EEF8FB"
                            subtitleColor="grey" />
                    </View> */}
                </ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 20, }}>
                    <Text style={[styles.bold, { fontSize: 20, }]}>
                        Available Promotions
                    </Text>
                </View>
                <ScrollView style={{ marginVertical: 20, }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        !!promotions.length && promotions.map((e, i) => {
                            return (
                                <View key={i} style={{ height: 200, width: 150, margin: 10, }}>
                                    <ProductCard color={randomColor()} label={e.name} image={e.imageUri} onPress={() => goToPromotions()} />
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 20, }}>
                    <Text style={[styles.bold, { fontSize: 20, }]}>
                        Featured Products
                    </Text>
                </View>
                <ScrollView style={{ marginVertical: 20, }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        featuredProducts.map((e, i) => {
                            return <View key={i} style={{ height: 150, width: 230, margin: 10, }}>
                                <ProductCard2
                                    price={e.productPrice}
                                    image={e.image}
                                    onPress={() => goToProduct(e)} />
                            </View>
                        })
                    }
                </ScrollView>
            </ScrollView>
            <Modal transparent style={styles.modal} visible={brandProductsModal} animationType="slide">
                <View style={styles.modalView}>
                    <TouchableOpacity delayPressIn="300ms" onPress={() => setBrandProductsModal(false)} style={{ flex: 0.1, width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <AntDesign size={30} name='close' />
                    </TouchableOpacity>
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        {
                            brandProducts.map((e, i) => {
                                return <ProductListItem
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
                            })
                        }
                    </ScrollView>
                </View>
            </Modal>
            <Modal transparent style={styles.modal} visible={showFilterModal} animationType="slide">
                <View style={styles.modalView}>
                    <TouchableOpacity delayPressIn="300ms" onPress={() => setShowFilterModal(false)} style={{ flex: 0.1, width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <AntDesign size={30} name='close' />
                    </TouchableOpacity>
                    <ScrollView style={{ flex: 1, width: '100%' }}>
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
                            onPress={
                                getFilteredProducts
                            }
                        />
                    </ScrollView>

                </View>
            </Modal>
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
        </Screen >
    );
}

const styles = StyleSheet.create({
    searchBarView: {
        borderRadius: 20,
        flex: 1,
        backgroundColor: '#EEF8FB',
        flexDirection: 'row', alignItems: 'center',
        elevation: 10,
        margin: 10, padding: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    row: {
        flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 10,
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
        backgroundColor: "#EEF8FB",
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
        color: '#289EC2'
    },
    input: {
        width: '65%'
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
        padding: 20, justifyContent: 'flex-start', alignItems: 'center'
    },
    modalItem: {
        margin: 10, padding: 10, borderBottomWidth: 0.5, width: '90%'
    },
    modalItemText: {
        color: colors.primary, fontSize: 16, textAlign: 'center'
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
        backgroundColor: '#F5F5F5'
    },
    //upload modal style ends
});
