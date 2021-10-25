import React, {useState} from 'react';
import AppText from '../../Components/AppText';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AppCard from '../../Components/AppCard';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppTimePicker from '../../Components/AppTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../../Components/AppButton';

const screen = Dimensions.get('window');

const index = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    {
      setShowStartDatePicker(false);
      setShowEndDatePicker(false);
      selectedValue && setStartDate(selectedValue);
    }
  };
  const onEndtDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    {
      setShowEndDatePicker(false);
      setShowStartDatePicker(false);
      selectedValue && setEndDate(selectedValue);
    }
  };
  return (
    <Screen style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <AppCard
          style={styles.shadowedView}
          title="Customers (Buyers)"
          onPress={() => navigation.navigate('Customers')}
        />
        <AppCard
          style={styles.shadowedView}
          title="Products"
          onPress={() => navigation.navigate('Products')}
        />
        <AppCard
          style={styles.shadowedView}
          title="My Dealers"
          onPress={() => navigation.navigate('My Dealers')}
        />
        <AppCard
          style={styles.shadowedView}
          title="Stores and their Details"
          onPress={() => navigation.navigate('StoreAndDetails')}
        />
      </ScrollView>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onDismiss={() => setShowModal(false)}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View style={styles.closeButton}>
                <FontAwesome size={20} name="close" color={colors.white} />
              </View>
            </TouchableWithoutFeedback>
            <AppText style={styles.title}>Exporting Data</AppText>
            <AppText style={styles.subTitle}>Select the date range</AppText>
            {/* <View style={styles.timeContainer}> */}
            {/* <View style={styles.subContainer}> */}
            <AppTimePicker
              date={startDate}
              onPress={() => {
                setShowStartDatePicker(true);
                setShowEndDatePicker(false);
              }}
            />
            <AppText style={[styles.text, {color: colors.dark}]}>to</AppText>
            <AppTimePicker
              date={endDate}
              onPress={() => {
                setShowStartDatePicker(false);
                setShowEndDatePicker(true);
              }}
            />
            {/* </View> */}
            {/* </View> */}
            {showStartDatePicker && (
              <DateTimePicker
                onTouchCancel={() => setShowStartDatePicker(false)}
                mode="date"
                value={startDate}
                onChange={onStartDateChange}
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                onTouchCancel={() => setShowEndDatePicker(false)}
                mode="date"
                value={endDate}
                onChange={onEndtDateChange}
              />
            )}
            <AppButton
              color={colors.white}
              style={styles.exportBtn}
              title="EXPORT"
              onPress={() => console.log('MODAL')}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },

  btn: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.light,
    alignItems: 'center',
    paddingVertical: 40,
    justifyContent: 'flex-end',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 12,
    color: colors.dark,
  },
  exportBtn: {
    padding: 10,
    marginTop: 20,
    width: 120,
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  shadowedView: {
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
