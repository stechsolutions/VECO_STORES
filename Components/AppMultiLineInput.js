import React from 'react';
import AppText from './AppText';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';

const AppMultiLineInput = ({style, ...otherProps}) => {
  return (
    <TextInput
      multiline
      placeholderTextColor={colors.dark}
      style={[styles.input, style]}
      numberOfLines={4}
      underlineColorAndroid="transparent"
      {...otherProps}
    />
  );
};

export default AppMultiLineInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: 12,
    borderRadius: 20,
    textAlignVertical: 'top',
  },
});
