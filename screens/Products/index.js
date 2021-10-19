import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [moreMessage, setMoreMessage] = useState([]);
  const [lessMessage, setLessMessage] = useState([]);
  const [tab, setTab] = useState('more');

  useEffect(() => {
    getMyStoreProducts();
  }, []);

  const getMyStoreProducts = async () => {
    setRefreshing(true);
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const myProducts = await firestore()
      .collection('vendorStores')
      .doc(user.userId)
      .collection('products')
      .get();

    const productsArray = [];
    if (myProducts.size > 0) {
      for (const product of myProducts.docs) {
        productsArray.push({id: product.id, ...product.data()});
      }
      setMoreMessage(productsArray);
      setLessMessage(productsArray);
    }
    setRefreshing(false);
  };

  return (
    <Screen style={styles.container}>
      {console.log('tab>>>', tab)}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('more')}>
          <Text
            style={[styles.text, tab === 'more' && {color: colors.primary}]}>
            Most Sold
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('less')}>
          <Text
            style={[styles.text, tab === 'less' && {color: colors.primary}]}>
            Less Sold
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'more' && (
        <FlatList
          data={moreMessage}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.productName}
              image={
                item.image !== undefined
                  ? {uri: item.image}
                  : require('../../assets/images/placeholder.png')
              }
              btnText="View"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      )}
      {tab === 'less' && (
        <FlatList
          data={lessMessage}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.productName}
              image={
                item.image !== undefined
                  ? {uri: item.image}
                  : require('../../assets/images/placeholder.png')
              }
              btnText="View"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      )}
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 16,
    color: colors.medium,
  },
});
