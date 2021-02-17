import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
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
import Modal from '../../Components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { distanceAndSpeed } from '../../config/functions';
import firestore from '@react-native-firebase/firestore';

export default function OrderCompletion({ navigation, route, setCartCount }) {
    const [count, setCount] = useState(3);
    const [modal, setModal] = useState(false);
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState([]);
    const [myStore, setMyStore] = useState(null);
    const [chats, setChats] = useState(null);
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        getCart();
        getChatRooms();
    }, [])
    const getCart = async () => {
        var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));
        var store = JSON.parse(await AsyncStorage.getItem('store'));
        setMyStore(store);
        if (cart) {
            setCart(cart);
            var subTotal = 0;
            for (var i = 0; i < cart.length; i++)
                subTotal += cart[0].total;
            setSubTotal(subTotal);
            var cartCount = 0;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].products.length) {
                    cartCount += cart[i].products.length;
                }
            }
            setCartCount(cartCount);
            setCount(count);
        } else {
            setSubTotal(0);
            setCart([]);
            setCartCount(0);
        }
    }
    const sendOrder = () => {
        AsyncStorage.removeItem('storeCart').then(()=>{
            setModal(true);
            setCartCount(0);
        })

    }
    const getChatRooms = async () => {
        console.log("user chatrooms")
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));
        var myuid = user.userId;
        console.log(myuid, 'myuid');
        var temp = [];
        cart && firestore()
          .collection('mails')
          .where(`users.${myuid}`, '==', true)
          .where(`users.${cart[0].storeDetails.id}`,'==',true)
          .onSnapshot((data) => {
            console.log(data, 'empty');
            if (data.empty) {
              setEmpty(true);
            }
            data.forEach((each) => {
              var data = each.data();
              var userId = '';
              Object.keys(data.users).map((e) => {
                if (e !== myuid) userId = e;
              });
              firestore()
                .collection('distributer')
                .doc(userId)
                .get()
                .then((res) => {
                  var user = { ...res.data(), uid: userId };
                  firestore()
                    .collection('mails')
                    .doc(each.ref.id)
                    .collection('messages')
                    .limit(1)
                    .orderBy('timestamp', 'desc')
                    .onSnapshot((messages) => {
                      temp = [];
                      messages.forEach((e) => {
                        var lastMessage = e.data();
                        lastMessage = lastMessage.message;
                        var obj = {
                          ...each.data(),
                          chatId: each.ref.id,
                          user,
                          lastMessage,
                          myuid,
                        };
                        temp.push(obj);
                        setChats(temp);
                      });
                    });
                });
            });
          });
      };
    return (
        <Screen style={{ backgroundColor: colors.light }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Order Details</Text>
                </View>
                {
                    cart && myStore && cart.map((e, i) => {
                        var store = e.storeDetails;
                        var latLong1 = e.storeDetails.latLongs[0].coordinate;
                        var { latitude, longitude } = myStore && myStore?.location;
                        var [distance, time] = distanceAndSpeed(latLong1.latitude, latLong1.longitude, latitude, longitude)
                        return <View key={i} style={styles.item}>
                            <View style={styles.distDetails}>
                                <View style={styles.imageView}>
                                    <Image style={styles.image} source={{ uri: store.imageUrl } || require('../../assets/images/Spray.jpg')} />
                                </View>
                                <View style={styles.distDetailView}>
                                    <View style={styles.distNameView}>
                                        <Text style={styles.distName}>{store.storeName}</Text>
                                        <Entypo name='eye' size={25} />
                                    </View>
                                    <Text style={styles.distInfo}>{distance} Km | {time} min | Delivery: $ {e.total}</Text>
                                </View>
                            </View>
                            <View style={styles.prodList}>
                                {
                                    e.products.map((p, x) => {
                                        return <View key={x} style={styles.productItemView}>
                                            <Feather name='edit-3' size={25} />
                                            <Text style={styles.qty}>{p.qty}x</Text>
                                            <View style={styles.prodInfoView}>
                                                <Text style={styles.prodName}>{p.productName} </Text>
                                                <Text style={styles.prodInfo}>{p.size}, color {p.color} </Text>
                                            </View>
                                            <Text style={styles.prodPrice}>$ {p.qty * p.productPrice}</Text>
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    })
                }


                <View style={styles.subTotalView}>
                    <Text style={styles.greyText}>Subtotal</Text>
                    <Text style={styles.greyText}>$26.00</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Delivery Details</Text>
                </View>
                {myStore && <View style={{ margin: 10, }}>
                    <Text style={styles.padding}>Store Name : {myStore.name}</Text>
                    <Text style={styles.padding}>Address: {myStore.fullAddress}</Text>
                    <Text style={styles.padding}>Deadline: {new Date().toString().slice(0, 16)}</Text>
                </View>}
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Payment Details</Text>
                </View>
                <View style={{ margin: 10, }}>
                    <Text style={styles.padding}>Payment Method : {route.params.paymentMethod}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Delivery Comments</Text>
                </View>
                <View>
                    <TextInput
                        multiline
                        numberOfLines={7}
                        style={{ backgroundColor: 'white', margin: 20, }}
                    />
                </View>
                <View style={styles.centered}>
                    <AppButton
                        onPress={() => navigation.navigate('SearchProductStack')}
                        color={colors.secondary}
                        title="Add more to order"
                        style={{
                            borderRadius: 10,
                            marginVertical: 30,
                            padding: 15,
                            width: '70%',
                            backgroundColor: 'white',
                            borderWidth: 1, borderColor: colors.secondary,
                        }}
                    />
                </View>
                <View style={styles.checkOutBtnView}>
                    <AppButton
                        onPress={() => sendOrder()}
                        color={colors.primary}
                        title="Send Order"
                        style={{
                            marginVertical: 30,
                            marginHorizontal: 20,
                            padding: 15,
                            width: '30%',
                        }}
                    />
                </View>
            </ScrollView>
            <Modal
                onClose={() => setModal(false)}
                visible={modal}>
                <Text style={styles.modalHead}>Order Sent!</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30, }}>
                    <AntDesign name='checkcircleo' color='#253370' size={100} />
                </View>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Text style={styles.link}>See Details</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <AppButton
                        onPress={() => {
                            setModal(false);
                           !empty && navigation.navigate('MailStack', { screen: 'Mail Open', params:{chatData:chats&&chats[0]} })
                        }}
                        color={colors.primary}
                        title="Do you want to chat with the dealer?"
                        style={{
                            marginVertical: 30,
                            marginHorizontal: 20,
                            padding: 15,
                            width: '80%',
                        }}
                    />
                </View>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    orderDetailText: {
        color: colors.secondary,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
        marginTop: 10,
        padding: 5, paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    item: {
        flex: 1, flexDirection: 'column',
        margin: 10,
    },
    distDetails: {
        flex: 1, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'flex-start',
        margin: 10, backgroundColor: 'white', padding: 10,
    },
    imageView: {
        width: 60,
        height: 60,
        borderRadius: 20,
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%', borderRadius: 20,
    },
    distNameView: {
        flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    distName: {
        fontSize: 20,
        fontWeight: '700'
    },
    distInfo: {
        fontSize: 16, paddingVertical: 5, color: colors.dark, fontWeight: '700'
    },
    productItemView: {
        flexDirection: 'row', alignItems: 'center',
        marginVertical: 5,
    },
    checkOutBtnView: {
        justifyContent: 'center', alignItems: 'flex-end',
    },
    qty: {
        padding: 5,
    },
    prodInfoView: {
        flex: 0.9,
        paddingHorizontal: 10,
        borderBottomWidth: 1, paddingBottom: 5,
    },
    prodPrice: {
        fontWeight: 'bold',
        color: colors.dark
    },
    prodName: {
        fontSize: 14,
        fontWeight: '700'
    },
    prodInfo: {
        fontSize: 13,
        fontWeight: '700'
    },
    subTotalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 30,
    },
    greyText: {
        fontSize: 18,
        color: '#7C7979',
        fontWeight: 'bold'
    },
    centered: {
        justifyContent: 'center', alignItems: 'center'
    },
    padding: {
        padding: 5,
    },
    modalHead: {
        textAlign: 'center', fontSize: 20, color: '#666666'
    },
    link: {
        textDecorationLine: 'underline',
        fontSize: 18,
    },
    distDetailView: {
        flex: 1,
        // borderWidth:1,
    }
}); 
