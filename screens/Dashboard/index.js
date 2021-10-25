import React from 'react';
import AppText from '../../Components/AppText';
import {StyleSheet, Text, View} from 'react-native';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
const index = ({navigation}) => {
  return (
    <Screen style={styles.container}>
      <AppCard
        style={styles.shadowedView}
        title="My Purchase Orders in circulation"
        Icon={() => (
          <Entypo
            style={styles.icon}
            color="grey"
            name="circular-graph"
            size={30}
          />
        )}
        onPress={() => navigation.navigate('Order in circulation')}
        // onPress={() => console.log('screen not providde')}
      />
      <AppCard
        style={styles.shadowedView}
        Icon={() => (
          <Entypo
            style={styles.icon}
            color="grey"
            name="circular-graph"
            size={30}
          />
        )}
        title="Dispatcher in circulation"
        onPress={() => navigation.navigate('Vehicle in circulation')}
      />
      <AppCard
        style={styles.shadowedView}
        Icon={() => (
          <Entypo
            style={styles.icon}
            color="grey"
            name="circular-graph"
            size={30}
          />
        )}
        title="Client pending for delivery"
        onPress={() => navigation.navigate('Orders on the way')}
        // onPress={() => console.log('Dashboard >> onPress')}
      />
      <AppCard
        style={styles.shadowedView}
        Icon={() => (
          <Entypo
            style={styles.icon}
            color="grey"
            name="circular-graph"
            size={30}
          />
        )}
        title="Position of the client whose delivery is pending"
        // onPress={() => console.log('Dashboard >> onPress')}
        onPress={() => navigation.navigate('Pending Deliveries')}
      />
      <AppCard
        style={styles.shadowedView}
        Icon={() => (
          <Entypo
            style={styles.icon}
            color="grey"
            name="circular-graph"
            size={30}
          />
        )}
        title="Receive money recycling with us"
        onPress={() => navigation.navigate('recycle')}
      />
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  icon: {
    paddingHorizontal: 10,
    flex: 0.1,
  },
  shadowedView: {
    elevation: 5,
    borderRadius: 20,
  },
});
