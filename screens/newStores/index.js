import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
// import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

export default function NewStores({navigation}) {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <AppCard
          title="Diable, block or delete stores"
          onPress={() => navigation.navigate('Block or delete stores')}
        />
        <AppCard
          title="Review available Listing and documentation"
          onPress={() => navigation.navigate('Listing and documentation')}
        />
        <AppCard
          title="Assign Dispatcher"
          onPress={() => navigation.navigate('Assign dispatcher')}
        />
        <AppCard
          title="See location on Map"
          onPress={() => navigation.navigate('Store location')}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
