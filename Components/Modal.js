import React, {Component, useState} from 'react';
import AppText from './AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default function MyModal({
  navigation,
  color,
  onClose,
  style,
  visible,
  children,
}) {
  return (
    <Modal style={style} visible={visible} transparent animationType="slide">
      <View style={styles.whiteBg}>
        <View style={styles.modalView}>
          <TouchableOpacity
            delayPressIn={'300ms'}
            onPress={onClose}
            style={styles.closeView}>
            <AntDesign
              style={{backgroundColor: 'white', borderRadius: 50}}
              name="closecircle"
              color={'#253370'}
              size={40}
            />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  whiteBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    // height:'50%',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
  },
  closeView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: -15,
    right: -15,
  },
});
