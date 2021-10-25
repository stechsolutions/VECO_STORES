import React from 'react';
import AppText from './AppText';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import colors from '../config/colors';
import AppButton from './AppButton';

const HomeCardMain = ({name, title, subtitle, buttonTitle, onPress, image}) => {
  return (
    <View style={styles.homeCard}>
      {image ? (
        <Image style={styles.image} source={{uri: image}} />
      ) : (
        <EvilIcon name={name} size={16} color={colors.medium} />
      )}
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subTitle}>{subtitle}</AppText>
      <AppButton title={buttonTitle} onPress={onPress} />
    </View>
  );
};

export default HomeCardMain;

const styles = StyleSheet.create({
  homeCard: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 10,
    color: colors.medium,
    marginBottom: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});
