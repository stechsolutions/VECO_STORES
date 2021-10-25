import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../config/colors';
import {IMLocalized} from '../i18n/Localize';

const AppTextInput = ({style, placeHolder, placeholder, ...otherProps}) => {
  return (
    <TextInput
      style={[styles.title, style]}
      placeHolderTextColor={colors.dark}
      placeholder={IMLocalized(placeHolder || placeholder)}
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
