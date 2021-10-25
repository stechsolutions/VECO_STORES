import React, {Component, useState} from 'react';
import AppText from '../../Components/AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Counter from '../../Components/Counter';
import AppButton from '../../Components/AppButton';
import Modal from '../../Components/Modal';
export default function CreditNoteDetail({navigation}) {
  const [count, setCount] = useState(3);
  const [modal, setModal] = useState(false);

  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.bottomBorderView}>
          <AppText style={styles.label}>Amount</AppText>
          <AppText style={styles.value}>$35.00</AppText>
        </View>
        <View style={styles.bottomBorderView}>
          <AppText style={styles.label}>Dealer Name</AppText>
          <AppText style={styles.value}>Test Dealer</AppText>
        </View>
        <View style={styles.bottomBorderView}>
          <AppText style={styles.label}>Date of credit note</AppText>
          <AppText style={styles.value}>26/feb/2021</AppText>
        </View>
        <View style={styles.bottomBorderView}>
          <AppText style={styles.label}>Reason for the credit note:</AppText>
          <AppText style={[styles.value, {padding: 20}]}>
            The merchandise arrived beaten and damaged, customers will not buy
            it that way
          </AppText>
        </View>
        <View style={styles.bottomBorderView}>
          <AppText style={styles.label}>Status</AppText>
          <AppText style={styles.value}>In process</AppText>
        </View>
        <View style={styles.bottomBorderView}>
          <AppText style={styles.label}>Date to be completed</AppText>
          <AppText style={styles.value}>02/Mar/2021</AppText>
        </View>
        <View style={{alignItems: 'center'}}>
          <AppButton
            onPress={() => navigation.navigate('MailStack')}
            color={colors.primary}
            title="Do you want to chat with the dealer?"
            style={{
              marginVertical: 30,
              marginHorizontal: 20,
              padding: 15,
              width: '80%',
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottomBorderView: {
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    color: colors.dark,
    fontWeight: '700',
  },
});
