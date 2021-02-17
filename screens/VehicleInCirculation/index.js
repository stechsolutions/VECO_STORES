import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { styles } from './style';
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
import MapView, { Marker } from 'react-native-maps';
import Screen from '../../Components/Screen';
export default function CreateDashboard() {
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
          <View style={styles.eachVehicle}>
            <AppChat
              style={{margin:0,marginHorizontal:0,backgroundColor:'#DFDFDF',borderRadius:10}}
              tools={true}
              title={"hello world"}
              subtitle={"whats up buddy?"}
              image={require('../../assets/images/Spray.jpg')}
              count={2}
              onPress={() => navigation.navigate('Mail Open', { chatData: item })}
            />
          </View>
          <View style={styles.eachVehicle}>
            <AppChat
              style={{margin:0,marginHorizontal:0,backgroundColor:'#DFDFDF',borderRadius:10}}
              tools={true}
              title={"hello world"}
              subtitle={"whats up buddy?"}
              image={require('../../assets/images/Spray.jpg')}
              count={2}
              onPress={() => navigation.navigate('Mail Open', { chatData: item })}
            />
          </View>
          <View style={styles.eachVehicle}>
            <AppChat
              style={{margin:0,marginHorizontal:0,backgroundColor:'#DFDFDF',borderRadius:10}}
              tools={true}
              title={"hello world"}
              subtitle={"whats up buddy?"}
              image={require('../../assets/images/Spray.jpg')}
              count={2}
              onPress={() => navigation.navigate('Mail Open', { chatData: item })}
            />
          </View>
        </View>

      </View>
    </Screen>
  );
}
