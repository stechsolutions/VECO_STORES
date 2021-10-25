import React, {Component, useEffect, useState, useRef} from 'react';
import AppText from '../../Components/AppText';
import {ScrollView, View, Text, Image, Dimensions, Alert} from 'react-native';
import AppButton from '../../Components/AppButton';
import colors from '../../config/colors';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../purchaseOrders/style';
import {LoginManager, LoginButton, AccessToken} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const {width: WIDTH} = Dimensions.get('window');
const LoginPage = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const fbBtn = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(async (data) => {
            console.log('fghfgh', data.accessToken.toString());
            // await auth().setPersistence(auth.Auth.Persistence.LOCAL);
            const credential = await auth.FacebookAuthProvider.credential(
              data.accessToken.toString(),
            );
            console.log(credential);
            // auth().signInWithCredential(facebookCredential);
            const facebookProfileData = await auth().signInWithCredential(
              credential,
            );
            console.log({facebookProfileData});
            await auth().onAuthStateChanged((user) => {
              if (user != null) {
                console.log(user, 'jjjjjj');
                AsyncStorage.setItem('user', JSON.stringify(user));
                // setemail(user.email)
                // setFullName(user.fullName)

                navigation.navigate('FacebookLogin');
              }
              // const facebookData={
              //   email,
              //   fullName
              // }
              //  setLoading(true)
              // setLoading(false)
              // alert(user)
            });
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const logout = async () => {
    await LoginManager.logOut();
    console.log('logout');
  };
  const configureGoogleAuth = () => {
    console.log('configureGoogleAuth Called');
    try {
      return GoogleSignin.configure({
        webClientId:
          '359061727415-ua7do2pl0meohop9hkrbj51flbdjgftm.apps.googleusercontent.com',
        // iosClientId: '593273188834-ju3ipe1u3frjdaqdjt9lirano643g6pv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: false,
      });
    } catch (error) {
      console.log('configureGoogleAuth catch', error);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
        autoResolve: true,
      });
      await configureGoogleAuth();

      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // const userInfo = await GoogleSignin.signIn();
      console.log('idToken', googleCredential);
      auth().signInWithCredential(googleCredential);
      await auth().onAuthStateChanged((user) => {
        console.log('onAuthStateChanged', user);
        if (user != null) {
          console.log(user, 'jjjjjj');
          AsyncStorage.setItem('user', JSON.stringify(user));
          // setemail(user.email)
          // setFullName(user.fullName)
          navigation.navigate('GoogleLogin');
        }
        // const facebookData={
        //   email,
        //   fullName
        // }
        //  setLoading(true)
        // setLoading(false)
        // alert(user)
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('1', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('2', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('3', error);
        // play services not available or outdated
      } else {
        Alert.alert('Something went wrong', error.toString());
        // console.log("4", error)
        // some other error happened
      }
    }

    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // console.log('googleCredential', googleCredential);

    // return firebase.auth().signInWithCredential(googleCredential).then(
    //   async (data) => {
    //     console.log('data', data);
    //     let datalist = []
    //     let value = {
    //       name: data.user.displayName,
    //       email: data.user.email,
    //       isAdmin: false,
    //       providerId: data.user.providerData[0].providerId,
    //     }
    //     datalist.push(value)
    //     console.log(datalist, 'datalist')
    //     try {
    //       var currentUser = datalist;
    //       console.log({ currentUser })
    //       // await AsyncStorage.setItem(
    //       //   '@User',
    //       //   JSON.stringify(currentUser),
    //       // );
    //     }
    //     catch (err) {
    //       console.log('err', err);
    //     }
    //     // firebase.database().ref('User').child(data.user.uid).set({
    //     //   name: data.user.displayName,
    //     //   email: data.user.email,
    //     //   isAdmin: false,
    //     //   providerId: data.user.providerData[0].providerId,
    //     // }).then(() => {
    //     //   console.log('Data update.');
    //     // }).catch((error) => {
    //     //   console.log('failed: ' + error.message);
    //     // });
    //     // this.props.navigation.navigate("Google")
    //   });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {/* <View> */}
      <ScrollView>
        <Image
          source={require('../../assets/icons/background.png')}
          style={{width: '100%', flex: 1}}
          resizeMode="stretch"
        />

        <View
          style={{
            elevation: 2,
            position: 'absolute',
            top: '15%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/logo.png')}
            resizeMode="cover"
          />
          <Image
            source={require('../../assets/icons/slogan.png')}
            resizeMode="cover"
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          <AppText style={{color: colors.primary}}>Welcome to the </AppText>
          <AppText
            style={{fontSize: 18, fontWeight: 'bold', color: colors.primary}}>
            Marketplace
          </AppText>
        </View>
        <View
          style={{
            flex: 0.5,
            // justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            padding: 10,
          }}>
          <AppButton
            onPress={() => navigation.navigate('Registration')}
            color={colors.primary}
            title="SIGNUP"
            style={{
              marginTop: 20,
              padding: 15,

              width: '100%',
            }}
          />

          <AppText style={{fontSize: 16, fontWeight: 'bold', marginTop: 15}}>
            Already a Member?
          </AppText>

          <AppButton
            onPress={() => navigation.navigate('Login page')}
            color={colors.secondary}
            title="LOGIN"
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.secondary,

              marginTop: 15,
              padding: 15,
              width: '100%',
            }}
          />
        </View>
        <View style={styles.socialBtnView}>
          <View style={styles.socialBtn}>
            <AppButton
              onPress={() => fbBtn()}
              color={colors.white}
              title="Facebook"
              style={{
                backgroundColor: colors.primary,
                borderWidth: 1,
                borderColor: colors.blue,
                // marginVertical: 60,
                padding: 10,
                width: '80%',
              }}
            />
          </View>
          <View style={styles.socialBtn}>
            <AppButton
              // onPress={() => gmailBtn()}
              onPress={() => onGoogleButtonPress()}
              color={colors.white}
              title="Gmail"
              style={{
                backgroundColor: colors.primary,
                borderWidth: 1,
                borderColor: colors.blue,
                // marginVertical: 60,
                padding: 10,
                width: '80%',
              }}
            />
          </View>
          <View>
            {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default LoginPage;
