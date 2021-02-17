import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AppInfoCard = ({title, text,titleStyle,viewStyle}) => {
  return (
    <View style={viewStyle}>
      <Text style={[styles.title,titleStyle]}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
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
