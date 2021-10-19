import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StartNavigation from './navigation/StartNavigation';
// import Welcome from './screens/Welcome';
// import Stat from './screens/Statistic/Stat';
import SearchProduct from './screens/searchProducts/index';
import {
  View,
  Alert,
  ActivityIndicator,
  LogBox,
  YellowBox,
  PermissionsAndroid,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import colors from './config/colors';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your storage.',
          // buttonNeutral: 'Ask Me Later',
          // buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoading(false);
      } else {
        console.log('Camera permission denied');
        Alert.alert(
          'Information',
          'Please allow storage permission to continue.',
          [{text: 'OK', onPress: () => requestStoragePermission()}],
        );
        
      }
    } catch (err) {
      console.warn(err);
    }
  };

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  if (loading)
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  // PushNotification()

  return (
    <>
      <NavigationContainer>
        <StartNavigation />
      </NavigationContainer>
      {/* <EditProduct/> */}
      {/* <SearchProduct/> */}
    </>
  );
};
export default App;
