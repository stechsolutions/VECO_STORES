import React, {useState , useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

const initialMessages = [
  {
    id: 1,
    title: 'Product Name',

    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 8,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 9,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 10,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 11,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 12,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 13,
    title: 'Product Name',
    image: require('../../assets/images/Spray.jpg'),
  },
];

const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [orders , setOrders] = useState([]);
  const initialMessages = [
    {
      id: 1,
      title: 'Product Name',
      subTitle: 'Approved',
  
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 2,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 3,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 4,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 5,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 6,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 7,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 8,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 9,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 10,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 11,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 12,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
    {
      id: 13,
      title: 'Product Name',
      subTitle: 'Approved',
      image: require('../../assets/images/Spray.jpg'),
    },
  ];

  useEffect(() => {
    getOrders();
  }, [])
  
  const getOrders = async () => {
    try {
      var store = JSON.parse(await AsyncStorage.getItem('store'));
      console.log(store,'store')
      firestore().collection('purchaseOrder')
      .where('storeId', '==', store.storeId)
      .where('status','==','delivered')
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
      { orders.length ? <FlatList
        data={orders}
        keyExtractor={(message) => message.orderId.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.title}
            subtitle={'Delivered'}
            variant="success"
            image={item.image}
            btnText="See details"
            btnPress={() => console.log('')}
            onPress={() => console.log('Delivered Orders', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          console.log('Refreshing');
        }}
      /> : 
      <View style={styles.noOrderView}>
        <Text style={styles.noOrderText}>No Orders Right Now!</Text>
      </View>
      } 
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  noOrderText:{
    textAlign:'center'
  },
  noOrderView:{
    flex:1,justifyContent:'center',alignItems:'center',height:'100%',
    
  }
});