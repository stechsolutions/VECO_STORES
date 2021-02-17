import React, { Component, useState } from 'react';
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
export default function PendingOrderDetail({ navigation }) {
    const [count, setCount] = useState(3);
    const [modal, setModal] = useState(false);

    return (
        <Screen style={{ backgroundColor: colors.light }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Status: Arrived</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Order Details</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.distDetails}>
                        <View style={styles.imageView}>
                            <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
                        </View>
                        <View style={styles.distDetailView}>
                            <View style={styles.distNameView}>
                                <Text style={styles.distName}>Distributor Name</Text>
                                <Entypo name='eye' size={25} />
                            </View>
                            <Text style={styles.distInfo}>10Km | 15-30 min | Delivery: $1.50</Text>
                        </View>
                    </View>
                    <View style={styles.prodList}>
                        <View style={styles.productItemView}>
                            <Feather name='edit-3' size={25} />
                            <Text style={styles.qty}>1x</Text>
                            <View style={styles.prodInfoView}>
                                <Text style={styles.prodName}>Sweet bread mold </Text>
                                <Text style={styles.prodInfo}>dualpack 135g. color white</Text>
                            </View>
                            <Text style={styles.prodPrice}>$2.00</Text>
                        </View>
                        <View style={styles.productItemView}>
                            <Feather name='edit-3' size={25} />
                            <Text style={styles.qty}>1x</Text>
                            <View style={styles.prodInfoView}>
                                <Text style={styles.prodName}>Sweet bread mold </Text>
                                <Text style={styles.prodInfo}>dualpack 135g. color white</Text>
                            </View>
                            <Text style={styles.prodPrice}>$2.00</Text>
                        </View>
                    </View>
                </View>
               
                <View style={styles.subTotalView}>
                    <Text style={styles.greyText}>Subtotal</Text>
                    <Text style={styles.greyText}>$26.00</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Delivery Details</Text>
                </View>
                <View style={{ margin: 10, }}>
                    <Text style={styles.padding}>Store Name : Panma Store</Text>
                    <Text style={styles.padding}>Address: Panama City</Text>
                    <Text style={styles.padding}>Deadline: 25/Feb/2021</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Payment Details</Text>
                </View>
                <View style={{ margin: 10, }}>
                    <Text style={styles.padding}>Payment Method : VISA</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.orderDetailText}>Delivery Comments</Text>
                </View>
                <View>
                    <TextInput
                    placeholder={'Write Here..'}
                        multiline
                        numberOfLines={7}
                        style={{ backgroundColor: 'white', margin: 20, }}
                    />
                </View>
        
                <View style={[styles.checkOutBtnView,{flexDirection:'row',justifyContent:'flex-end',marginHorizontal:20,}]}>
                    <AppButton
                       onPress={() => navigation.navigate('DashboardStack',{screen:'Vehicle in circulation'})}
                        color={colors.primary}
                        title="GO TO MAP"
                        style={{
                            marginVertical: 5,
                            marginHorizontal: 5,
                            padding: 15,
                            paddingHorizontal:20,
                            // width: '30%',
                        }}
                    />
                    <AppButton
                        onPress={() =>navigation.navigate('completeReception')}
                        color={colors.primary}
                        title="VIEW STATUS"
                        style={{
                            marginVertical: 5,
                            marginHorizontal: 5,
                            padding: 15,
                            paddingHorizontal:20,
                            // width: '30%',
                        }}
                    />
                </View>
        
                <View style={styles.checkOutBtnView}>
                    <AppButton
                        onPress={() =>navigation.navigate('completeReception')}
                        color={colors.primary}
                        title="NEXT"
                        style={{
                            marginVertical: 30,
                            marginHorizontal: 20,
                            padding: 15,
                            paddingHorizontal:40,
                            // width: '30%',
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
                <View style={{alignItems:'center'}}>
                    <AppButton
                        onPress={() => navigation.navigate('PaymentMethods')}
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
        marginRight:10,
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
    distDetailView:{
        flex:1,
        // borderWidth:1,
    }
}); 
