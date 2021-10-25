import React, {useState} from 'react';
import AppText from '../../Components/AppText';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
// import {styles} from './style';
import Screen from '../../Components/Screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppImageTitleView from '../../Components/AppImageTitleView';
import colors from '../../config/colors';
import AppPicker from '../../Components/AppPicker';
import AppRadioButton from '../../Components/AppRadioButton';
import AppButton from '../../Components/AppButton';
import AppTextInput from '../../Components/AppTextInput';

export default function AssignDispatcher() {
  const [checked, setchecked] = useState('');
  //   state = {
  //     licenseType: null,
  //     debitCard: true,
  //     cashOnDel: false,
  //   };
  //   onValueChange(value, property) {
  //     this.setState({
  //       [property]: value,
  //     });
  //   }
  //   toggleRadioCashOnDel = () => {
  //     this.setState({cashOnDel: true, debitCard: false});
  //   };
  //   toggleRadioCredit = () => {
  //     this.setState({debitCard: true, cashOnDel: false});
  //   };
  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <AppImageTitleView
          image={require('./assets/user.jpg')}
          title="Order Name"
          subTitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab necessitatibus incidunt in debitis, nostrum doloremque quae nemo eius dolor sit temporibus aperiam commodi fugit possimus sunt consectetur similique explicabo maiores."
        />
        <View style={styles.subContainer}>
          <AppText style={styles.title}>Assign Route</AppText>
          <AppPicker title="" />
        </View>
        <View style={styles.subContainer}>
          <AppText style={styles.title}>Assign Payment Type</AppText>
          <View style={styles.radionButtonContainer}>
            <AppRadioButton
              title="Debit / Credi Card"
              onPress={() => setchecked('Card')}
              checked={checked === 'Card'}
            />
            <AppRadioButton
              title="Cash ondelivery"
              onPress={() => setchecked('COD')}
              checked={checked === 'COD'}
            />
          </View>
        </View>
        <View style={styles.cardView}>
          <FontAwesome style={styles.cardIcons} size={30} name="cc-visa" />
          <FontAwesome
            style={styles.cardIcons}
            size={30}
            name="cc-mastercard"
          />
        </View>
        {/* <View style={styles.assignRouteView}>
          <AppText style={styles.assignRouteText}>Assign Payment type</AppText>

          <View style={[styles.scrollInnerView, {width: '100%'}]}>
            <Item style={styles.item} rounded>
              <Input style={styles.input} placeholder="Enter Volume here" />
            </Item>
          </View>
        </View> */}
        <View>
          <AppText style={styles.title}>Assign Purchase Volume</AppText>

          <AppTextInput placeHolder="Enter volume here" />
        </View>
        <View style={styles.subContainer}>
          <AppButton color={colors.primary} style={styles.btn} title="ASSIGN" />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radionButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  cardIcons: {
    margin: 5,
  },
  btn: {
    padding: 15,
    width: 120,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
