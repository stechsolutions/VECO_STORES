import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

const AppTextButton = ({onPress, title, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default AppTextButton;

const styles = StyleSheet.create({
  title: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
});
