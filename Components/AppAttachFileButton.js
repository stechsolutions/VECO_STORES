import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';

const AppAttachFileButton = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <Entypo name="attachment" color={colors.dark} size={22} />
    </TouchableOpacity>
  );
};

export default AppAttachFileButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.dark,
  },
});
