import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { color } from 'react-native-reanimated';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AppChat from '../../Components/AppChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

function ProductAddUpdate({ navigation }) {
    const [products, setProducts] = useState([]);


    useEffect(() => { getProducts(); }, [])

    const getProducts = async () => {
        var store = JSON.parse(await AsyncStorage.getItem('store'));
        firestore().collection('vendorStores').doc(store.storeId).collection('products')
            .onSnapshot(res => {
                var productArr = []
                res.forEach((each) => {
                    productArr.push({ ...each.data(), productId: each.ref.id })
                })
                setProducts(productArr);
            })
    }
    const deleteProduct = async (productId) => {
        var store = JSON.parse(await AsyncStorage.getItem('store'));
        firestore().collection('vendorStores').doc(store.storeId).collection('products')
            .doc(productId).delete()
            .then(res => {
                Alert.alert(
                    "Product Deleted",
                    "Product has been removed successfully",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            })
    }
    return (
        <Screen style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                    <AppCard
                        style={{ width: '70%' }}
                        title="Add Product"
                        onPress={() => navigation.navigate('uploadProduct')}
                    />
                </View>
                <View style={styles.productsHead}>
                    <View style={styles.head1}>
                        <Text style={styles.boldText}>Products</Text>
                        <Text style={styles.greyText}>Add, update and delete products</Text>
                    </View>
                    <View style={styles.head2}>
                        <Text style={styles.boldText}>Best Sellers</Text>
                        <FontAwesome name='bars' color={'black'} size={30} />
                    </View>
                </View>
                <View style={styles.products}>
                    {
                        products && products.map((product, i) => {
                            return <AppChat
                                key={i}
                                style={{ marginHorizontal: 0, marginBottom: 5, }}
                                title={product.productName}
                                image={{ uri: product.image }}
                                btnText="View"
                                tools={true}
                                btnPress={() => console.log('See Products >>> Button Text Press')}
                                onPress={() => navigation.navigate('editProduct',{product,deleteProduct})}
                                onEdit={() => navigation.navigate('editProduct',{product,deleteProduct})}
                                onDelete={() => {
                                    Alert.alert(
                                        "Are your Sure?",
                                        "you want to delete this product",
                                        [
                                            { text: "yes", onPress: () => deleteProduct(product.productId) },
                                            { text: 'cancel' }
                                        ],
                                        { cancelable: false }
                                    );
                                }}
                            />
                        })
                    }
                    {
                        !products.length && <Text style={styles.noProducts}>No Products</Text>
                    }
                </View>
            </ScrollView>
        </Screen>
    );
}

export default ProductAddUpdate;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
    },
    boldText: {
        fontWeight: 'bold', fontSize: 16,
    },
    greyText: {
        color: colors.dark, fontSize: 12,
    },
    productsHead: {
        flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', margin: 10,
        alignItems: 'center', marginHorizontal: 20,
    },
    head1: {
        flex: 0.65,
    },
    head2: {
        flex: 0.35, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between'
    },
    noProducts:{
        fontSize:16,
        fontWeight:'700',
        textAlign:'center',
        marginTop:150,
    }
});
