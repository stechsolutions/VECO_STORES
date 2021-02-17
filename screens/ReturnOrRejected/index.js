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
    title: 'Product Name',
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
];

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [orders , setOrders] = useState([]);
  const [returned , setReturned] = useState([]);
  useEffect(() => {
    getOrders();
  }, [])
  
  const getOrders = async () => {
    try {
      var store = JSON.parse(await AsyncStorage.getItem('store'));
      console.log(store,'store')
      firestore().collection('purchaseOrder')
      .where('storeId', '==', store.storeId)
      .where('status','==','rejected')
      .onSnapshot(res => {
          console.log(res, 'res');
          var orders = [];
          res.forEach((each) => {
            console.log(each.data(),'each')
            orders.push({ ...each.data(), orderId: each.ref.id });
            setOrders(orders); 
          })
        })

      firestore().collection('purchaseOrder')
      .where('storeId', '==', store.storeId)
      .where('status','==','returned')
      .onSnapshot(res => {
          console.log(res, 'res');
          var orders = [];
          res.forEach((each) => {
            console.log(each.data(),'each')
            orders.push({ ...each.data(), orderId: each.ref.id });
            setReturned(orders); 
          })

        })
    }
    catch (e) {
      console.log(e, 'err');
    }
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Rejected</Text>
         {orders ? <FlatList
          data={orders}
          keyExtractor={(message) => message.orderId.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.name}
              subtitle={item.status}
              image={item.image}
              btnText="See details"
              variant="failure"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
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
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Returned</Text>
        {returned.length ?  <FlatList
          data={returned}
          keyExtractor={(message) => message.orderId.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.name}
              subtitle={item.status}
              image={item.image}
              btnText="See details"
              variant="pending"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
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
      </View>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 10,
  },
  subContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
  },
  noOrderText:{
    textAlign:'center'
  },
  noOrderView:{
    flex:1,justifyContent:'center',alignItems:'center',height:'100%',
    
  }
});
