import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

const index = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <AppCard
          style={styles.shadowedView}
          title="Create Promotion"
          onPress={() => navigation.navigate('Create promotions')}
        />
        <AppCard
          style={styles.shadowedView}
          title="Display Promotions"
          onPress={() => navigation.navigate('Created promotions')}
        />
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light
  },
  shadowedView: {
    elevation: 5, borderRadius: 20,marginHorizontal:20,marginVertical:10,
  }
});
