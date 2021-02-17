import React,{useEffect} from 'react';
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

const {width: WIDTH} = Dimensions.get('window');
const LoginPage = ({navigation}) => {
  useEffect(()=>{
    AsyncStorage.getItem('user').then(user=>{
      console.log(user,'userrr');
      var convUser = JSON.parse(user);
      if(convUser.approved){
        navigation.navigate('welcome');
      }
    })
  })
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
          <View style={{width: 200, marginVertical: 150}}>
            <Text style={styles.title}>Hello Dealer!</Text>
            <Text style={styles.subTitle}>
              Your Information is being reviewed, you will be notify soon when
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
  },
  subTitle: {
    textAlign: 'center',
  },
});
