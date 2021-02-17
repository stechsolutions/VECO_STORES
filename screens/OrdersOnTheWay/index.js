import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from 'native-base';
import MapView from 'react-native-maps';
import Screen from '../../Components/Screen';
export default function CreateDashboard() {
  return (
    <Screen>
      <View style={styles.mapView}>
        <MapView
          provider={MapView.PROVIDER__GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
      <View style={styles.mapInnerView}>
        <View style={styles.boxView}>
          <Text style={{color: 'white', width: '70%'}}>
            4.1 mi via Washington Bivd Arrival time: 9:56 AM
          </Text>
          <FontAwesome size={40} name="phone-square" color={'white'} />
        </View>
      </View>
    </Screen>
  );
}
