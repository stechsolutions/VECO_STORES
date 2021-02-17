import React, {useState , useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';

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
  const [products, setProducts] = useState([]);


  useEffect(()=>{displayProducts(); },[])

  const displayProducts = async ()=>{
    
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log("This is the store : " , store);
    firestore().collection('store').doc(store.storeId).collection('product').onSnapshot(res=>{
      var productArr = []
      res.forEach((each) => {
        console.log("EACH DATA : " , each.data());
        productArr.push({...each.data() , productId : each.ref.id})
      })

      setProducts(productArr)
    })
    // .catch(e=>{
    //   Alert.alert(
    //     "Something Went Wrong",
    //     "",
    //     [
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ],
    //     { cancelable: false }
    //   );
    // })
  }

  return (
    <Screen style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(message) => message.productId.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.productName}
            subtitle={item.shortDescription}
            image= {item.image ? {uri:item.image} : require('../../assets/images/Spray.jpg')}
            btnText="EDIT"
            btnPress={() => navigation.navigate('Update delete product' , {productId : item.productId})}
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
    backgroundColor: colors.grey,
  },
});
