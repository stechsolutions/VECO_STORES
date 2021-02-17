import React, {useState} from 'react';
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
const moreMessages = [
  {
    id: 1,
    title: 'Product Name',
    subTitle: 'Approved',

    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 8,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 9,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 10,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 11,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 12,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 13,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
];

const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [moreMessage, setMoreMessage] = useState(moreMessages);
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
      <FlatList
        data={moreMessage}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.title}
            image={item.image}
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
            <Text style={styles.title}>Exporting Data</Text>
            <Text style={styles.subTitle}>Select the date range</Text>
            {/* <View style={styles.timeContainer}> */}
            {/* <View style={styles.subContainer}> */}
            <AppTimePicker
              date={startDate}
              onPress={() => {
                setShowStartDatePicker(true);
                setShowEndDatePicker(false);
              }}
            />
            <Text style={[styles.text, {color: colors.dark}]}>to</Text>
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
