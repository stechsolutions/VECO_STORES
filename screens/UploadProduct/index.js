import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import Screen from '../../Components/Screen';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import colors from '../../config/colors';
import AppButton from '../../Components/AppButton';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTimePicker from '../../Components/AppTimePicker';
import AntDesign from 'react-native-vector-icons/AntDesign'
// import { TouchableOpacity } from 'react-native-gesture-handler';
const productTypes = [{ label: 'Type 1' }, { label: 'Type 2' }]
const priceTypes = [{ label: 'type 1', id: 1 }, { label: 'type 2', id: 2 }];
const colorsArr = [{ label: 'red', id: 1 }, { label: 'blue', id: 2 }];
const sizes = [{ label: 'large', id: 1 }, { label: 'medium', id: 1 }, { label: 'small', id: 1 }]
const index = ({navigation}) => {

  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [total, setTotal] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState();
  const [presentation, setPresentation] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [unit, setUnit] = useState(false);
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const onStartDateChange = (event, selectedValue) => {
    console.log(selectedValue, 'selected vale');
    setStartDate(selectedValue)
    setShowStartDatePicker(false);
  };
  const handleImageUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log("THIS IS THE IMAGE : ", response.uri)
          response && setImage(response.uri);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const pickImageHandler = () => {
    setShowModal(false);
    ImagePicker.showImagePicker({
      title: "Pick an Image",
      maxWidth: 800, maxHeight: 600
    }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        console.log(res.uri, 'uri');
        setImage(res.uri);
      }
    });
  }


  const uploadProductFunc = async () => {
    setLoading(true);
    var store = JSON.parse(await AsyncStorage.getItem('store'));
    var response = await fetch(image);
    var blob = await response.blob();
    storage().ref(`products/${store.storeId}/${Date.now()}`)
      .put(blob)
      .on('state_changed',
        () => { },
        () => { },
        ((imageRes) => {
          imageRes.ref.getDownloadURL()
            .then(url => {
              const product = {
                productType, productName, productPrice, image: url, total, price, color,
                size, shortDescription, longDescription, unit, presentation, expiryDate: startDate,
                comment1, comment2, available: total
              };
              firestore().collection('vendorStores').doc(store.storeId).collection('products').add(product)
                .then(res => {
                  setLoading(false);
                  Alert.alert(
                    "Product Created",
                    "Product has been created successfully",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ],
                    { cancelable: false }
                  );
                  console.log(res);
                })
                .catch(e => {
                  setLoading(false);
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
  const setPhoto = ()=>{
    setImage('../../assets/images/Spray.jpg');
    setShowGallery(false);
  }
  return (
    <Screen style={styles.container}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {image ?
          <TouchableOpacity onPress={()=>setShowModal(true)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{uri:image}} style={{ width: 100, height: 100, borderRadius: 20 }} />
          </TouchableOpacity>
          : <AppImageUploadButton
            style={[styles.imageUploadBtn, styles.mVertical]}
            title="Upload Product Picture"
            onPress={() => {
              setShowModal(true)
              console.log('Import Product Inventory >>>> Image Upload');
            }}
          />
        }
        <AppPicker items={productTypes} style={styles.mVertical} title={productType ? productType : 'Select Item'} value={productType} onSelectItem={(txt) => { setProductType(txt.label) }} />
        <AppTextInput
          placeHolder="Product Name"
          style={[{ backgroundColor: colors.white }, styles.mVertical]}
          value={productName} onChangeText={(txt) => { setProductName(txt) }}
        />
        <AppTextInput
          placeHolder="Product Price"
          style={[{ backgroundColor: colors.white }, styles.mVertical]}
          value={productPrice} onChangeText={(txt) => { setProductPrice(txt) }}
        />
        <AppTextInput
          placeHolder="Presentation"
          style={[{ backgroundColor: colors.white }, styles.mVertical]}
          value={presentation} onChangeText={(txt) => { setPresentation(txt) }}
        />
        <AppTextInput
          placeHolder="Unit"
          style={[{ backgroundColor: colors.white }, styles.mVertical]}
          value={unit} onChangeText={(txt) => { setUnit(txt) }}
        />
        <AppTextInput
          placeHolder="Comment 1"
          style={[{ backgroundColor: colors.white }, styles.mVertical]}
          value={comment1} onChangeText={(txt) => { setComment1(txt) }}
        />
        <AppTextInput
          placeHolder="Comment 2"
          style={[{ backgroundColor: colors.white }, styles.mVertical]}
          value={comment2} onChangeText={(txt) => { setComment2(txt) }}
        />
        <View style={styles.subContainer}>
          <Text style={styles.title}>Set Expiry Date</Text>
          <View style={styles.timeContainer}>
            <AppTimePicker
              date={startDate ? startDate : new Date()}
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
            value={startDate ? startDate : new Date()}
            onChange={onStartDateChange}
            // onChange={(date) => onStartDateChange(date)}
          />
        )}
        <View
          style={[
            { flexDirection: 'row', justifyContent: 'space-evenly' },
            styles.mVertical,
          ]}>
          <AppTextInput
            style={[
              { width: '50%', backgroundColor: colors.white, marginRight: 5 },
            ]}
            placeHolder="Total Available"
            value={total} onChangeText={(txt) => { setTotal(txt) }}
          />
          <AppPicker
            items={priceTypes}
            style={[
              { width: '50%', backgroundColor: colors.white, marginLeft: 5 },
            ]}
            color={colors.dark}
            title={price ? price : "Price Type"}
            value={price} onSelectItem={(txt) => { setPrice(txt.label) }}
          />
        </View>
        <View
          style={[
            { flexDirection: 'row', justifyContent: 'space-evenly' },
            styles.mVertical,
          ]}>
          <AppPicker
            items={colorsArr}
            style={[
              { width: '50%', backgroundColor: colors.white, marginRight: 5 },
            ]}
            color={colors.dark}
            title={color ? color : "Color"}
            value={color} onSelectItem={(txt) => { setColor(txt.label) }}
          />
          <AppPicker
            items={sizes}
            style={[
              { width: '50%', backgroundColor: colors.white, marginLeft: 5 },
            ]}
            color={colors.dark}
            title={size ? size : "Size"}
            value={size} onSelectItem={(txt) => { setSize(txt.label) }}
          />
        </View>
        <AppTextInput
          style={styles.mVertical}
          placeHolder="Short Description"
          value={shortDescription} onChangeText={(txt) => { setShortDescription(txt) }}
        />
        <AppTextInput style={styles.mVertical} placeHolder="Long Description" value={longDescription} onChangeText={(txt) => { setLongDescription(txt) }} />
        <AppButton
          disabled={
            !image || !productType || !productPrice || !price
            || !color || !size || !shortDescription || !longDescription || !productName
            || !unit || !presentation || !comment1 || !comment2 || !startDate
          }
          loading={loading}
          title="UPLOAD"
          style={[styles.btn, styles.mVertical]}
          color={colors.primary}
          onPress={uploadProductFunc}
        />
      </ScrollView>
      <Modal transparent style={styles.modal} visible={showModal} animationType="slide">
        <View style={styles.modalView}>
          <TouchableOpacity delayPressIn="300ms" onPress={()=>setShowModal(false)} style={{flex:0.1,width:'100%',alignItems:'flex-end',justifyContent:'center'}}>
            <AntDesign size={30} name='close' />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageHandler} style={styles.modalItem}>
            <Text style={styles.modalItemText}> From Phone </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            setShowModal(false);
            setShowGallery(true);
          }} style={styles.modalItem}>
            <Text style={styles.modalItemText}> From Distributor's Gallery  </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal style={styles.modal} visible={showGallery} animationType="slide">
        <View style={styles.galleryHead}>
          <Text style={styles.galleryHeadText}>Select Photo</Text>
        </View>
        <ScrollView style={{ flex: 0.8 }}>
          <View style={styles.galleryView}>
            <Text>No Photo</Text>
            {/* <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setPhoto()} style={styles.imageView}>
              <Image style={styles.image} source={require('../../assets/images/Spray.jpg')} />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <AppButton
            style={styles.modalBtn}
            color={colors.primary}
            title="Cancel"
            onPress={()=>setShowGallery(false)}
          />
        </View>
      </Modal>
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
  btn: {
    width: '100%',
    padding: 15,
    marginBottom: 100,
  },
  imageUploadBtn: {
    width: '100%',
  },
  mVertical: {
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // upload modal style
  modal: {
    flex: 1,
  },
  modalView: {
    marginTop: '50%',
    borderRadius: 20,
    marginHorizontal: 40,
    backgroundColor: 'white',
    height: '30%',
    elevation: 10,
    padding: 20, justifyContent: 'center', alignItems: 'center'
  },
  modalItem: {
    margin: 10, padding: 10, borderBottomWidth: 0.5, width: '90%'
  },
  modalItemText: {
    color: colors.primary, fontSize: 16, textAlign: 'center'
  },
  //upload modal style ends

  //distributor gallery starts
  galleryHead: {
    flex: 0.1,
    justifyContent: 'center', alignItems: 'center',
    padding: 10,
  },
  galleryHeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,

  },
  galleryView: {
    margin: 20,
    flex: 0.8, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'
  },
  imageView: {
    width: 150,
    height: 150,
    margin: 5,
  },
  image: {
    width: '100%', height: '100%', resizeMode: "cover"
  },
  btnView:{
    flex:0.15,
  },
  modalBtn: {
    flex: 1,
    padding: 15,
    margin: 15,
  },
});
