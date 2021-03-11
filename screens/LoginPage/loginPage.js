import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import AppTextInput from '../../Components/AppTextInput';
import AppTextButton from '../../Components/AppTextButton';
import AppButton from '../../Components/AppButton';
import Entypo from 'react-native-vector-icons/Entypo';

const {width: WIDTH} = Dimensions.get('window');
const LoginPage = ({route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHideShow, setPasswordHideShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    if (email !== '' && email !== ' ' && password !== '' && password !== ' ') {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          return firestore().collection('vendors').doc(res.user.uid).get();
        })
        .then(async (user) => {
          if (user.exists) {
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({userId: user.ref.id, ...user.data()}),
            );
            setLoading(false);
            route.params.onPress(user.data().firstTime);
          } else {
            return Alert.alert(
              'User Not Found',
              'User with this email was not found.',
              [{text: 'OK'}],
              {cancelable: false},
            );
          }
        })
        .catch((e) => {
          if (
            e.message ===
            '[auth/wrong-password] The password is invalid or the user does not have a password.'
          ) {
            Alert.alert(
              `Wrong Password`,
              `You've entered a wrong password.`,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          } else if (
            e.message ===
            '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            Alert.alert(
              `User Not Found`,
              `User with this email was not found.`,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          } else {
            Alert.alert(
              `Something Went Wrong`,
              'Something went wrong. Please try again later.',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }
          setLoading(false);
        });
    } else {
      Alert.alert(
        'Fill out all field',
        'Please, Fill out all the required fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Image
          source={require('./background.png')}
          style={{width: '100%', position: 'relative'}}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: '25%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('./logo.png')} resizeMode="cover" />
          <Image source={require('./slogan.png')} resizeMode="cover" />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            padding: 10,
          }}>
          <AppTextInput
            style={{marginVertical: 10}}
            value={email}
            onChangeText={(txt) => setEmail(txt)}
            placeholder={'Email'}
            textContentType="emailAddress"
          />
          <View style={{width: '100%'}}>
            <AppTextInput
              style={{marginVertical: 10}}
              value={password}
              onChangeText={(txt) => setPassword(txt)}
              placeholder={'Password'}
              textContentType="password"
              secureTextEntry={passwordHideShow}
            />
            <Entypo
              style={{
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: [{translateY: -10}],
              }}
              name={passwordHideShow ? 'eye-with-line' : 'eye'}
              size={20}
              onPress={() => setPasswordHideShow(!passwordHideShow)}
              color={colors.dark}
            />
          </View>

          <Text style={{paddingLeft: 200, fontSize: 12}}>Forgot Password?</Text>

          <AppButton
            loading={loading}
            onPress={signIn}
            color={colors.primary}
            title="LOGIN"
            style={{
              marginVertical: 30,
              padding: 15,
              width: '100%',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPage;
