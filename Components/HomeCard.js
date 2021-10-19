import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import colors from '../config/colors';
import {color} from 'react-native-reanimated';

const HomeCard = ({
  name,
  title,
  subtitle,
  ii = false,
  mci = false,
  entypo = false,
  fa = false,
  mi = false,
  foundation = false,
  fa5 = false,
  order,
  onPress,
}) => {
  const size = 24;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {ii ? (
        <IonIcons name={name} color={colors.primary} size={size} />
      ) : mci ? (
        <MaterialCommunityIcons
          name={name}
          color={colors.primary}
          size={size}
        />
      ) : entypo ? (
        <Entypo name={name} color={colors.primary} size={size} />
      ) : fa ? (
        <FontAwesome name={name} color={colors.primary} size={size} />
      ) : mi ? (
        <MaterialIcons name={name} color={colors.primary} size={size} />
      ) : foundation ? (
        <Foundation name={name} color={colors.primary} size={size} />
      ) : order ? (
        <Image
          source={require('../assets/icons/order.png')}
          style={{width: 25, height: 25}}
        />
      ) : fa5 ? (
        <FontAwesome5 name={name} color={colors.primary} size={size} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    height: 100,
    flex: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: colors.white,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
});
