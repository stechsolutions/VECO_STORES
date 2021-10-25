import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';

const LocationDetail = ({onPress, title, onClose}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Entypo
          name="circle-with-cross"
          size={16}
          style={{paddingLeft: 10}}
          onPress={onClose}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LocationDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
