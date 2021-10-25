import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CartIcon = ({items, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container]}
      onPress={onPress}>
      <AppText style={styles.items}>{items}</AppText>
      <FontAwesome name="shopping-cart" size={30} color={colors.secondary} />
    </TouchableOpacity>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  items: {
    fontSize: 14,
    backgroundColor: '#279EC2',
    // padding:2,
    borderRadius: 50,
    bottom: -10,
    right: -20,
    zIndex: 1,
    textAlign: 'center',
    width: 20,
    color: 'white',
  },
});
