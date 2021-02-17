import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../../screens/LandingPage/landingPage';
import LoginPage from '../../screens/LoginPage/loginPage';
import Registration from '../../screens/Registration';
import Registration2 from '../../screens/Registration2';
import Registration3 from '../../screens/Registration3';
import CreateStore from '../../screens/CreateStore';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const index = ({ onPress }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing page" component={LandingPage}  options={({ navigation }) => ({
         headerShown:false
        })}/>
      <Stack.Screen
        name="Login page"
        component={LoginPage}
        initialParams={{ onPress: onPress }}
        options={({ navigation }) => ({
         headerShown:false
        })}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        initialParams={{ onPress: onPress }}
        options={({ navigation }) => ({
          title:'Creating Account',
          headerLeft: () => (
            <AntDesign name="arrowleft" size={25} onPress={() => navigation.goBack()} />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerTitleAlign:'center',
        })}
      />
      <Stack.Screen
        name="Registration2"
        component={Registration2}
        initialParams={{ onPress: onPress }}
      />
      <Stack.Screen
        name="Registration3"
        component={Registration3}
        initialParams={{ onPress: onPress }}
      />
      <Stack.Screen
        name="CreateStore"
        component={CreateStore}
        initialParams={{ onPress: onPress }}
      />
    </Stack.Navigator>
  );
};

export default index;

const styles = StyleSheet.create({});
