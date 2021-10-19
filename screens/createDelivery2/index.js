import React, {Component, useState} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
// import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  Item,
  Input,
  Picker,
} from 'native-base';
import Screen from '../../Components/Screen';
import AppTextInput from '../../Components/AppTextInput';
import colors from '../../config/colors';
import AppPicker from '../../Components/AppPicker';
import AppPhotoInput from '../../Components/AppPhotoInput';
import AppButton from '../../Components/AppButton';
import * as ImagePicker from 'react-native-image-picker';

export default function CreateDelivery2({navigation}) {
  const [vehicleRegistryPhoto, setVehicleRegistryPhoto] = useState();
  const [authorizationNotePhoto, setAuthorizationNotePhoto] = useState();

  const handleVehicleRegistryPhoto = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setVehicleRegistryPhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleAuthorizationNotePhoto = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setAuthorizationNotePhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="Photo of the Single Vehicle Registry"
          onPress={handleVehicleRegistryPhoto}
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="If the Vehicle is not the driver's, 
Photo of the authorization note from the vehicle owner."
          onPress={handleAuthorizationNotePhoto}
        />
        <AppTextInput style={styles.mVertical} placeHolder="Username" />
        <AppTextInput style={styles.mVertical} placeHolder="Password" />

        <AppButton
          style={[styles.btn, styles.mVertical]}
          title="NEXT"
          onPress={() => navigation.navigate('createDelivery2')}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  mVertical: {
    marginVertical: 10,
  },
});
