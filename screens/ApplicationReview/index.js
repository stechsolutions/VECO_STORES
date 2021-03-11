import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AppButton from '../../Components/AppButton';
import AppPicker from '../../Components/AppPicker';
import AppTextInput from '../../Components/AppTextInput';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const {width: WIDTH} = Dimensions.get('window');
const LoginPage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      console.log(user, 'userrr');
      var convUser = JSON.parse(user);
      console.log('ID', convUser.userId);
      try {
        firestore()
          .collection('vendors')
          .doc(convUser.userId)
          .onSnapshot((querySnapshot) => {
            // Approved | Pending approval | blocked | Disapproved
            console.log('SNAPSHOT IN REVIEW', querySnapshot?.data());
            if (querySnapshot?.data()?.approved === 'Approved') {
              navigation.navigate('welcome');
            }
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    });
  });
  return (
    <Screen style={{flex: 1, backgroundColor: colors.light}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
          }}>
          <Image
            source={require('../../assets/icons/logo.png')}
            resizeMode="cover"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: '100%', marginVertical: 150}}>
            <Text style={styles.title}>Hello Dealer!</Text>
            <Text style={styles.subTitle}>
              Your Information is being reviewed, you will be notified soon when
              it is approved!
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    paddingHorizontal: '20%',
  },
});
