import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../../Components/AppButton';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import AppMultiLineInput from '../../Components/AppMultiLineInput';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import AppTimePicker from '../../Components/AppTimePicker';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import LocationDetail from '../../Components/LocationDetail';
import AppRadioButton from '../../Components/AppRadioButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilePickerManager from 'react-native-file-picker';
// import storage from '@react-native-firebase/storage';

const pickerItemsObj = [
  {label: 'Shower Cleaner', value: 0},
  {label: 'Dress', value: 1},
  {label: 'Shoes', value: 2},
  {label: 'Furniture', value: 3},
  {label: 'Laptop', value: 5},
  {label: 'Car', value: 6},
  {label: 'Mobile Phones', value: 7},
  {label: 'Accessories', value: 8},
  {label: 'Watches', value: 9},
  {label: 'Clothing', value: 10},
];
const index = () => {
  const [selected, setSelected] = useState();
  const [seller, setSeller] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sellers, setSellers] = useState(false);
  const [vendors, setVendors] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [flag, setFlag] = useState(true);
  const [file, setFile] = useState(null);
  let arr = [];
  useEffect(() => {
    console.log('hello');
    if (flag) {
      getSellers();
      getVendors();
      setFlag(false);
    }
  });
  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    taskArray[index].startDate = selectedValue;
    setTaskArray(taskArray);
    {
      setShowStartDatePicker(false);
      selectedValue && setStartDate(selectedValue);
    }
  };
  const onEndtDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    {
      setShowEndDatePicker(false);
      selectedValue && setEndDate(selectedValue);
    }
  };
  const getSellers = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    firestore()
      .collection('store')
      .doc(store.storeId)
      .collection('seller')
      .get()
      .then((res) => {
        console.log(res, 'sellers');
        var sellers = [];
        res.forEach((each) => {
          var seller = each.data();
          sellers.push({label: seller.name, value: each.ref.id});
        });
        setSellers(sellers);
        console.log(sellers, 'sellers');
      });
  };
  const getVendors = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    firestore()
      .collection('vendorStores')
      .get()
      .then((res) => {
        console.log(res, 'vendors');
        var vendors = [];
        res.forEach((each) => {
          var vendor = each.data();
          vendors.push({label: vendor.name, value: each.ref.id});
        });
        setVendors(vendors);
        console.log(vendors, 'vendors');
      });
  };
  const assignTask = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log(taskArray, 'taskArray');
    var promises = [];
    for (var i = 0; i < taskArray.length; i++) {
      var task = taskArray[i];
      var obj = {
        sellerId: seller,
        vendorId: task.value,
        date: taskArray.startDate,
        type: task.type,
      };
      var res = firestore()
        .collection('store')
        .doc(store.storeId)
        .collection('task')
        .add(obj);
      promises.push(res);
    }
    Promise.all(promises).then((res) => {
      console.log('all tasks added');
    });
  };
  const getFile = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        var decoded = response;
        console.log(decoded);
        setFile(decoded);
      }
    });
  };
  const assignViaFile = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    var date = Date.now();
    var convertedFile = Papa.parse(file.uri);
    console.log(convertedFile, 'cov file');
    // storage().ref().child(store.storeId+'/tasks/'+date).put(file)
    // .then(snapshot=>{
    //   snapshot.ref.getDownloadURL.then(url=>{
    //     console.log(url,'url');
    //   })
    //   .catch(e=>{
    //     console.log(e,'err')
    //   })

    // })
    // .catch(err=>{
    //   console.log(err,'err2');
    // })
  };
  return (
    <Screen style={styles.container}>
      <ScrollView style={{padding: 10}}>
        <AppImageUploadButton
          file
          title="Upload routes with excel fils"
          style={styles.mVertical}
          onPress={getFile}
        />
        <AppText style={[styles.title, styles.mVertical]}>
          Assign Seller
        </AppText>
        {/* <AppTextInput placeHolder="Search" /> */}
        <AppPicker
          onSelectItem={(txt) => {
            console.log(txt, 'txt');
            setSeller(txt.value);
            setSellerName(txt.label);
          }}
          items={sellers}
          style={styles.mVertical}
          title={sellerName ? sellerName : 'Search'}
        />
        <AppText style={[styles.title, styles.mVertical]}>Assign Store</AppText>
        {/* <AppTextInput placeHolder="Search" /> */}
        <AppPicker
          onSelectItem={(txt) => {
            var flag = 0;
            for (var i = 0; i < taskArray.length; i++) {
              if (taskArray[i].label === txt.label) {
                flag = 1;
                break;
              }
            }
            if (flag === 0) {
              var temp = taskArray;
              temp.push(txt);
              setTaskArray(temp);
              // arr = temp;
              console.log(temp, 'tasks');
            }
          }}
          items={vendors}
          style={styles.mVertical}
          title={'Search'}
        />
        <AppText style={styles.subTitle}>
          {taskArray.length} Store Assigned
        </AppText>
        <View style={styles.storeDetailContainer}>
          {taskArray.map((e, i) => {
            return (
              <LocationDetail
                key={i}
                onPress={() => {
                  setIndex(i);
                }}
                title={e.label}
              />
            );
          })}
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.title}>
            {taskArray[index] && taskArray[index].label}
          </Text>
          <View style={styles.subContainer}>
            <View>
              <AppText style={styles.dateTime}>Select Date</AppText>
              <AppTimePicker
                date={
                  taskArray[index] && taskArray[index].startDate
                    ? taskArray[index].startDate
                    : startDate
                }
                onPress={() => {
                  setShowStartDatePicker(true);
                  setShowEndDatePicker(false);
                }}
              />
            </View>
            <View>
              <AppText style={styles.dateTime}>Select Time</AppText>
              <AppTimePicker
                time
                date={
                  taskArray[index] && taskArray[index].endDate
                    ? taskArray[index].endDate
                    : endDate
                }
                onPress={() => {
                  setShowStartDatePicker(false);
                  setShowEndDatePicker(true);
                }}
              />
            </View>
          </View>
        </View>
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
            mode="time"
            value={endDate}
            onChange={onEndtDateChange}
          />
        )}
        <View style={styles.radionButtonContainer}>
          <AppRadioButton
            title="reccuring"
            onPress={() => {
              taskArray[index].type = 'reccuring';
              setTaskArray(taskArray);
              setChecked('reccuring');
            }}
            checked={taskArray[index] && taskArray[index].type === 'reccuring'}
          />
          <AppRadioButton
            title="non-reccuring"
            onPress={() => {
              taskArray[index].type = 'non-reccuring';
              setTaskArray(taskArray);
              setChecked('non-reccuring');
            }}
            checked={
              taskArray[index] && taskArray[index].type === 'non-reccuring'
            }
          />
        </View>

        <AppButton
          title="ASSIGN"
          style={[styles.btn, styles.mVertical]}
          color={colors.primary}
          onPress={file ? assignViaFile : assignTask}
        />
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  timeContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  text: {
    backgroundColor: colors.white,
    color: colors.black,
    padding: 5,
    borderRadius: 10,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    width: 100,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  mVertical: {
    marginVertical: 10,
  },

  storeDetailContainer: {
    flexDirection: 'row',
    padding: 15,
    flexWrap: 'wrap',
  },
  subTitle: {
    color: colors.dark,
  },
  dateTime: {
    fontSize: 12,
    color: colors.dark,
  },
  radionButtonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
});
