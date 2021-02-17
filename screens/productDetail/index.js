import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Image, ActivityIndicator, Share } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import Counter from '../../Components/Counter';
import AppButton from '../../Components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetail({ navigation, route, setCartCount, cartCount }) {
    const [count, setCount] = useState(0);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        var product = route.params.product;
        console.log(product, 'product');
        getCart();
        setProduct(product);
    }, []);
    const getCart = async () => {
        var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));
        console.log(cart, 'cart')
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Product Details',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const addItem = async () => {
        console.log(count, 'count');
        if (count > 0) {
            const { productName, size, productPrice, color, id } = product;
            var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));

            if (cart && cart.length) {
                var flag = true;
                cart.map(e => {
                    if (e.storeDetails.id === product.storeDetails.id) {
                        flag = false;
                        var filtered = e.products.map((p) => p.id === product.id);
                        var index = filtered.indexOf(true);
                        if (index >= 0) {
                            e.products[index].qty = e.products[index].qty + count;
                            e.total += count * e.products[index].productPrice;
                        } else {
                            var newProduct = { id, productName, size, productPrice, color, qty: count };
                            e.total += count * newProduct.productPrice;
                            e.products.push(newProduct);
                            setCartCount(cartCount + 1);
                        }
                    }
                    if (flag) {
                        var cartItem = {
                            storeDetails: product.storeDetails,
                            products: [
                                { id, productName, size, productPrice, color, qty: count }
                            ],
                            total: productPrice * count
                        };
                        cart.push(cartItem);
                        setCartCount(cartCount + 1);
                    }
                });
                AsyncStorage.setItem('storeCart', JSON.stringify(cart)).then(()=>{
                    navigation.goBack();
                })
            } else {
                cart = [];
                const { productName, size, productPrice, color, id } = product;
                var cartItem = {
                    storeDetails: product.storeDetails,
                    products: [
                        { productName, size, productPrice, color, qty: count, id }
                    ],
                    total: productPrice * count,
                };
                setCartCount(cartCount+1);
                cart.push(cartItem);
                await AsyncStorage.setItem('storeCart', JSON.stringify(cart)).then(()=>{
                    navigation.goBack();
                });
            }
        }
    }
    return (
        product ? <Screen style={{ backgroundColor: colors.light }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.bgImageView}>
                    <Image
                        source={{ uri: product.storeDetails.imageUrl } || require('../../assets/images/bbq.jpg')}
                        style={styles.bgImage}
                    />
                    <View style={styles.overlayView}>
                        <View style={styles.head}>
                            <Text style={styles.headText}>{product.productName} | {product.storeDetails.storeName}</Text>
                            <View style={styles.ratingView}>
                                <FontAwesome
                                    size={20}
                                    name='star'
                                    color={'white'}
                                />
                                <Text style={styles.rating}>{product.rating ? product.rating : 0}</Text>
                            </View>
                        </View>
                        <View style={styles.detailView}>
                            <View style={styles.details}>
                                <View style={{
                                    flex: 1, flexDirection: 'row',
                                    justifyContent: 'space-between', alignItems: 'flex-end'
                                }}>
                                    <View style={[styles.yellowBg, { height: 40, flex: 0.9 }]}>
                                        <Text style={styles.yellowbgText}>{product.productType}</Text>
                                    </View>
                                    <View style={styles.roundImageView}>
                                        <Image
                                            style={styles.roundImage}
                                            source={product.image && { uri: product.image }}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.otherDetails, { marginTop: 5, }]}>
                                    <View
                                        style={styles.iconView}
                                    >
                                        <AntDesign color="#289EC2" name='hearto' size={25} />
                                    </View>
                                    <TouchableOpacity
                                        onPress={onShare}
                                        style={styles.iconView}
                                    >
                                        <Entypo color="#289EC2" name='share' size={25} />
                                    </TouchableOpacity>
                                    <View
                                        style={[styles.iconView, styles.purchaseView]}
                                    >
                                        <View
                                            style={styles.counterView}
                                        >
                                            <Counter
                                                count={count}
                                                setCount={setCount}
                                            />
                                        </View>
                                        <Text style={styles.buyText}>Buy: ${product.productPrice}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={addItem}
                                        style={{
                                            flex: 0.3, flexDirection: 'row',
                                            justifyContent: 'space-between', alignItems: 'center',
                                            borderWidth: 1, borderColor: colors.secondary, borderRadius: 20,
                                            paddingHorizontal: 10, marginHorizontal: 10, backgroundColor: 'white'
                                        }}>
                                        <Text style={styles.addText}>Add</Text>
                                        <Feather name='shopping-cart' size={30} color={colors.secondary} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={styles.productDes}>
                    <Text style={styles.desHead}>
                        Long Product Description
                    </Text>
                    <Text style={styles.desText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Text>
                </View>
                <View style={[styles.productDes, { borderBottomWidth: 0, }]}>
                    <Text style={styles.desHead}>
                        Product Size and Feature
                    </Text>
                    <Text style={styles.blueText}>
                        Features 1:
                    </Text>
                    {
                        ['A', 'B', 'C', 'D'].map((e, i) => {
                            return <Text key={i} style={styles.featureItems}>- {e}</Text>
                        })
                    }
                    <Text style={styles.blueText}>
                        Features 2:
                    </Text>
                    {
                        ['A', 'B', 'C', 'D'].map((e, i) => {
                            return <Text key={i} style={styles.featureItems}>- {e}</Text>
                        })
                    }
                </View>
                <View style={[styles.productDes, { marginBottom: 20, }]}>
                    <Text style={styles.desHead}>
                        Delivery Details
                    </Text>
                    <Text style={styles.desText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Text>
                </View>
                <View style={styles.addToCardView}>
                    <View
                        style={styles.bottomCounterView}
                    >
                        <View
                            style={{ flex: 0.5, }}
                        >
                            <Counter
                                count={count}
                                setCount={setCount}
                            />
                        </View>
                        <Text style={[styles.buyText, { flex: 0.5, }]}>Buy: $5</Text>
                    </View>
                    <TouchableOpacity onPress={addItem} style={styles.addToCardBtn}>
                        <Text style={styles.addText}>Add</Text>
                        <Feather name='shopping-cart' size={30} color={colors.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <AppButton
                        onPress={() => navigation.navigate('CheckOut')}
                        color={colors.primary}
                        title="Next"
                        style={{
                            marginVertical: 30,
                            marginHorizontal: 20,
                            paddingVertical: 15,
                            paddingHorizontal: 30,
                            // width: '80%',
                        }}
                    />
                </View>
            </ScrollView>
        </Screen> :
            <Screen style={{ backgroundColor: colors.light, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} />
            </Screen>
    );
}

const styles = StyleSheet.create({
    bgImageView: {
        height: 300,
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        // borderWidth: 1, borderColor: 'red',
    },
    bgImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative',
        resizeMode: 'cover'
    },
    overlayView: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.7)',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: '100%',
        width: '100%',
        justifyContent: 'space-between'
    },
    ratingView: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 10,

    },
    rating: {
        color: 'white',
        fontWeight: '700',
        paddingHorizontal: 5,
    },
    head: {
        flex: 0.4,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    headText: {
        // flex: 0.9,
        fontSize: 22,
        letterSpacing: 1,
        color: '#289EC2',
        marginBottom: 5,
    },
    detailView: {
        // borderWidth: 1,
        // borderColor: 'red',
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    roundImageView: {
        height: 90,
        width: 90,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginRight: 10,
    },
    roundImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white'
    },
    yellowbgText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    yellowBg: {
        backgroundColor: '#E7C04F',
        padding: 5,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        borderWidth: 1,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    otherDetails: {
        flex: 0.5,
        justifyContent: 'flex-start',
        paddingVertical: 7,
        flexDirection: 'row',
    },
    iconView: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    purchaseView: {
        flex: 0.5,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 15,
        alignItems: 'center',
        flexWrap: 'wrap',
        // borderWidth:1,borderColor:'red',
    },
    counterView: {
        // flex: 1,
        flex: 0.4,
        // width:'30%',
        // marginRight: 5,
    },
    buyText: {
        color: '#289EC2',
        fontWeight: 'bold',
        fontSize: 14,
        flex: 0.5,
        // width:'50%',
    },
    productDes: {
        borderBottomColor: colors.secondary,
        borderBottomWidth: 2, marginHorizontal: 20,
    },
    desHead: {
        color: '#289EC2',
        fontWeight: 'bold', fontSize: 20,
        width: '100%',
        textAlign: 'center',
        paddingVertical: 10,
        marginTop: 20,
    },
    desText: {
        paddingVertical: 10, textAlign: 'center', lineHeight: 25,
    },
    blueText: {
        color: '#289EC2',
        padding: 5,
        fontSize: 18,
    },
    featureItems: {
        fontSize: 16,
        padding: 5,
    },
    addToCardView: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 20,
    },
    bottomCounterView: {
        flex: 0.4,
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 10,
        padding: 5,
    },
    addToCardBtn: {
        flex: 0.3,
        borderWidth: 0.3,
        flexDirection: 'row',
        borderRadius: 30,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
    },
    addText: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.secondary
    }
});
