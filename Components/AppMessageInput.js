import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';

const AppMessageInput = ({value, onChange, onSend, onOption}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={value}
        onChangeText={(text) => onChange(text)}
        placeholder="Type your message here"
      />
      <MaterialIcon
        name="more-vert"
        size={30}
        color={colors.medium}
        onPress={onOption}
      />
      <TouchableOpacity onPress={onSend}>
        <MaterialCommunityIcon name="send" size={25} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default AppMessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.medium,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputBox: {
    flex: 1,
  },
});
