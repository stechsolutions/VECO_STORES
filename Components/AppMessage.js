import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../config/colors';

const AppMessage = ({message, time, user = false}) => {
  return (
    <View style={styles.container}>
      <View style={[{width: '80%'}, user && {alignSelf: 'flex-end'}]}>
        <View
          style={[
            styles.messageUser,
            user && {backgroundColor: colors.secondary, alignSelf: 'flex-end'},
          ]}>
          <Text>{message}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default AppMessage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginVertical: 5,
  },
  messageUser: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 8,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 9,
  },
});
