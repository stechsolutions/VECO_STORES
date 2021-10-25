import React, {useEffect, useState} from 'react';
import AppText from '../../Components/AppText';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AppButton from '../../Components/AppButton';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import AppTimePicker from '../../Components/AppTimePicker';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [moreMessage, setMoreMessage] = useState([]);
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

  useEffect(() => {
    getMyDealers();
  }, []);

  const getMyDealers = async () => {
    setRefreshing(true);
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const promises = [];
    const distributersArray = [];
    console.log('hahahahahha', user);
    const distributers = await firestore().collection('distributer').get();
    if (distributers.size > 0) {
      for (const distributer of distributers.docs) {
        const {key} = distributer.data();
        const vendors = await firestore()
          .collection('distributer')
          .doc(key)
          .collection('vendors')
          .where('key', '==', user.userId)
          .get();
        console.log(vendors.size, key, user.userId);
        if (vendors.size > 0) {
          distributersArray.push(distributer.data());
        }
      }
    }
    setMoreMessage(distributersArray);
    setRefreshing(false);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={moreMessage}
        keyExtractor={(message) => message.key.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.tradeName}
            image={
              item.photoLogoUrl !== undefined
                ? {uri: item.photoLogoUrl}
                : require('../../assets/images/placeholder.png')
            }
            btnText="View"
            btnPress={() => navigation.navigate('Compliance view')}
            onPress={() => console.log('Message selected', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          console.log('Refreshing');
        }}
      />
      {/* <AppButton
        style={styles.btn}
        title="EXPORT ALL IN EXCEL"
        onPress={() => setShowModal(true)}
      /> */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onDismiss={() => setShowModal(false)}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View style={styles.closeButton}>
                <FontAwsome size={20} name="close" color={colors.white} />
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
    backgroundColor: colors.grey,
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
});
