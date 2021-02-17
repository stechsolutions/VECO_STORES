import React, {useState , useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'


const initialMessages = [
  {
    id: 1,
    title: 'Hash',
    subTitle: 'Pending Approval',

    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 8,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 9,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 10,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 11,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 12,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 13,
    title: 'Product Name',
    subTitle: 'Pending Approval',
    image: require('../../assets/images/Spray.jpg'),
  },
];

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    try {
      var store = JSON.parse(await AsyncStorage.getItem('store'));
      console.log(store,'store')
      firestore().collection('purchaseOrder')
      .where('storeId', '==', store.storeId)
      .where('status','==','created')
      .onSnapshot(res => {
          console.log(res, 'res');
          var orders = [];
          res.forEach((each) => {
            console.log(each.data(),'each')
            orders.push({ ...each.data(), orderId: each.ref.id });
            setOrders(orders); 
          })
          console.log(orders, 'orders')
        })
    }
    catch (e) {
      console.log(e, 'err');
    }
  }

  return (
    <Screen style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(message) => message.orderId.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.name}
            subtitle={item.status}
            image={{uri:item.image}}
            btnText="Edit"
            variant="failure"
            btnPress={() => console.log('See Products >>> Button Text Press')}
            onPress={() => console.log('Message selected', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          console.log('Refreshing');
        }}
      />
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
