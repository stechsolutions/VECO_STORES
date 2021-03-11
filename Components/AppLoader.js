import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../config/colors';
import Screen from './Screen';

const {width} = Dimensions.get('window');

const AppLoader = () => {
  return (
    <Screen>
      <ActivityIndicator
        style={styles.activityIndicator}
        size={(width / 100) * 10}
        color={colors.primary}
      />
    </Screen>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: width / 2 - (width / 100) * 5,
  },
});
