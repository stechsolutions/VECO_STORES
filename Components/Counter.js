import React, {Component, useState} from 'react';
import AppText from './AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Counter({navigation, count = 0, setCount}) {
  // const [count,setCount] = useState(count);
  const minus = () => {
    var newCount = count - 1;
    if (count > 0) setCount(newCount);
  };
  const plus = () => {
    var newCount = count + 1;
    setCount(newCount);
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={minus}>
        <Entypo name="minus" size={20} color={colors.secondary} />
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity onPress={plus}>
        <Entypo name="plus" size={20} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#289EC2',
  },
});
