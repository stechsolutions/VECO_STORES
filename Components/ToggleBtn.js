import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
const ToggleBtn = ({title, onPress, toggle}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {toggle ? (
        <Fontisto name="toggle-on" color={colors.secondary} size={70} />
      ) : (
        <Fontisto name="toggle-off" color="#C5C5C5" size={70} />
      )}
    </TouchableOpacity>
  );
};

export default ToggleBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // paddingVertical: '10%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
  },
});
