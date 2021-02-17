import React, {  useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native';
import colors from '../../config/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppChat from '../../Components/AppChat';
import Screen from '../../Components/Screen';
import AppTextInput from '../../Components/AppTextInput';
import AppPicker from '../../Components/AppPicker';
import AppPhotoInput from '../../Components/AppPhotoInput';
import AppButton from '../../Components/AppButton';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [moreMessage, setMoreMessage] = useState([]);
  const [lessMessage, setLessMessage] = useState([]);
  const [driverPhoto, setDriverPhoto] = useState();
  const [idPhoto, setIdPhoto] = useState();
  const [licensePhoto, setLicensePhoto] = useState();
  const [dateInput, setDateInput] = useState(false);
  const [date, setDate] = useState();
  const [tab, setTab] = useState('more');

  useEffect(() => {
    var date = new Date().toString();
    console.log(date, 'date');
    setDate(date);
  }, [])
  const handleDriverPhotoUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setDriverPhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleIdPhotoUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setIdPhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleLicensePhotoUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setLicensePhoto(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onDateChange = (event, selectedValue) => {
    var date = new Date(selectedValue).toString();
    console.log(date, 'selected Date');
    setDate(date);
    setDateInput(false);
  };

  return (
    <Screen style={styles.container}>
      {console.log('tab>>>', tab)}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('more')}>
          <Text
            style={[styles.text, tab === 'more' && { color: colors.primary }]}>
            Recycle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('less')}>
          <Text
            style={[styles.text, tab === 'less' && { color: colors.primary }]}>
            Recycled Items
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'more' && (
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <AppPicker style={styles.mVertical} title="Type of product to recycle" />
          <AppPicker style={styles.mVertical} title="Material conditions" />
          <AppTextInput style={styles.mVertical} placeHolder="Weight" />
          <AppTextInput style={styles.mVertical} placeHolder="Contact" />
          <AppTextInput style={styles.mVertical} placeHolder="Contact Phone (Whatsapp)" />
          <AppPhotoInput
            style={styles.mVertical}
            placeHolder="Photo of recycled material"
            onPress={handleIdPhotoUpload}
          />
          <AppPicker style={styles.mVertical} title="I want it to be picked up immediately" />
          <AppPhotoInput
            calendar
            style={styles.mVertical}
            placeHolder={date ? date : "Photo of recycled material"}
            onPress={() => setDateInput(true)}
          />
          {dateInput && (
            <DateTimePicker
              onTouchCancel={() => setDateInput(false)}
              mode="date"
              value={new Date()}
              onChange={onDateChange}
            />
          )}
          <View style={styles.btnsView}>
            <View style={styles.coinView}>
              <Text>50</Text>
              <FontAwesome5 size={25} name='coins' color={colors.secondary} />
            </View>
            <AppButton
              style={[styles.btn, styles.mVertical]}
              title="SEND"
              // onPress={() => navigation.navigate('createDelivery2')}
              onPress={() => console.log('recycle')}
            />
          </View>
          {/* recycled items section */}

        </ScrollView>
      )}
      {tab === 'less' && (
        <ScrollView>
          <View style={styles.recycledItemView}>
            <Text style={styles.itemHead}>
              Status of recycled material
          </Text>
            <View style={styles.recycledItems}>
              <AppChat
                style={{ marginHorizontal: 0, marginBottom: 5, }}
                title={'Beer cans - 23kg - Date:23/11/2'}
                subtitle={'pending'}
                image={require('../../assets/images/Spray.jpg')}
                btnText="View"
                // variant="success"
                btnPress={() => console.log('See Products >>> Button Text Press')}
                onPress={() => console.log('Message selected', item)}
              />
              <AppChat
                style={{ marginHorizontal: 0, marginBottom: 5, }}
                title={'Beer cans - 23kg - Date:23/11/2'}
                subtitle={'pending'}
                image={require('../../assets/images/Spray.jpg')}
                btnText="View"
                // variant="success"
                btnPress={() => console.log('See Products >>> Button Text Press')}
                onPress={() => console.log('Message selected', item)}
              />
              <AppChat
                style={{ marginHorizontal: 0, marginBottom: 5, }}
                title={'Beer cans - 23kg - Date:23/11/2'}
                subtitle={'pending'}
                image={require('../../assets/images/Spray.jpg')}
                btnText="View"
                // variant="success"
                btnPress={() => console.log('See Products >>> Button Text Press')}
                onPress={() => console.log('Message selected', item)}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 16,
    color: colors.medium,
  },
  btn: {
    alignSelf: 'flex-end',
    padding: 15,
    width: 100,
    // marginBottom: 20,
  },
  mVertical: {
    marginVertical: 10,
  },
  btnsView: {
    flex: 0.1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center",marginBottom:20,
  },
  coinView: {
    borderRadius: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:0.1,
    height: 50, width: 50,
    backgroundColor: '#FFFFFF'
  },
  itemHead: {
    margin: 10,
    marginTop: 20,
    // borderWidth:1,
    textAlign: 'center',
    fontSize: 16,
    color: '#424F83'
  }
});
//-------------------------------------------------------------------------//



