import React, {useState} from 'react';
import AppText from '../../Components/AppText';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

const moreMessages = [
  {
    id: 1,
    title: 'Product Name',
    subTitle: 'Approved',

    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 8,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 9,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 10,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 11,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 12,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
  {
    id: 13,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/images/Spray.jpg'),
  },
];

const lessMessages = [
  {
    id: 1,
    title: 'Product Name',
    subTitle: 'Approved',

    image: require('../../assets/dress.jpg'),
  },
  {
    id: 2,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 3,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 4,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 5,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 6,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
  {
    id: 7,
    title: 'Product Name',
    subTitle: 'Approved',
    image: require('../../assets/dress.jpg'),
  },
];

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [moreMessage, setMoreMessage] = useState(moreMessages);
  const [lessMessage, setLessMessage] = useState(lessMessages);
  const [tab, setTab] = useState('more');

  return (
    <Screen style={styles.container}>
      {console.log('tab>>>', tab)}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('more')}>
          <AppText
            style={[styles.text, tab === 'more' && {color: colors.primary}]}>
            Max Price
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setTab('less')}>
          <AppText
            style={[styles.text, tab === 'less' && {color: colors.primary}]}>
            Min Price
          </AppText>
        </TouchableOpacity>
      </View>
      {tab === 'more' && (
        <FlatList
          data={moreMessages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.title}
              image={item.image}
              btnText="See details"
              variant="success"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      )}
      {tab === 'less' && (
        <FlatList
          data={lessMessage}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({item}) => (
            <AppChat
              title={item.title}
              image={item.image}
              btnText="See details"
              variant="success"
              btnPress={() => console.log('See Products >>> Button Text Press')}
              onPress={() => console.log('Message selected', item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      )}
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontSize: 16,
    color: colors.medium,
  },
});
