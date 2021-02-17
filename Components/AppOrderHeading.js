import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

const AppOrderHeading = ({count, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.round}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppOrderHeading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  round: {
    backgroundColor: colors.secondary,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 18,
    fontWeight: '100',
  },
  title: {
    paddingLeft: 20,
    fontSize: 20,
    color: colors.primary,
  },
});
