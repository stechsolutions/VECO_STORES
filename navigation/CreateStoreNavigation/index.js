import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ApplicationReview from '../../screens/ApplicationReview';
import Welcome from '../../screens/Welcome';
import CreateStore from '../../screens/CreateStore';
import CreateStore2 from '../../screens/createStore2';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const CreateStoreNavigation = ({changeFirstTime, goToStart}) => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="ApplicationReview"
      component={ApplicationReview}
      options={(navigation) => ({
        title: '',
        headerRight: () => (
          <AntDesign
            name="poweroff"
            size={20}
            onPress={() => {
              goToStart();
            }}
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 15,
        },
      })}
    />
    <Stack.Screen
      name="welcome"
      component={Welcome}
      options={(navigation) => ({
        title: '',
        headerRight: () => (
          <AntDesign
            name="poweroff"
            size={20}
            onPress={() => {
              goToStart();
              // auth().signOut()
              //   .then(() => {
              //     AsyncStorage.removeItem("user")
              //       .then(async () => {
              //         await AsyncStorage.removeItem('store');
              //         goToStart();
              //       })
              //   })
            }}
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 15,
        },
        headerLeft: () => {},
      })}
    />
    <Stack.Screen
      name="createStore"
      component={(props) => <CreateStore {...props} />}
      options={({navigation}) => ({
        title: '',
        headerLeft: () => (
          <Entypo
            name="chevron-thin-left"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
      //   initialParams={{changeFirstTime:changeFirstTime}}
    />
    <Stack.Screen
      name="createStore2"
      component={(props) => (
        <CreateStore2 {...props} changeFirstTime={changeFirstTime} />
      )}
      options={({navigation}) => ({
        title: '',
        headerLeft: () => (
          <Entypo
            name="chevron-thin-left"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
      //   initialParams={{changeFirstTime:changeFirstTime}}
    />
  </Stack.Navigator>
);

export default CreateStoreNavigation;
