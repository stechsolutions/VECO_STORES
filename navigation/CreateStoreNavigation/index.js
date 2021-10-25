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
import {IMLocalized} from '../../i18n/Localize';

const Stack = createStackNavigator();

const CreateStoreNavigation = ({changeFirstTime, firstTime, goToStart}) => (
  <Stack.Navigator
    initialRouteName="welcome"
    screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="ApplicationReview"
      initialParams={firstTime}
      options={(navigation) => ({
        title: IMLocalized('Application Review'),
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
      })}>
      {(props) => (
        <ApplicationReview {...props} changeFirstTime={changeFirstTime} />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="welcome"
      component={Welcome}
      options={(navigation) => ({
        title: IMLocalized('Welcome'),
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
      options={({navigation}) => ({
        title: IMLocalized('Create Store'),
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
    >
      {(props) => <CreateStore {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="CreateStore"
      component={CreateStore}
      options={{title: IMLocalized('Create Store')}}
    />
    <Stack.Screen
      name="createStore2"
      options={({navigation}) => ({
        title: IMLocalized('Create Store'),
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
    >
      {(props) => <CreateStore2 {...props} changeFirstTime={changeFirstTime} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default CreateStoreNavigation;
