import React, { Component, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Alert
} from 'react-native';
import AppButton from '../../Components/AppButton';
import AppChat from '../../Components/AppChat';
// import {styles} from './style';
import AppTextInput from '../../Components/AppTextInput';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTimePicker from '../../Components/AppTimePicker';
import firestore from '@react-native-firebase/firestore'
import AppPicker from '../../Components/AppPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialMessages = [
  {
    id: 1,
    title: 'Product Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 8,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 9,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 10,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 11,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 12,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 13,
    title: 'Product Name',
    image: require('../../assets/dress.jpg'),
  },
];

export default function AssignProductDate() {

  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [messages, setMessages] = useState(initialMessages);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [dispatchers, setDispatchers] = useState([]);
  const [dispatcher, setDispatcher] = useState(null);
  const [assignedDispatchers, setAssignedDispatchers] = useState(null);

  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue,'selected vale');
    setStartDate(selectedValue)
  
    {
      setShowStartDatePicker(false);
      selectedValue && setStartDate(selectedValue);
    }
  };
  const getDispatchers = () => {
    firestore().collection('dispatchers').where('status', '==', 'not assigned').onSnapshot(res => {
        console.log(res, 'res');
        var dispatchers = [];
        res.forEach(e => {
          dispatchers.push({ value: e.ref.id, label:e.data().name,...e.data() });
        })
        setDispatchers(dispatchers);
      })
  }
  const assignDispatcher =async ()=>{
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    const obj = {deliveryDate:startDate,dispatcherId:dispatcher.value,name:dispatcher.label};
    console.log(obj,'obj')
    console.log(store,'store')
    console.log(dispatcher,'dispatcher');
    firestore().collection('store').doc(store.storeId).collection('dispatchers').doc(dispatcher.value)
    .set(obj)
    .then(async res=>{
      await firestore().collection('dispatchers').doc(dispatcher.value).update({status:'assigned'});
      Alert.alert(
        "Assigned",
        "Delivery Date assigned to dispatcher",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      setDispatcher('');
    })
    .catch((e)=>{
      Alert.alert(
        "Something went wrong",
        "",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    })
  }
  const getAssignedDispatchers = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store')); 
    firestore().collection('store').doc(store.storeId).collection('dispatchers').onSnapshot(
      res => {
        console.log(res, 'res');
        var dispatchers = [];
        res.forEach(e => {
          dispatchers.push({ value: e.ref.id, label:e.data().name,...e.data() });
        })
        setAssignedDispatchers(dispatchers);
      })

  };

  useEffect(() => {
    if(!assignedDispatchers || !dispatchers){  
      getAssignedDispatchers();
      getDispatchers();
    }
  },[])
  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Assign Dispatcher</Text>
          {/* <AppTextInput placeHolder="Search" /> */}
          <AppPicker
            items={dispatchers}
            style={styles.mVertical}
            title="Search"
            selectedItem={dispatcher}
            onSelectItem={(item) => setDispatcher(item)}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Set Delivery Date</Text>
          <View style={styles.timeContainer}>
            <AppTimePicker
              date={startDate}
              onPress={() => {
                setShowStartDatePicker(true);
              }}
            />
          </View>
        </View>
        {showStartDatePicker && (
          <DateTimePicker
            onTouchCancel={() => setShowStartDatePicker(false)}
            mode="date"
            value={startDate}
            onChange={onStartDateChange}
          />
        )}
        <AppButton onPress={assignDispatcher} style={styles.assignButton} title="ASSIGN" />
        <View>
          <Text style={styles.title}>Assigned Dispatchers</Text>
          {(assignedDispatchers && assignedDispatchers.length) ? assignedDispatchers.map((item) => (
            <AppChat
              key={item.dispatcherId}
              title={item.name}
              image={item.image ? item.image : require('../../assets/user.jpg')}
              btnText="Details"
              btnPress={() => console.log('Pending deliveries')}
              onPress={() => console.log('Pending deliveries', item)}
            />
          ))
          :<View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:100,}}>
            <Text>No Dispatcher Assigned Yet!</Text>
            </View>
        }
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignButton: {
    padding: 10,
    width: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
  },
});
