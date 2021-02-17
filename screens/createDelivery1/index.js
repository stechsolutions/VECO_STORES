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
import ImagePicker from 'react-native-image-picker';

export default function CreateDelivery1({navigation}) {
  const [driverPhoto, setDriverPhoto] = useState();
  const [idPhoto, setIdPhoto] = useState();
  const [licensePhoto, setLicensePhoto] = useState();

  const handleDriverPhotoUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setDriverPhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleIdPhotoUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setIdPhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleLicensePhotoUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setLicensePhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <AppTextInput style={styles.mVertical} placeHolder="Name" />
        <AppTextInput style={styles.mVertical} placeHolder="Last name" />
        <AppTextInput style={styles.mVertical} placeHolder="Phone / Whatsapp" />
        <AppTextInput style={styles.mVertical} placeHolder="Email" />
        <AppTextInput
          style={styles.mVertical}
          placeHolder="Identification card"
        />
        <AppTextInput style={styles.mVertical} placeHolder="License number" />
        <AppPicker style={styles.mVertical} title="License type" />
        <AppPicker style={styles.mVertical} title="Vehicle type" />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="Driver photo"
          onPress={handleDriverPhotoUpload}
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="ID photo"
          onPress={handleIdPhotoUpload}
        />
        <AppPhotoInput
          style={styles.mVertical}
          placeHolder="License photo"
          onPress={handleLicensePhotoUpload}
        />

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
    alignSelf: 'flex-end',
    padding: 15,
    width: 100,
    marginBottom: 20,
  },
  mVertical: {
    marginVertical: 10,
  },
});
