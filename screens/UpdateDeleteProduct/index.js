import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import Screen from '../../Components/Screen';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import colors from '../../config/colors';
import AppButton from '../../Components/AppButton';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTimePicker from '../../Components/AppTimePicker';
const productTypes = [{label: 'Type 1'}, {label: 'Type 2'}];
const priceTypes = [
  {label: 'type 1', id: 1},
  {label: 'type 2', id: 2},
];
const colorsArr = [
  {label: 'red', id: 1},
  {label: 'blue', id: 2},
];
const sizes = [
  {label: 'large', id: 1},
  {label: 'medium', id: 1},
  {label: 'small', id: 1},
];

const index = (props) => {
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [totalAvailable, setTotalAvaliable] = useState('');
  const [priceType, setPriceType] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [product, setProduct] = useState('');
  const [image, setImage] = useState('');
  const [unit, setUnit] = useState('');
  const [presentation, setPresentation] = useState('');
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    var productId = props.route.params.productId;
    firestore()
      .collection('store')
      .doc(store.storeId)
      .collection('product')
      .doc(productId)
      .get()
      .then((res) => {
        var product = res.data();
        console.log(product, 'product');
        setProduct({...res.data(), productId});
        setProductType(product.productType);
        setProductName(product.productName);
        setProductPrice(product.productPrice);
        setTotalAvaliable(product.available);
        setPriceType(product.priceType);
        setColor(product.color);
        setSize(product.size);
        setShortDescription(product.shortDescription);
        setLongDescription(product.longDescription);
        setImage(product.image);
        setStartDate(new Date(product.expiryDate._seconds * 1000));
        setUnit(product.unit);
        setPresentation(product.presentation);
        setComment1(product.comment1);
        setComment2(product.comment2);
      });
  };
  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue, 'selected vale');
    setStartDate(selectedValue);
    {
      setShowStartDatePicker(false);
      selectedValue && setStartDate(selectedValue);
    }
  };

  const editProducts = async () => {
    setUpdateLoading(true);
    const product = {
      productType,
      productName,
      totalAvailable,
      priceType,
      color,
      size,
      shortDescription,
      longDescription,
    };
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log('This is the store inside upload: ', store);
    firestore()
      .collection('store')
      .doc(store.storeId)
      .collection('product')
      .doc(props.route.params.productId)
      .update(product)
      .then(() => {
        setUpdateLoading(false);
        console.log('data Updated correctly: ', product);
        Alert.alert(
          'Product Updated',
          '',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      })
      .catch((e) => {
        setUpdateLoading(false);
        Alert.alert(
          'Something Went Wrong',
          '',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  const deleteProduct = async () => {
    setDeleteLoading(true);
    const product = {
      productType,
      productName,
      totalAvailable,
      priceType,
      color,
      size,
      shortDescription,
      longDescription,
    };
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log('This is the store inside upload: ', store);
    firestore()
      .collection('store')
      .doc(store.storeId)
      .collection('product')
      .doc(props.route.params.productId)
      .delete(product)
      .then(() => {
        setDeleteLoading(false);
        props.navigation.navigate('Update delete product');
        console.log('data Updated correctly: ', product);
      })
      .catch((e) => {
        setDeleteLoading(false);
        Alert.alert(
          'Something Went Wrong',
          '',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  return (
    <Screen style={styles.container}>
      {product ? (
        <ScrollView style={{flex: 1, padding: 10}}>
          <View style={styles.userContainer}>
            <Image
              style={styles.image}
              source={
                image ? {uri: image} : require('../../assets/images/Spray.jpg')
              }
            />
            <AppText style={styles.title}>{productName}</AppText>
          </View>
          <AppPicker
            style={styles.mVertical}
            title={productType ? productType : 'Product Type'}
            value={productTypes}
            onSelectItem={(txt) => {
              setProductType(txt);
            }}
          />
          <AppTextInput
            placeHolder="Product Name"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={productName}
            onChangeText={(txt) => {
              setProductName(txt);
            }}
          />
          <AppTextInput
            placeHolder="Product Price"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={productPrice}
            onChangeText={(txt) => {
              setProductPrice(txt);
            }}
          />
          <AppTextInput
            placeHolder="Presentation"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={presentation}
            onChangeText={(txt) => {
              setPresentation(txt);
            }}
          />
          <AppTextInput
            placeHolder="Unit"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={unit}
            onChangeText={(txt) => {
              setUnit(txt);
            }}
          />
          <AppTextInput
            placeHolder="Comment 1"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={comment1}
            onChangeText={(txt) => {
              setComment1(txt);
            }}
          />
          <AppTextInput
            placeHolder="Comment 2"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={comment2}
            onChangeText={(txt) => {
              setComment2(txt);
            }}
          />
          <AppTextInput
            placeHolder="Unit"
            style={[{backgroundColor: colors.white}, styles.mVertical]}
            value={unit}
            onChangeText={(txt) => {
              setUnit(txt);
            }}
          />
          <View style={styles.subContainer}>
            <AppText style={styles.title}>Set Expiry Date</AppText>
            <View style={styles.timeContainer}>
              <AppTimePicker
                date={startDate}
                onPress={() => {
                  setShowStartDatePicker(true);
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
          <View
            style={[
              {flexDirection: 'row', justifyContent: 'space-evenly'},
              styles.mVertical,
            ]}>
            <AppTextInput
              style={[
                {width: '50%', backgroundColor: colors.white, marginRight: 5},
              ]}
              placeHolder="Total Available"
              value={totalAvailable}
              onChangeText={(txt) => {
                setTotalAvaliable(txt);
              }}
            />
            <AppPicker
              items={priceTypes}
              style={[
                {width: '50%', backgroundColor: colors.white, marginLeft: 5},
              ]}
              color={colors.dark}
              title={priceType ? priceType : 'Price Type'}
              value={priceType}
              onSelectItem={(txt) => {
                setPriceType(txt.label);
              }}
            />
          </View>
          <View
            style={[
              {flexDirection: 'row', justifyContent: 'space-evenly'},
              styles.mVertical,
            ]}>
            <AppPicker
              items={colorsArr}
              style={[
                {width: '50%', backgroundColor: colors.white, marginRight: 5},
              ]}
              color={colors.dark}
              title={color ? color : 'Color'}
              value={color}
              onSelectItem={(txt) => {
                setColor(txt.label);
              }}
            />
            <AppPicker
              items={sizes}
              style={[
                {width: '50%', backgroundColor: colors.white, marginLeft: 5},
              ]}
              color={colors.dark}
              title={size ? size : 'Size'}
              value={size}
              onSelectItem={(txt) => {
                setSize(txt.label);
              }}
            />
          </View>
          <AppTextInput
            style={styles.mVertical}
            placeHolder="Short Description"
            value={shortDescription}
            onChangeText={(txt) => {
              setShortDescription(txt);
            }}
          />
          <AppTextInput
            style={styles.mVertical}
            placeHolder="Long Description"
            value={longDescription}
            onChangeText={(txt) => {
              setLongDescription(txt);
            }}
          />
          <View style={styles.btnContainer}>
            <AppButton
              loading={deleteLoading}
              title="DELETE"
              style={[styles.btn, styles.btnDelete]}
              color={colors.white}
              onPress={deleteProduct}
            />
            <AppButton
              loading={updateLoading}
              title="UPDATE"
              style={styles.btn}
              color={colors.primary}
              onPress={editProducts}
            />
          </View>
        </ScrollView>
      ) : (
        <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator color={'black'} />
        </View>
      )}
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: colors.light,
    // padding: 10,
  },
  userContainer: {
    alignItems: 'center',
    padding: '10%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  btn: {
    width: 100,
    padding: 15,
  },
  btnDelete: {
    backgroundColor: '#FF4E00',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageUploadBtn: {
    width: '100%',
  },
  mVertical: {
    marginVertical: 10,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 35,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});
