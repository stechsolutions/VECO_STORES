import React, {useEffect, useState} from 'react';
import AppText from '../../Components/AppText';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import AppMessage from '../../Components/AppMessage';
import AppMessageInput from '../../Components/AppMessageInput';
import Screen from '../../Components/Screen';
import Separator from '../../Components/Separator';
import colors from '../../config/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {sendPushNotification} from '../../Components/PushNotifications';

const messages1 = [
  {
    id: 1,
    message: 'I just have a complaint about somenthing...',
    time: '10:00 AM',
    user: false,
  },
  {
    id: 2,
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati neque fugiat est maiores corrupti distinctio nostrum quos vero explicabo consectetur culpa numquam, laudantium facilis quae nisi inventore suscipit? Expedita, ea?',
    time: '10:00 AM',
    user: false,
  },
  {id: 3, message: 'Just fixed', time: '10:00 AM', user: true},
  {id: 4, message: 'Check it out...', time: '10:00 AM', user: true},
  {
    id: 5,
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati neque fugiat est maiores corrupti distinctio nostrum quos vero explicabo consectetur culpa numquam, laudantium facilis quae nisi inventore suscipit? Expedita, ea?',
    time: '10:00 AM',
    user: true,
  },
  {id: 6, message: 'How is it now?', time: '10:00 AM', user: false},
  {id: 7, message: 'You checked it?', time: '10:00 AM', user: false},
  {id: 8, message: "I'm working on it", time: '10:00 AM', user: true},
  {id: 9, message: 'Now check', time: '10:00 AM', user: true},
  {
    id: 10,
    message: 'Yeah Its working fine 👍👍👍',
    time: '10:00 AM',
    user: false,
  },
  {
    id: 11,
    message: 'Yeah Its working fine 👍👍👍',
    time: '10:00 AM',
    user: false,
  },
];

const index = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatRoomDetails, setChatRoomDetails] = useState();
  const [text, setText] = useState('');
  useEffect(() => {
    const {chatData} = route.params;
    setChatRoomDetails(chatData);

    firestore()
      .collection('mails')
      .doc(chatData.chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((data) => {
        let temp = [];
        data.forEach((each) => {
          temp.push({...each.data(), id: each.ref.id});
        });
        // console.log(temp);
        setMessages(temp);
      });
  }, []);

  const getTime = (timestamp) => {
    const date = timestamp.toDate();
    // console.log(date.getHours());
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const sendMessage = async () => {
    // const {chatData} = route.params;
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    console.log('text >>>', text);
    console.log(firestore.Timestamp.now());
    if (text) {
      firestore()
        .collection('mails')
        .doc(chatRoomDetails.chatId)
        .collection('messages')
        .add({
          message: text,
          userId: user.userId,
          timestamp: firestore.Timestamp.now(),
        });
      setText('');

      firestore()
        .collection('distributer')
        .doc(chatRoomDetails.user.key)
        .get()
        .then((result) => {
          try {
            const {notificationIds} = result.data();

            if (notificationIds.length > 0) {
              notificationIds.forEach((notificationId) => {
                console.log('sending notification', notificationId);
                sendPushNotification(
                  notificationId,
                  'Mail Received',
                  'You have receviced a Mail.',
                );
              });
            }
          } catch (e) {
            console.log('Error Notification: ', e);
          }
        });
    }
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.image}
          source={chatRoomDetails && {uri: chatRoomDetails.user?.photoLogoUrl}}
        />
        <Text style={styles.title}>
          {chatRoomDetails && chatRoomDetails.user?.businessName}
          {/* Name */}
        </Text>
        <Separator />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({item}) => (
            <AppMessage
              message={item.message}
              // time={`${new Date(item.timestamp).getHours().toString()}:${new Date(item.timestamp).getMinutes().toString()}`}
              time={getTime(item.timestamp)}
              user={item.user}
              user={item.userId === chatRoomDetails.myuid}
              // key={item.id.toString()}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Refreshing');
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          marginBottom: 5,
          padding: 10,
        }}>
        <AppMessageInput
          value={text}
          onChange={(e) => setText(e)}
          onSend={() => sendMessage()}
          onOption={() => console.log('Option Tap')}
        />
      </View>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  userContainer: {
    alignItems: 'center',
    padding: '10%',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
  },
});
