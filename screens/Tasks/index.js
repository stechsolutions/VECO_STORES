import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

const index = ({navigation}) => {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <AppCard
          title="Assign Tasks"
          onPress={() => navigation.navigate('Assign tasks')}
        />
        <AppCard
          title="Mark Visit Compliance"
          onPress={() => navigation.navigate('Assigned tasks')}
        />
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
