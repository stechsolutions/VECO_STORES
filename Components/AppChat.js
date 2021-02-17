import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, Text,TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../config/colors';
import AppTextButton from './AppTextButton';

const AppChat = ({
  title,
  subtitle,
  image,
  count = 0,
  variant,
  onPress,
  btnText,
  btnPress,
  approve = false,
  tools, style,
  onDelete,onEdit
}) => {
  return (
    <TouchableHighlight underlayColor={colors.white} onPress={onPress}>
      <View style={[styles.container, style]}>
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: !variant
                    ? colors.dark
                    : variant === 'success'
                      ? colors.success
                      : variant === 'failure'
                        ? colors.failure
                        : variant === 'pending'
                          ? colors.medium
                          : colors.dark,
                },
              ]}
              numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        {
          tools &&
          <View style={styles.iconContainer}>
            <TouchableOpacity delayPressIn={'300ms'} onPress={onDelete ? onDelete : ()=>{}}>
              <MaterialIcons
                color={'black'}
                size={35}
                onPress={approve.disapprove}
                name="delete-forever"
                style={styles.crossIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={'300ms'} onPress={onEdit ? onEdit : ()=>{} }>
              <SimpleLineIcons
                onPress={approve.approve}
                color={'black'}
                size={25}
                name="note"
                style={[styles.checkIcon, { paddingLeft: 5 }]}
              />
            </TouchableOpacity>
          </View>
        }
        {count !== 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
        {btnText && <AppTextButton style={{ marginHorizontal: 10 }} title={btnText} onPress={btnPress} />}
        {approve && (
          <View style={styles.iconContainer}>
            <Entypo
              color={colors.failure}
              size={35}
              onPress={approve.disapprove}
              name="circle-with-cross"
              style={styles.crossIcon}
            />
            <AntDesign
              onPress={approve.approve}
              color={colors.success}
              size={30}
              name="checkcircle"
              style={[styles.checkIcon, { paddingLeft: 5 }]}
            />
          </View>
        )}

      </View>
    </TouchableHighlight>
  );
};

export default AppChat;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    margin: 2,
    marginHorizontal: '10%',
  },
  countContainer: {
    margin: 5,
    padding: 2,
    paddingHorizontal: 7,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  countText: {
    color: colors.white,
    fontSize: 12,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 35,
  },
  subtitle: {
    fontSize: 12,
  },
  title: {
    fontWeight: '500',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
