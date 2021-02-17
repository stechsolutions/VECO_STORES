import React, { Component, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default function ProductListItem({ navigation, color,onPress, image, title,price,name,rating }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.productView}>
            <View style={styles.imageView}>
                <Image style={styles.image} source={image  && {uri:image}} />
            </View>
            <View style={[styles.detailView, color && { backgroundColor: color }]}>
                <Text style={styles.boldText}>{title}</Text>
                <Text style={styles.subtitle}>Price:$ {price} | {name}</Text>
                <Text style={styles.subtitle}>Payment Type: All</Text>
            </View>
            <View style={styles.ratingView}>
                <FontAwesome size={20} name='star' color={'#007598'} />
                <Text style={styles.rating}>{rating ? rating : 0}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    productView: {
        // borderWidth: 1,
        borderRadius: 20,
        flex: 1,flexDirection:'row',
        alignItems:'center',
        margin:10,
    },
    imageView: {
        width: 60, height: 60, marginRight:10,
        //   flex:0.7,
    },
    image: {
        width: '100%', height: '100%', resizeMode: 'cover',borderRadius:10,
    },
    detailView: {
        justifyContent: 'center',marginHorizontal:5,flex:0.9
    },
    whiteText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    boldText:{
        fontSize:18,fontWeight:'bold',
    },
    subtitle:{
        color:colors.dark,
    },
    ratingView:{
        flex:0.2,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    rating:{
        color:'#007598',
        fontWeight:'700'
    }
});
