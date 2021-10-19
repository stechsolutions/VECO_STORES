/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Notifi} from './Components/pushNotification';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import {name as appName} from './app.json';
console.log(`${appName}`, '1111');

const sendMessage = (id, title, message) => {
  Notifi.configure();
  Notifi.CreatChannel(id);
  Notifi.LocatlNotification(id, title, message);
};

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(remoteMessage);
  sendMessage(
    `default`,
    `${remoteMessage.data.title}`,
    `${remoteMessage.data.message}`,
  );
});

AppRegistry.registerComponent(appName, () => App);
