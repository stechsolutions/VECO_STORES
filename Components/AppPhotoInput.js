import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../config/colors';

const AppPhotoInput = ({placeHolder, onPress, style, map, add,calendar}) => {
  return (
    <TouchableOpacity delayLongPress={'300ms'} style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{placeHolder}</Text>
      <View style={styles.icon}>
        {!map && !add && !calendar && (
          <FontAwesome style={{padding: 10}} name="photo" size={20} />
        )}
        {map && <FontAwesome style={{padding: 10}} name="map-o" size={20} />}
        {add && <Fontisto style={{padding: 10}} name="plus-a" size={20} />}
        {calendar && <FontAwesome5 style={{padding: 10}} name="calendar-alt" size={20}/>  }
      </View>
    </TouchableOpacity>
  );
};

export default AppPhotoInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  text: {
    width: '100%',
    backgroundColor: colors.white,
    color: colors.dark,
    padding: 10,
    borderRadius: 50,
    fontSize: 12,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 0,
    padding: 2,
    borderRadius: 60,
    backgroundColor: colors.secondary,
  },
});
