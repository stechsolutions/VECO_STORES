import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Screen from '../../Components/Screen';
import AppImageUploadButton from '../../Components/AppImageUploadButton';
import colors from '../../config/colors';
import AppAttachFileButton from '../../Components/AppAttachFileButton';
import AppMultiLineInput from '../../Components/AppMultiLineInput';
import AppButton from '../../Components/AppButton';
import ImagePicker from 'react-native-image-picker';

const index = () => {
  const [image, setImage] = useState();

  const handleImageUpload = () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          noData: true,
        },
        (response) => {
          console.log(response);
          response && setImage(response);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen style={styles.container}>
      <ScrollView style={{padding: 10}}>
        <AppImageUploadButton
          style={[styles.imageUploadBtn, styles.mVertical]}
          title="Import Product Inventory Images"
          onPress={() => {
            handleImageUpload();
            console.log('Import Product Inventory >>>> Image Upload');
          }}
        />
        <AppAttachFileButton
          style={styles.mVertical}
          title="Upload Inventory (xls)"
          onPress={() =>
            console.log('Import Product Inventory >>> Attach file')
          }
        />
        <AppMultiLineInput
          style={styles.mVertical}
          placeholder="Product Information"
        />
        <AppButton
          title="UPLOAD"
          color={colors.primary}
          style={[styles.btn, styles.mVertical]}
          onPress={console.log('Import Product Information >>> Upload')}
        />
        {/* Remove this code */}
        {image && (
          <Image
            source={{uri: image.uri, width: 100, height: 100}}
            width={100}
            height={100}
          />
        )}
      </ScrollView>
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
    padding: 10,
  },
  imageUploadBtn: {
    width: '100%',
    paddingVertical: 20,
  },
  mVertical: {
    marginVertical: 10,
  },
});
