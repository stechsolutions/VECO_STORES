import React, {Component, useEffect, useState} from 'react';
import AppText from '../../Components/AppText';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import {styles} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppChat from '../../Components/AppChat';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import Screen from '../../Components/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function CreateDashboard({navigation, route}) {
  const [chats, setChats] = useState();
  const [empty, setEmpty] = useState();

  useEffect(() => {
    getChatRooms();
  }, []);
  const getChatRooms = async () => {
    console.log('user chatrooms');
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    var myuid = user.userId;
    console.log(myuid, 'myuid');
    var temp = [];
    firestore()
      .collection('mails')
      .where(`users.${myuid}`, '==', true)
      .onSnapshot((data) => {
        console.log(data.empty, 'empty');
        if (data.empty) {
          setEmpty(true);
          return;
        }
        data.forEach((each) => {
          var data = each.data();
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          var userId = '';
          Object.keys(data.users).map((e) => {
            if (e !== myuid) {
              userId = e;
              console.log('myuid', e);
            }
          });
          firestore()
            .collection('distributer')
            .doc(userId)
            .get()
            .then((res) => {
              var user = {...res.data(), uid: userId};
              firestore()
                .collection('mails')
                .doc(each.ref.id)
                .collection('messages')
                .limit(1)
                .orderBy('timestamp', 'desc')
                .onSnapshot(async (messages) => {
                  temp = [];
                  messages.forEach(async (e) => {
                    var lastMessage = e.data();
                    lastMessage = lastMessage.message;
                    var obj = {
                      ...each.data(),
                      chatId: each.ref.id,
                      user,
                      lastMessage,
                      myuid,
                    };
                    temp.push(obj);
                    console.log('====================================');
                    console.log('Chat:', ...obj);
                    console.log('====================================');
                    setChats(temp);
                  });
                });
            });
        });
      });
  };

  return (
    <Screen>
      <View style={styles.mapView}>
        <MapView
          provider={MapView.PROVIDER__GOOGLE}
          style={styles.map}
          onPress={(e) => console.log('>>>', e.target)}
          showsUserLocation
          onMarkerDrag={(res) => console.log(res)}
          showsUserLocation={true}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            onDrag={(e) => console.log(e)}
            draggable={true}
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            onDragEnd={(e) => console.log(e)}
          />
        </MapView>
      </View>
      <View style={styles.mapInnerView}>
        <View style={styles.boxView}>
          <FlatList
            data={chats}
            // data={initialMessages}
            keyExtractor={(message) => message.chatId.toString()}
            renderItem={({item}) => (
              <AppChat
                title={item.user.businessName}
                // title={item.title}
                subtitle={item.lastMessage}
                image={{uri: item.user.photoLogoUrl}}
                style={{marginHorizontal: 0}}
                // count={item.count}
                onPress={() =>
                  navigation.navigate('Mail Open', {chatData: item})
                }
              />
            )}
            // refreshing={refreshing}
            // onRefresh={() => {
            //   console.log('Refreshing');
            // }}
            style={styles.eachVehicle}
          />
          {/* <View style={styles.eachVehicle}>
            <AppChat
              style={{
                margin: 0,
                marginHorizontal: 0,
                backgroundColor: '#DFDFDF',
                borderRadius: 10,
              }}
              tools={true}
              title={'hello world'}
              subtitle={'whats up buddy?'}
              image={require('../../assets/images/Spray.jpg')}
              count={2}
              onPress={() => navigation.navigate('Mail Open', {chatData: item})}
            />
          </View>
          <View style={styles.eachVehicle}>
            <AppChat
              style={{
                margin: 0,
                marginHorizontal: 0,
                backgroundColor: '#DFDFDF',
                borderRadius: 10,
              }}
              tools={true}
              title={'hello world'}
              subtitle={'whats up buddy?'}
              image={require('../../assets/images/Spray.jpg')}
              count={2}
              onPress={() => navigation.navigate('Mail Open', {chatData: item})}
            />
          </View>
          <View style={styles.eachVehicle}>
            <AppChat
              style={{
                margin: 0,
                marginHorizontal: 0,
                backgroundColor: '#DFDFDF',
                borderRadius: 10,
              }}
              tools={true}
              title={'hello world'}
              subtitle={'whats up buddy?'}
              image={require('../../assets/images/Spray.jpg')}
              count={2}
              onPress={() => navigation.navigate('Mail Open', {chatData: item})}
            />
          </View> */}
        </View>
      </View>
    </Screen>
  );
}
