import React, {Component, useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Counter from '../../Components/Counter';
import AppButton from '../../Components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {distanceAndSpeed} from '../../config/functions';

export default function CheckOut({navigation, setCartCount}) {
  const [count, setCount] = useState(3);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const [myStore, setMyStore] = useState(null);
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    if (cart) {
      setCart(cart);
      setMyStore(store);
      var subTotal = 0;
      for (var i = 0; i < cart.length; i++) subTotal += cart[0].total;
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
  };
  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1}}>
        {cart &&
          myStore &&
          cart.map((e, i) => {
            var store = e.storeDetails;
            var latLong1 = e.storeDetails.latLongs[0].coordinate;
            var {latitude, longitude} =
              myStore && myStore?.location[0]['coordinate'];
            var [distance, time] = distanceAndSpeed(
              latLong1.latitude,
              latLong1.longitude,
              latitude,
              longitude,
            );
            return (
              <View key={i} style={styles.item}>
                <View style={styles.distDetails}>
                  <View style={styles.imageView}>
                    <Image
                      style={styles.image}
                      source={
                        {uri: store.imageUrl} ||
                        require('../../assets/images/Spray.jpg')
                      }
                    />
                  </View>
                  <View style={styles.distDetailView}>
                    <View style={styles.distNameView}>
                      <AppText style={styles.distName}>
                        {store.storeName}
                      </AppText>
                      <Entypo name="eye" size={25} />
                    </View>
                    <Text style={styles.distInfo}>
                      {distance} Km | {time} min | Delivery: $ {e.total}
                    </Text>
                  </View>
                </View>
                <View style={styles.prodList}>
                  {e.products.map((p, x) => {
                    return (
                      <View key={x} style={styles.productItemView}>
                        <Feather name="edit-3" size={25} />
                        <Text style={styles.qty}>{p.qty}x</Text>
                        <View style={styles.prodInfoView}>
                          <Text style={styles.prodName}>{p.productName} </Text>
                          <Text style={styles.prodInfo}>
                            {p.size}, color {p.color}{' '}
                          </Text>
                        </View>
                        <Text style={styles.prodPrice}>
                          $ {p.qty * p.productPrice}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}

        <View style={styles.subTotalView}>
          <AppText style={styles.greyText}>Subtotal</AppText>
          <Text style={styles.greyText}>$ {subTotal}</Text>
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
              borderWidth: 1,
              borderColor: colors.secondary,
            }}
          />
        </View>
        <View style={styles.centered}>
          <AppButton
            onPress={async () => {
              await AsyncStorage.removeItem('storeCart');
              getCart();
            }}
            color={colors.secondary}
            title="Clear Cart"
            style={{
              borderRadius: 10,
              // marginVertical: 30,
              padding: 15,
              width: '70%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: colors.secondary,
            }}
          />
        </View>
        <View style={styles.checkOutBtnView}>
          <AppButton
            onPress={() => navigation.navigate('PaymentMethods')}
            color={colors.primary}
            title="Next"
            style={{
              marginVertical: 30,
              marginHorizontal: 20,
              padding: 15,
              width: '30%',
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  distDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  imageView: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  distNameView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distName: {
    fontSize: 20,
    fontWeight: '700',
  },
  distInfo: {
    fontSize: 16,
    paddingVertical: 5,
    color: colors.dark,
    fontWeight: '700',
  },
  productItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkOutBtnView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  qty: {
    padding: 5,
  },
  prodInfoView: {
    flex: 0.9,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  prodPrice: {
    fontWeight: 'bold',
    color: colors.dark,
  },
  prodName: {
    fontSize: 14,
    fontWeight: '700',
  },
  prodInfo: {
    fontSize: 13,
    fontWeight: '700',
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
    fontWeight: 'bold',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  distDetailView: {
    flex: 1,
    // borderWidth:1,
  },
});
