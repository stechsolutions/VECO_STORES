import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';

export default function PurchaseOrders({ navigation }) {
  return (
    <Screen style={{ backgroundColor: colors.light }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <AppCard
          style={styles.shadowedView}
          Icon={() => (<Entypo style={styles.icon} color="grey" name='circular-graph' size={30} />)}
          title="Search Products"
          onPress={() => navigation.navigate('searchProducts')}
        />
        <AppCard
          style={styles.shadowedView}
          Icon={() => (<Entypo style={styles.icon} color="grey" name='circular-graph' size={30} />)}
          title="Make a deposit"
          onPress={() => navigation.navigate('makeDeposit')}
        />
        <AppCard
          style={styles.shadowedView}
          Icon={() => (<Entypo style={styles.icon} color="grey" name='circular-graph' size={30} />)}
          title="Pending Orders"
          onPress={() => navigation.navigate('pendingOrders')}
        />
        <AppCard
          style={styles.shadowedView}
          Icon={() => (<Entypo style={styles.icon} color="grey" name='circular-graph' size={30} />)}
          title="See Credit Notes and Balance in favor"
          onPress={() => navigation.navigate('creditNotes')}
        />
      </ScrollView>
    </Screen>
  );
}
