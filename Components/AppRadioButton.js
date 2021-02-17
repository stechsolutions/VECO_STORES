import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const AppRadioButton = ({title, onPress, checked}) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <Fontisto
        style={styles.radioButton}
        name={checked ? 'radio-btn-active' : 'radio-btn-passive'}
      />
      <Text style={styles.radioText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppRadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    marginRight: 5,
    fontSize: 16,
  },
  radioText: {
    fontSize: 16,
  },
});
