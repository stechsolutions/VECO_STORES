import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigation from '../HomeNavigation';
import LoginNavigation from '../LoginNavigation';
import { StyleSheet, Text, View } from 'react-native';
import CreateStore from '../../screens/CreateStore/index'
import Welcome from '../../screens/Welcome/index'
import CreateStoreNavigation from '../CreateStoreNavigation/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        var firebaseUser = JSON.parse(user);
        console.log(firebaseUser, 'firebaseUser')
        if (firebaseUser) {
          setFirebaseUser(firebaseUser);
          setFirstTime(firebaseUser.firstTime);
        }
      })
  }, [])
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firstTime, setFirstTime] = useState(null);

  return (
    <>
      {console.log('USER >>>', user)}
      {user || firebaseUser ? (
        ((firebaseUser && !(firebaseUser.firstTime)) || !firstTime) ?
          <HomeNavigation goToStart={() => {
            console.log('logging Out')
            setFirebaseUser(null)
            setUser(null);
          }} />
          : <CreateStoreNavigation goToStart={() => {
            console.log('logging Out')
            setFirebaseUser(null)
            setUser(null);
          }}
            changeFirstTime={() => setFirstTime(false)} />
      ) : (
          <LoginNavigation onPress={(firstTime) => {
            setUser('User')
            setFirstTime(firstTime)
          }} />
        )}
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
