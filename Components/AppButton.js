import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/colors';

const AppButton = ({
  title,
  style,
  onPress,
  color = colors.black,
  loading = false,
  disabled = false,
  fontSize=16
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style, disabled && {backgroundColor: colors.medium}]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={{color: color, fontWeight: 'bold', fontSize: fontSize,textAlign:'center'}}>
        {title}
      </Text>
      {loading && (
        <ActivityIndicator style={{paddingHorizontal: 10}} color={'black'} />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    // flex:0.05,flexDirection:'row',justifyContent:'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    alignItems: 'center',
  },
});
