import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

const AppCard = ({title, onPress, style, Icon}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {Icon && <Icon />}
      <AppText style={[styles.title, !Icon && {textAlign: 'center'}]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // paddingVertical: '10%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    //  borderWidth:1,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    flex: 1,
    // borderWidth:1,
  },
});
