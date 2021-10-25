import React from 'react';
import AppText from '../../Components/AppText';
import {StyleSheet, Text, View} from 'react-native';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

const index = ({navigation}) => {
  return (
    <Screen style={styles.container}>
      <AppCard
        title="Upload Product"
        onPress={() => navigation.navigate('Upload porduct')}
      />
      <AppCard
        title="Edit, Update and Delete Product"
        onPress={() => navigation.navigate('See products')}
      />
      <AppCard
        title="Import Product inventory (xls)"
        onPress={() => navigation.navigate('Import product inventory')}
      />
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
