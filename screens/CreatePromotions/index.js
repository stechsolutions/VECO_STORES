import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {Image, ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../../Components/AppButton';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import AppMultiLineInput from '../../Components/AppMultiLineInput';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import AppTimePicker from '../../Components/AppTimePicker';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';

const types = [
  {label: 'type1', id: 1},
  {label: 'type2', id: 2},
];

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

const index = ({navigation}) => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);

  const createPromotion = async () => {
    setLoading(true);
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    var response = await fetch(imageUri);
    var blob = await response.blob();
    storage()
      .ref(`promotions/${store.storeId}/${Date.now()}`)
      .put(blob)
      .on(
        'state_changed',
        () => {},
        () => {},
        (imageRes) => {
          imageRes.ref.getDownloadURL().then((url) => {
            const promotion = {
              name,
              description,
              imageUri: url,
              selectedProduct,
              startDate,
              endDate,
              promotionType: type,
            };
            firestore()
              .collection('vendorStores')
              .doc(store.storeId)
              .collection('promotions')
              .add(promotion)
              .then((res) => {
                setLoading(false);
                console.log(res, 'ress');
                Alert.alert(
                  'Promotion Created',
                  'Promotion created successfully',
                  [{text: 'OK', onPress: () => navigation.goBack()}],
                  {cancelable: false},
                );
              })
              .catch((e) => {
                setLoading(false);
                Alert.alert(
                  'Something Went Wrong',
                  e.message,
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              });
          });
        },
      );
  };

  const getProducts = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    firestore()
      .collection('vendorStores')
      .doc(store.storeId)
      .collection('products')
      .get()
      .then((res) => {
        var products = [];
        res.forEach((e) => {
          products.push({
            ...e.data(),
            productId: e.id,
            label: e.data().productName,
            id: e.id,
          });
        });
        setProducts(products);
        console.log(products, 'productss');
      });
  };

  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    {
      selectedValue && setStartDate(selectedValue);
      setShowStartDatePicker(false);
    }
  };
  const onEndtDateChange = (event, selectedValue) => {
    console.log(selectedValue);
    {
      selectedValue && setEndDate(selectedValue);
      setShowEndDatePicker(false);
    }
  };
  const handleImageUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setImageUri(response.uri);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Screen style={styles.container}>
      <ScrollView style={{padding: 10}}>
        <AppPicker
          // items={pickerItemsObj}
          items={products}
          style={styles.mVertical}
          title={selectedProduct ? selectedProduct : 'Select Product'}
          // selectedItem={selectedProduct}
          onSelectItem={(item) => setSelectedProduct(item.label)}
        />
        {imageUri ? (
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: imageUri, width: 100, height: 100}}
              width={100}
              height={100}
            />
          </TouchableOpacity>
        ) : (
          <AppImageUploadButton
            style={styles.mVertical}
            onPress={() => {
              handleImageUpload();
              console.log('create promotions >>> Image Upload Button');
            }}
          />
        )}
        <AppTextInput
          style={styles.mVertical}
          placeHolder="Name"
          value={name}
          onChangeText={(txt) => setName(txt)}
        />
        <AppMultiLineInput
          style={styles.mVertical}
          placeholder="Description"
          value={description}
          onChangeText={(txt) => setDescription(txt)}
        />
        <AppPicker
          onSelectItem={(txt) => {
            setType(txt.label);
          }}
          items={types}
          style={styles.mVertical}
          title={type ? type : 'Promotion Type'}
        />
        <View style={styles.timeContainer}>
          <AppText style={styles.title}>Start and end date</AppText>
          <View style={styles.subContainer}>
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
            mode="date"
            value={endDate}
            onChange={onEndtDateChange}
          />
        )}

        <AppButton
          disabled={
            !selectedProduct || !imageUri || !name || !description || !type
          }
          loading={loading}
          title="CREATE"
          style={[styles.btn, styles.mVertical]}
          color={colors.primary}
          onPress={createPromotion}
        />
        {/* Remove this code */}
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    // padding: '10%',
    backgroundColor: colors.light,
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  timeContainer: {
    // width: '100%',
    flex: 1,
  },
  title: {
    fontSize: 20,
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
    width: 'auto',
    paddingVertical: 10,
    alignSelf: 'center',
  },
  mVertical: {
    marginVertical: 10,
  },
});
