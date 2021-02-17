import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AppButton from '../../Components/AppButton';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import AppMultiLineInput from '../../Components/AppMultiLineInput';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import AppTimePicker from '../../Components/AppTimePicker';
import Screen from '../../Components/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const types = [{ label: 'type1', id: 1 }, { label: 'type2', id: 2 }];

const pickerItemsObj = [
  { label: 'Shower Cleaner', value: 0 },
  { label: 'Dress', value: 1 },
  { label: 'Shoes', value: 2 },
  { label: 'Furniture', value: 3 },
  { label: 'Laptop', value: 5 },
  { label: 'Car', value: 6 },
  { label: 'Mobile Phones', value: 7 },
  { label: 'Accessories', value: 8 },
  { label: 'Watches', value: 9 },
  { label: 'Clothing', value: 10 },
];
const index = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [type, setType] = useState('');
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    getPromotion();
  }, [])

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

  const getPromotion = async () => {
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    var promoId = props.route.params.promoId;
    firestore().collection('vendorStores').doc(store.storeId).collection('promotions').doc(promoId).get()
      .then(res => {
        var promo = res.data();
        console.log(promo, 'promo');
        setPromotion(promo);
        setSelectedProduct(promo.selectedProduct);
        setImageUri(promo.imageUri);
        setDescription(promo.description);
        setName(promo.name);
        setType(promo.promotionType);
        setStartDate(new Date(promo.startDate._seconds * 1000));
        setEndDate(new Date(promo.endDate._seconds * 1000));


      })

  }
  const editPromos = async () => {
    setUpdateLoading(true);
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log("This is the store inside upload: ", store);
    if (imageUri === promotion.imageUri) {
      const newPromo = { name, description, selectedProduct, imageUri, startDate, endDate, promotionType: type };
      firestore().collection('vendorStores').doc(store.storeId).collection('promotions').doc(props.route.params.promoId).update(newPromo)
        .then(() => {
          setUpdateLoading(false);
          Alert.alert("Updation completed");
        })
        .catch(e => {
          setUpdateLoading(false);
          Alert.alert(
            "Something Went Wrong",
            "",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        })
    } else {
      var response = await fetch(imageUri);
      var blob = await response.blob();
      storage().ref(`promotions/${store.storeId}/${Date.now()}`)
        .put(blob)
        .on('state_changed',
          () => { },
          () => { },
          ((imageRes) => {
            imageRes.ref.getDownloadURL()
              .then(url => {
                const newPromo = { name, description, selectedProduct, imageUri: url, startDate, endDate, promotionType: type };
                firestore().collection('vendorStores').doc(store.storeId).collection('promotions').doc(props.route.params.promoId).update(newPromo)
                  .then(() => {

                    Alert.alert("Updation completed")
                    setUpdateLoading(false);
                  }
                  )
                  .catch(e => {
                    setUpdateLoading(false);
                    Alert.alert(
                      "Something Went Wrong",
                      "",
                      [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                      ],
                      { cancelable: false }
                    );
                  })
              })
          }))



    }
  }

  const deletePromos = async () => {
    setDeleteLoading(true);
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    console.log("This is the store inside upload: ", store);
    firestore().collection('vendorStores').doc(store.storeId).collection('promotions').doc(props.route.params.promoId).delete()
      .then(() => {
        setDeleteLoading(false);
        Alert.alert("Promotion Deleted");
        props.navigation.goBack();
      }
      )
      .catch(e => {
        setDeleteLoading(false);
        Alert.alert(
          "Something Went Wrong",
          "",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      })
  }
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
  return (
    <Screen style={styles.container}>
      {
        promotion ?

          <ScrollView style={{ padding: 10 }}>
            <AppPicker
              items={pickerItemsObj}
              onSelectItem={(txt) => setSelectedProduct(txt.label)}
              style={styles.mVertical}
              title={selectedProduct ? selectedProduct : "Select Product"} />
            {
              imageUri ?
                <TouchableOpacity onPress={handleImageUpload} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ width: 100, height: 100, borderRadius: 20 }} source={{ uri: imageUri }} />
                </TouchableOpacity> :
                <AppImageUploadButton
                  style={styles.mVertical}
                  onPress={() => {
                    handleImageUpload();
                    console.log('create promotions >>> Image Upload Button')
                  }}
                />
            }
            <AppTextInput value={name} onChangeText={(txt) => { setName(txt) }} style={styles.mVertical} placeHolder="Name" />
            <AppMultiLineInput value={description} onChangeText={(txt) => { setDescription(txt) }} style={styles.mVertical} placeholder="Description" />
            <AppPicker items={types} onSelectItem={(item) => setType(item.label)}
              style={styles.mVertical} title={type ? type : "Promotion Type"} />
            <View style={styles.timeContainer}>
              <Text style={styles.title}>Start and end date</Text>
              <View style={styles.subContainer}>
                {startDate &&
                  <AppTimePicker
                    date={startDate}
                    onPress={() => {
                      setShowStartDatePicker(true);
                      setShowEndDatePicker(false);
                    }}
                  />}
                <Text style={[styles.text, { color: colors.dark }]}>to</Text>
                {endDate && <AppTimePicker
                  date={endDate}
                  onPress={() => {
                    setShowStartDatePicker(false);
                    setShowEndDatePicker(true);
                  }}
                />}
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

            <View style={[styles.btnContainer, styles.mVertical]}>
              <AppButton
                loading={updateLoading}
                title="Update"
                style={[styles.btn, styles.btnDelete]}
                color={colors.white}
                onPress={editPromos}
              />
              <AppButton
                loading={deleteLoading}
                title="Delete"
                style={styles.btn}
                color={colors.primary}
                onPress={() => Alert.alert(
                  "Are your Sure?",
                  "you want to delete this product",
                  [
                    { text: "yes", onPress: () => deletePromos() },
                    { text: 'cancel' }
                  ],
                  { cancelable: false }
                )}
              />
            </View>
          </ScrollView>
          : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='black' />
          </View>
      }
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
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnDelete: {
    backgroundColor: '#FF4E00',
  },
  btn: {
    width: 100,
    paddingVertical: 10,
  },
  mVertical: {
    marginVertical: 10,
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
});
