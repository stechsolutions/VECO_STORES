import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useState, useEffect, useRef, useContext} from 'react';
import AppText from './AppText';
import {Text, View, Button, Platform, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function PushNotification(user) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      AsyncStorage.getItem('user').then((response) => {
        const jsonResponse = JSON.parse(response);
        console.log('Temporary User', jsonResponse);

        firestore()
          .collection('vendors')
          .doc(jsonResponse.userId)
          .get()
          .then((response) => {
            const data = response.data();

            if (data?.notificationIds === undefined) {
              firestore()
                .collection('vendors')
                .doc(jsonResponse.userId)
                .set(
                  {
                    notificationIds: firestore.FieldValue.arrayUnion(token),
                  },
                  {merge: true},
                );
            }

            if (!data?.notificationIds.includes(token)) {
              firestore()
                .collection('vendors')
                .doc(jsonResponse.userId)
                .update({
                  notificationIds: firestore.FieldValue.arrayUnion(token),
                });
            }
          });
      });
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // return (
  // 	<View
  // 		style={{
  // 			flex: 1,
  // 			alignItems: "center",
  // 			justifyContent: "space-around",
  // 		}}
  // 	>
  // 		<Text>Your expo push token: {expoPushToken}</Text>
  // 		<View style={{ alignItems: "center", justifyContent: "center" }}>
  // 			<Text>
  // 				Title: {notification && notification.request.content.title}{" "}
  // 			</Text>
  // 			<Text>Body: {notification && notification.request.content.body}</Text>
  // 			<Text>
  // 				Data:{" "}
  // 				{notification && JSON.stringify(notification.request.content.data)}
  // 			</Text>
  // 		</View>
  // 		<Button
  // 			title="Press to Send Notification"
  // 			onPress={async () => {
  // 				await sendPushNotification(expoPushToken);
  // 			}}
  // 		/>
  // 	</View>
  // );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export {PushNotification, sendPushNotification};

async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: {},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: '@shahzaib78631/marketplace',
      })
    ).data;
    console.log('Your Expo Token: ', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
