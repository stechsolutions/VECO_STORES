import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialMessages = [
  {
    id: 1,
    title: 'Shawn Medly',
    description: 'Hey! Is this item still available?',
    image: require('../../assets/images/mosh.jpg'),
    count: 2,
  },
  {
    id: 2,
    title: 'David Blex',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 3,
    title: 'Lisa Psixa',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 3,
  },
  {
    id: 4,
    title: 'David Blex',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 5,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 6,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 5,
  },
  {
    id: 7,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 8,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 9,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 10,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 11,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 12,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
  {
    id: 13,
    title: 'Ashhar Imam',
    description:
      "I'm interested in this item. When will you be able to post it?",
    image: require('../../assets/images/mosh.jpg'),
    count: 0,
  },
];

const index = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const [chats, setChats] = useState();
  const [empty, setEmpty] = useState();

  useEffect(() => {

    getChatRooms();
  }, []);

  const getChatRooms = async () => {
    console.log("user chatrooms")
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    var myuid = user.userId;
    console.log(myuid, 'myuid');
    var temp = [];
    firestore()
      .collection('mails')
      .where(`users.${myuid}`, '==', true)
      .onSnapshot((data) => {
        console.log(data, 'empty');
        if (data.empty) {
          setEmpty(true);
        }
        data.forEach((each) => {
          var data = each.data();
          var userId = '';
          Object.keys(data.users).map((e) => {
            if (e !== myuid) userId = e;
          });
          firestore()
            .collection('distributer')
            .doc(userId)
            .get()
            .then((res) => {
              var user = { ...res.data(), uid: userId };
              firestore()
                .collection('mails')
                .doc(each.ref.id)
                .collection('messages')
                .limit(1)
                .orderBy('timestamp', 'desc')
                .onSnapshot((messages) => {
                  temp = [];
                  messages.forEach((e) => {
                    var lastMessage = e.data();
                    lastMessage = lastMessage.message;
                    var obj = {
                      ...each.data(),
                      chatId: each.ref.id,
                      user,
                      lastMessage,
                      myuid,
                    };
                    temp.push(obj);
                    setChats(temp);
                  });
                });
            });
        });
      });
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.mailHeading}>
        <Text>Mails</Text>
        {true && <Text>1 new</Text>}
      </View>
      {empty && <Text style={{ marginTop: 200, fontSize: 16, textAlign: 'center' }}>No Messages</Text>}
      <FlatList
        data={chats}
        // data={initialMessages}
        keyExtractor={(message) => message.chatId.toString()}
        renderItem={({ item }) => (
          <AppChat
            title={item.user.businessName}
            // title={item.title}
            subtitle={item.lastMessage}
            image={{ uri: item.user.photoLogoUrl }}
            style={{ marginHorizontal: 0 }}
            // count={item.count}
            onPress={() => navigation.navigate('Mail Open', { chatData: item })}
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
  mailHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
