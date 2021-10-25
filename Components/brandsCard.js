import React, {Component, useState} from 'react';
import AppText from './AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import colors from '../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sub} from 'react-native-reanimated';

export default function BrandsCard({
  navigation,
  color,
  title,
  subtitle,
  subtitleColor,
  onDotsPress,
  onCardPress,
}) {
  const [selectedItem, setSelectedItem] = useState('Milks');
  return (
    <TouchableOpacity
      onPress={onCardPress}
      style={[styles.productView, color && {backgroundColor: color}]}>
      <View style={styles.imageView}>
        <Image
          source={require('../assets/images/Spray.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.textView}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText
          style={[styles.subtitle, subtitleColor && {color: subtitleColor}]}>
          {subtitle}
        </AppText>
      </View>
      <TouchableOpacity
        delayPressIn="300ms"
        onPress={onDotsPress}
        style={styles.whiteBackgroundView}>
        <Entypo name="dots-three-horizontal" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productView: {
    //   borderWidth:1,
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#EEF8FB',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
  },
  imageView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 10,
    //   flex:0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  textView: {
    flex: 0.9,
  },
  whiteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  whiteBackgroundView: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});
