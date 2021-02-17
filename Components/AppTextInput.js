import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../config/colors';

const AppTextInput = ({style, placeHolder, ...otherProps}) => {
  return (
    <TextInput
      style={[styles.title, style]}
      placeHolderTextColor={colors.dark}
      placeholder={placeHolder}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    width: '100%',
    backgroundColor: colors.white,
    color: colors.black,
    padding: 10,
    borderRadius: 50,
    fontSize: 12,
    width: '100%',
  },
});
