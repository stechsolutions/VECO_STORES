import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState();
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    displayPromos();
  }, []);

  const displayPromos = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log('This is the store : ', store);
    firestore()
      .collection('vendorStores')
      .doc(store.storeId)
      .collection('promotions')
      .onSnapshot((res) => {
        var promoArr = [];
        res.forEach((each) => {
          promoArr.push({...each.data(), promoId: each.ref.id});
        });

        setPromos(promoArr);
      });
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
  };

  return (
    <Screen style={styles.container}>
      {promos.length ? (
        <FlatList
          data={promos}
          keyExtractor={(message) => message.promoId.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.name}
              subtitle={item.description}
              image={
                item.imageUri
                  ? {uri: item.imageUri}
                  : require('../../assets/images/Spray.jpg')
              }
              btnText="Edit"
              btnPress={() =>
                navigation.navigate('Edit promotion', {promoId: item.promoId})
              }
              onPress={() => console.log('Message selected', item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Promotions right now!</Text>
        </View>
      )}
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
