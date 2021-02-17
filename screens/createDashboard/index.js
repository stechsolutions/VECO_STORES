import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

function CreateDashboard({ navigation }) {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <AppCard
          style={styles.shadowedView}
          title="Create SalesMan"
          // onPress={() => navigation.navigate('createDelivery1')}
          onPress={() => navigation.navigate('createSalesMan')}
        />
        <AppCard
          style={styles.shadowedView}
          title="Create Subadmin"
          onPress={() => navigation.navigate('createSubAdmin')}
        />
        <AppCard
          style={styles.shadowedView}
          title="Create Dispatcher"
          onPress={() => navigation.navigate('createDispatcher')}
        />
        {/* <AppCard
          title="Create Supervisor"
          onPress={() => console.log('createDelivery1')}
        /> */}
      </ScrollView>
    </Screen>
  );
}

export default CreateDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  shadowedView: {
    elevation: 5, borderRadius: 20,
  }
});
