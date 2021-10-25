import React, {Children} from 'react';
import AppText from './AppText';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import colors from '../config/colors';

const Screen = ({children, style}) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Screen;
