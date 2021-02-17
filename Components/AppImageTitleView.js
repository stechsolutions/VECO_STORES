import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Entypo from 'react-native-vector-icons/Entypo'
const AppImageTitleView = ({ image, title, subTitle, onPress }) => {
  return (
    <View style={styles.userContainer}>
      {
        !image ?
          <TouchableOpacity onPress={onPress} style={styles.addProfileView}>
            <Entypo name='add-user' size={40} />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={onPress} style={styles.addProfileView}>
            {/* <Image style={styles.image} source={{ uri: image }} /> */}
            <Image style={styles.image} source={image} />
          </TouchableOpacity>
      }
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
};

export default AppImageTitleView;

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    padding: '10%',
    width: '100%',
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 11,
  },
  addProfileView: {
    backgroundColor: 'white',
    width: 100, height: 100,
    borderRadius: 50,
    justifyContent: 'center', alignItems: 'center',
    elevation: 10,
  }
});
