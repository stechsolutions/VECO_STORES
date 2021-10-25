import React from 'react';
import AppText from './AppText';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import colors from '../config/colors';

const months = [
  'Jan',
  'Feb',
  'March',
  'APril',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const AppTimePicker = ({date, onPress, time}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.subContainer}>
        {!time && (
          <>
            <AppText style={styles.text}>{date.getDate()}</AppText>
            <AppText style={styles.text}>{months[date.getMonth()]}</AppText>
            <AppText style={styles.text}>{date.getFullYear()}</AppText>
          </>
        )}

        {time && (
          <>
            <Text style={styles.text}>
              {date.getHours() % 12
                ? date.getHours() > 12
                  ? date.getHours() - 12
                  : date.getHours()
                : '12'}
            </Text>
            <Text style={styles.text}>
              {date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()}
            </Text>
            <Text style={styles.text}>
              {date.getHours() > 12 ? 'pm' : 'am'}
            </Text>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppTimePicker;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    backgroundColor: colors.white,
    color: colors.black,
    padding: 5,
    borderRadius: 10,
    margin: 5,
  },
});
