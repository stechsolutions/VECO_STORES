import React, {Component, useState} from 'react';
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
import {color} from 'react-native-reanimated';

export default function ProductCard2({
  navigation,
  color,
  onPress,
  image,
  price,
}) {
  const [selectedItem, setSelectedItem] = useState('Milks');
  return (
    <TouchableOpacity onPress={onPress} style={styles.productView}>
      <View style={styles.bgImageView}>
        <Image
          source={image ? {uri: image} : require('../assets/images/bbq.jpg')}
          style={styles.bgImage}
        />
        <View style={styles.overlayView}>
          <View style={styles.detailView}>
            <View style={styles.iconView}>
              <AntDesign color="#289EC2" name="hearto" size={15} />
            </View>
            <View style={[styles.iconView, styles.purchaseView]}>
              <Text style={styles.buyText}>${price}</Text>
              <Entypo name="lock" color={'#289EC2'} size={20} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productView: {
    //   borderWidth:1,
    borderRadius: 20,
    flex: 1,
    elevation: 5,
  },
  imageView: {
    width: '100%',
    height: '70%',
    //   flex:0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  detailView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  whiteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bgImageView: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    // borderWidth: 1, borderColor: 'red',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'relative',
    resizeMode: 'cover',
  },
  overlayView: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  iconView: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  purchaseView: {
    flex: 1,
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  counterView: {
    flex: 0.5,
  },
  buyText: {
    color: '#289EC2',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
