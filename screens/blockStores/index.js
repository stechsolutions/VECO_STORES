import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

const initialMessages = [
  {
    id: 1,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 2,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 3,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 4,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 5,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 6,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 7,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 8,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 9,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 10,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 11,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 12,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 13,
    title: 'Store Name',

    image: require('../../assets/dress.jpg'),
  },
];

const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState(initialMessages);

  return (
    <Screen style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.title}
            subtitle={item.subTitle}
            image={item.image}
            btnText="Edit"
            btnPress={() => navigation.navigate('Update / delete store')}
            onPress={() => console.log('Message selected', item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          console.log('Refreshing');
        }}
      />
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
});
