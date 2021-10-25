import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

const AppPickerItem = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.txt}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default AppPickerItem;

const styles = StyleSheet.create({
  txt: {
    padding: 20,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
  },
});
