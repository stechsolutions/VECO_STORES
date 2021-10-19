import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from '../HomeNavigation';
import LoginNavigation from '../LoginNavigation';
import {StyleSheet, Text, View} from 'react-native';
import CreateStore from '../../screens/CreateStore/index';
import Welcome from '../../screens/Welcome/index';
import CreateStoreNavigation from '../CreateStoreNavigation/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firstTime, setFirstTime] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const tempUser = await AsyncStorage.getItem('user');
    if (tempUser) {
      var tempFirebaseUser = JSON.parse(tempUser);
      console.log(tempFirebaseUser, 'firebaseUser');
      if (tempFirebaseUser) {
        setFirebaseUser(tempFirebaseUser);
        setFirstTime(tempFirebaseUser.firstTime);
      }
    }
  };

  return (
    <>
      {console.log('USER >>>', user)}
      {user || firebaseUser ? (
        (firebaseUser && !firebaseUser.firstTime) || !firstTime ? (
          <HomeNavigation
            goToStart={() => {
              console.log('logging Out');
              setFirebaseUser(null);
              setUser(null);
            }}
          />
        ) : (
          <CreateStoreNavigation
            goToStart={() => {
              console.log('logging Out');
              setFirebaseUser(null);
              setUser(null);
            }}
            firstTime={firstTime}
            changeFirstTime={() => setFirstTime(false)}
          />
        )
      ) : (
        <LoginNavigation
          onPress={(firstTime) => {
            setUser('User');
            setFirstTime(firstTime);
          }}
        />
      )}
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
