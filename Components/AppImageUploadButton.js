import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import colors from '../config/colors';

const AppImageUploadButton = ({
  onPress,
  title = 'Attach Photo',
  style,
  file = false,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {!file && <EvilIcon name="image" size={35} color={colors.dark} />}
      {file && (
        <MaterialIcon name="attach-file" size={35} color={colors.dark} />
      )}

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppImageUploadButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // marginHorizontal: '20%',
    paddingVertical: '5%',
    // width: '60%',
    // height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: colors.primary,
  },
});
