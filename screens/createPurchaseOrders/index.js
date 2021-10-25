import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
// import {styles} from './style';
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
  Item,
  Input,
  Picker,
} from 'native-base';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppTextInput from '../../Components/AppTextInput';
import AppButton from '../../Components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import AppTimePicker from '../../Components/AppTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreatePurchaseOrders() {
  const [purchaseOrderDate, setPurchaseOrderDate] = useState(new Date());
  const [vendorNumber, setvendorNumber] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(new Date());
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('');
  const [unitId, setUnitId] = useState('');
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const createOrder = async () => {
    try {
      var user = JSON.parse(await AsyncStorage.getItem('user'));
      var store = JSON.parse(await AsyncStorage.getItem('store'));
      console.log(store, 'store');
      var order = {
        storeId: store.storeId,
        createdBy: 'distributor',
        orderCreator: user.userId,
        purchaseOrderDate,
        vendorNumber,
        expectedDeliveryDate,
        purchaseOrderNumber,
        unitId,
        name: user.tradeName,
        status: 'approved',
      };
      firestore()
        .collection('purchaseOrder')
        .add(order)
        .then((res) => {
          console.log(res, 'ress');
          Alert.alert(
            'Order Created',
            'New Order has been Created',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        })
        .catch((e) => {
          console.log(e, 'er');
          Alert.alert(
            'Error',
            'Something went wrong!',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        });
    } catch (e) {
      console.log(e, 'err');
    }
  };

  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    // taskArray[index].startDate = selectedValue;
    // setTaskArray(taskArray);
    {
      setShowStartDatePicker(false);
      selectedValue && setPurchaseOrderDate(selectedValue);
    }
  };
  const onEndtDateChange = (event, selectedValue) => {
    // console.log(selectedValue);
    {
      setShowEndDatePicker(false);
      selectedValue && setExpectedDeliveryDate(selectedValue);
    }
  };
  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <Text>Purchase order date</Text>
        <AppTimePicker
          date={purchaseOrderDate}
          onPress={() => {
            setShowEndDatePicker(false);
            setShowStartDatePicker(true);
          }}
        />
        {showStartDatePicker && (
          <DateTimePicker
            onTouchCancel={() => setShowStartDatePicker(false)}
            mode="date"
            value={purchaseOrderDate}
            onChange={onStartDateChange}
          />
        )}

        {/* <AppTextInput
          value={purchaseOrderDate}
          onChangeText={(txt) => setPurchaseOrderDate(txt)}
          style={styles.mVertical}
          placeholder="Purchase order date"
        /> */}
        <AppTextInput
          value={vendorNumber}
          onChangeText={(txt) => setvendorNumber(txt)}
          style={styles.mVertical}
          placeholder="Vendor Number"
        />

        {/* <AppTextInput
          value={expectedDeliveryDate}
          onChangeText={(txt) => setExpectedDeliveryDate(txt)}
          style={styles.mVertical}
          placeholder="Expected delivery date"
        /> */}
        <Text>Expected delivery date</Text>
        <AppTimePicker
          date={expectedDeliveryDate}
          onPress={() => {
            setShowStartDatePicker(false);
            setShowEndDatePicker(true);
          }}
        />
        {showEndDatePicker && (
          <DateTimePicker
            onTouchCancel={() => setShowEndDatePicker(false)}
            mode="date"
            value={expectedDeliveryDate}
            onChange={onEndtDateChange}
          />
        )}
        <View style={[styles.subContainer, styles.mVertical]}>
          <AppTextInput
            value={purchaseOrderNumber}
            onChangeText={(txt) => setPurchaseOrderNumber(txt)}
            style={styles.halfInput}
            placeholder="Purchase order number"
          />
          <AppTextInput
            value={unitId}
            onChangeText={(txt) => setUnitId(txt)}
            style={styles.halfInput}
            placeholder="Unit ID"
          />
        </View>
        <AppButton
          onPress={createOrder}
          color={colors.primary}
          style={[styles.btn, styles.mVertical]}
          title="CREATE PURCHASE ORDER"
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfInput: {
    width: '50%',
  },
  btn: {
    padding: 15,
  },
  mVertical: {
    marginVertical: 10,
  },
});
