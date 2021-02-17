import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../config/colors';

const Separator = () => {
  return <View style={styles.separator} />;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.medium,
  },
});
