import React, { Component,useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { color } from 'react-native-reanimated';

export default function ProductCard({ navigation,color ,onPress, label, image }) {
    const [selectedItem,setSelectedItem] = useState('Milks');
    return (
        <TouchableOpacity onPress={onPress} style={styles.productView}>
            <View style={styles.imageView}>
                <Image style={styles.image} source={image ? {uri:image} : require('../assets/images/veg.jpg')}/>
                <View style={[styles.detailView,color && {backgroundColor:color}]}>
                    <Text style={[styles.whiteText]}>{(label && label.length > 10 ? label.slice(0,10) : label) || 'Available'}</Text>
                    <Text>385</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  productView:{
    //   borderWidth:1,
      borderRadius:20,
      flex:1,
      elevation:10,
  },
  imageView:{
      width:'100%',height:'70%'
    //   flex:0.7,
  },
  image:{
      width:'100%',height:'100%',resizeMode:'cover',borderTopLeftRadius:20,borderTopRightRadius:20,
  },
  detailView:{
      justifyContent:'flex-start',alignItems:'center',height:'40%',width:'100%',
      backgroundColor:'#FFB300',borderBottomLeftRadius:20,borderBottomRightRadius:20,
  },
  whiteText:{
      color:'white',
      fontSize:18,
      fontWeight:'bold'
  }
});
