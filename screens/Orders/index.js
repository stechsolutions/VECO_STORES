import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AppOrderHeading from '../../Components/AppOrderHeading';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import AppText from '../../Components/AppText';

const index = ({navigation}) => {
  const [pendingApproval, setPendingApproval] = useState([]);
  const [approved, setApproved] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      var store = JSON.parse(await AsyncStorage.getItem('store'));
      console.log(store, 'store');
      firestore()
        .collection('purchaseOrder')
        .where('storeId', '==', store.storeId)
        .where('status', '==', 'created')
        .onSnapshot((res) => {
          console.log(res, 'res');
          var pendingApproval = [];
          res.forEach((each) => {
            console.log(each.data(), 'each');
            pendingApproval.push({...each.data(), orderId: each.ref.id});
            setPendingApproval(pendingApproval);
          });
        });

      firestore()
        .collection('purchaseOrder')
        .where('storeId', '==', store.storeId)
        .where('status', '==', 'approved')
        .onSnapshot((res) => {
          console.log(res, 'res');
          var approved = [];
          res.forEach((each) => {
            console.log(each.data(), 'each');
            approved.push({...each.data(), orderId: each.ref.id});
            setApproved(approved);
          });
        });
      firestore()
        .collection('purchaseOrder')
        .where('storeId', '==', store.storeId)
        .where('status', '==', 'delivered')
        .onSnapshot((res) => {
          console.log(res, 'res');
          var approved = [];
          res.forEach((each) => {
            console.log(each.data(), 'each');
            approved.push({...each.data(), orderId: each.ref.id});
            setDelivered(approved);
          });
        });
    } catch (e) {
      console.log(e, 'err');
    }
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppOrderHeading
          title="Pending Approval"
          count={pendingApproval.length}
          onPress={() => navigation.navigate('Pending approval orders')}
        />
        <AppOrderHeading
          title="Approved"
          count={approved.length}
          onPress={() => navigation.navigate('Approved orders')}
        />
        <AppOrderHeading
          title="Paid Orders"
          count={24}
          onPress={() => navigation.navigate('Paid orders')}
        />
        <AppOrderHeading
          title="Pending Deliveries"
          count={24}
          onPress={() => navigation.navigate('Pending deliveries')}
        />
        <AppOrderHeading
          title="Delivered Orders"
          count={delivered.length}
          onPress={() => navigation.navigate('Delivered orders')}
        />
        <AppOrderHeading
          title="Returned or Rejected"
          count={24}
          onPress={() => navigation.navigate('Returned or rejected')}
        />
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
