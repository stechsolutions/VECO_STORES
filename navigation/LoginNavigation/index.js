import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingPage from '../../screens/LandingPage/landingPage';
import LoginPage from '../../screens/LoginPage/loginPage';
import Registration from '../../screens/Registration';
import Registration2 from '../../screens/Registration2';
import Registration3 from '../../screens/Registration3';
import ApplicationReview from '../../screens/ApplicationReview';
import FacebookLogin from '../../screens/FacebookLogin';
import GoogleLogin from '../../screens/Googlelogin';
import CreateStore from '../../screens/CreateStore';
import CreateStore2 from '../../screens/createStore2';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LoginManager, LoginButton, AccessToken} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../HomeNavigation/index';

const Stack = createStackNavigator();
function FacebookScreen() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="FacebookLogin">
      <Stack.Screen
        name="FacebookLogin"
        component={FacebookLogin}
        // initialParams={{ onPress: onPress }}
      />
      <Stack.Screen name="ApplicationReview" component={Home} />
    </Stack.Navigator>
  );
}

function GoogleScreen() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="GoogleLogin">
      <Stack.Screen
        name="GoogleLogin"
        component={GoogleLogin}
        // initialParams={{ onPress: onPress }}
      />
      <Stack.Screen name="ApplicationReview" component={Home} />
    </Stack.Navigator>
  );
}

const index = ({onPress, changeFirstTime}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing page"
        component={LandingPage}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Login page"
        component={LoginPage}
        initialParams={{onPress: onPress}}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      {/* <Stack.Screen
      name="ApplicationReview"
      component={ApplicationReview}
      options={(navigation) => ({
        title: '',
        headerRight: () => (
          <AntDesign
            name="poweroff"
            size={20}
            onPress={() => {
              LoginManager.logOut()
                  AsyncStorage.removeItem("user")
                  navigation.navigate('createStore')
                    // .then(() => {
                    //   goToStart();
                    // })
                
            }}
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 15,
        },
      })}
    /> */}

      {/* <Stack.Screen
      name="CreateStore"
      component={CreateStore}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Entypo name="chevron-thin-left" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Registration"
        component={Registration}
        initialParams={{onPress: onPress}}
        options={({navigation}) => ({
          title: 'Creating Account',
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={25}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="Registration2"
        component={Registration2}
        initialParams={{onPress: onPress}}
      />
      <Stack.Screen
        name="FacebookLogin"
        component={FacebookScreen}
        initialParams={{onPress: onPress}}
      />
      <Stack.Screen
        name="GoogleLogin"
        component={GoogleScreen}
        // initialParams={{ onPress: onPress }}
      />
      {/* <Stack.Screen
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
    /> */}
      <Stack.Screen
        name="Registration3"
        component={Registration3}
        initialParams={{onPress: onPress}}
      />
      <Stack.Screen
        name="CreateStore"
        component={CreateStore}
        initialParams={{onPress: onPress}}
      />
      <Stack.Screen
        name="createStore"
        component={CreateStore}
        initialParams={{onPress: onPress}}
      />
    </Stack.Navigator>
  );
};

export default index;

const styles = StyleSheet.create({});
