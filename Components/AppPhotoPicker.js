import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

function AppPhotoPicker({condition, placeHolder, onPress}) {
  return (
    <View
      style={[
        styles.photoView,
        {
          backgroundColor: condition ? colors.secondary : 'white',
        },
      ]}>
      <View style={styles.PhotocontentView}>
        <Text style={styles.photoText}>{placeHolder}</Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.IconStyle}>
          <Ionicons
            style={styles.icon}
            name="md-images"
            size={18}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  photoView: {
    // borderWidth:2,
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
    height: 45,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
  photoText: {
    color: 'grey',
    padding: 10,
    fontSize: 12,
    // justifyContent:'center',
    // alignSelf:'center'
  },
  circle: {
    margin: 3,
    height: 7,
    width: 7,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
  },
  PhotocontentView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '85%',
  },
  IconStyle: {
    backgroundColor: colors.secondary,
    width: 40,
    marginHorizontal: 5,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default AppPhotoPicker;
