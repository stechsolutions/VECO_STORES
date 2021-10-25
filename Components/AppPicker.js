import React, {useState} from 'react';
import AppText from './AppText';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';
import AppButton from './AppButton';
import AppPickerItem from './AppPickerItem';
import Screen from './Screen';

const ListEmptyComponent = () => (
  <Text style={{color: colors.primary, fontSize: 16, textAlign: 'center'}}>
    No items in list
  </Text>
);

const AppPicker = ({
  color = colors.dark,
  items,
  onSelectItem,
  selectedItem,
  style,
  title,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowModal(!showModal)}>
        <View style={[styles.container, style]}>
          <AppText style={[styles.title, {color: color}]}>
            {selectedItem ? selectedItem.label : title}
          </AppText>
          <Entypo name="chevron-down" size={18} color={color} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={showModal} animationType="slide">
        <Screen>
          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            maxToRenderPerBatch={10}
            data={items}
            keyExtractor={(item) => item.value && item.value.toString()}
            renderItem={({item}) => (
              <AppPickerItem
                key={item.id || item.productId}
                title={item.label}
                onPress={() => {
                  if (selectedItem === item) {
                    onSelectItem('');
                  } else {
                    onSelectItem(item);
                  }
                  setShowModal(false);
                }}
              />
            )}
          />
          <AppButton
            style={styles.btn}
            color={colors.primary}
            title="Close"
            onPress={() => setShowModal(false)}
          />
        </Screen>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btn: {
    padding: 15,
    marginBottom: 20,
  },
});
