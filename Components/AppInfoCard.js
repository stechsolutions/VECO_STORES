import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, View} from 'react-native';

const AppInfoCard = ({title, text, titleStyle, viewStyle}) => {
  return (
    <View style={viewStyle}>
      <AppText style={[styles.title, titleStyle]}>{title}</AppText>
      <AppText style={styles.text}>{text}</AppText>
    </View>
  );
};

export default AppInfoCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
  },
  text: {},
});
