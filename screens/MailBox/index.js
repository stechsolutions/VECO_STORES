import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AppChat from '../../Components/AppChat';
import AppMessage from '../../Components/AppMessage';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Notifi} from '../../Components/pushNotification';

const index = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [chats, setChats] = useState();
  const [empty, setEmpty] = useState();

  useEffect(() => {
    getChatRooms();
  }, []);

  const sendMessage = (id, title, message) => {
    Notifi.configure();
    Notifi.CreatChannel(id);
    Notifi.LocatlNotification(id, title, message);
  };

  const getChatRooms = async () => {
    console.log('user chatrooms');
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    var myuid = user.userId;
    console.log(myuid, 'myuid');
    var temp = [];
    firestore()
      .collection('mails')
      .where(`users.${myuid}`, '==', true)
      .onSnapshot((data) => {
        console.log(data, ' hashaksdhdkaH ajkhdahkjaH kadjhkaJHempty');

        if (data.empty) {
          setEmpty(true);
        }
        data.forEach((each) => {
          var data = each.data();
          var userId = '';
          Object.keys(data.users).map((e) => {
            if (e !== myuid) userId = e;
          });

          console.log('Inside this :', data);

          firestore()
            .collection('distributer')
            .doc(userId)
            .get()
            .then((res) => {
              var user = {...res.data(), uid: userId};

              console.log('Heheheheheh: ', user);
              firestore()
                .collection('mails')
                .doc(each.ref.id)
                .collection('messages')
                .limit(1)
                .orderBy('timestamp', 'desc')
                .onSnapshot(async (messages) => {
                  // sendMessage(
                  //   userId,
                  //   'Message',
                  //   `You have recevied a mail from ${user.businessName}`,
                  // );

                  // temp = [];
                  messages.forEach(async (e) => {
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
                    console.log('====================================');
                    console.log('Chat:', obj);
                    console.log('====================================');
                  });
                  setChats([...temp]);
                  await AsyncStorage.setItem('chatData', JSON.stringify(temp));
                });
            });
        });
      });
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.mailHeading}>
        <Text>Mails</Text>
        {true && <Text>{chats?.length}</Text>}
      </View>
      {empty && (
        <Text style={{marginTop: 200, fontSize: 16, textAlign: 'center'}}>
          No Messages
        </Text>
      )}
      <FlatList
        data={chats}
        // data={initialMessages}
        keyExtractor={(message) => message.chatId.toString()}
        renderItem={({item}) => (
          <AppChat
            title={item.user.businessName}
            // title={item.title}
            subtitle={item.lastMessage}
            image={{uri: item.user.photoLogoUrl}}
            style={{marginHorizontal: 0}}
            // count={item.count}
            onPress={() => navigation.navigate('Mail Open', {chatData: item})}
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
