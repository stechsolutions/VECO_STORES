
import React from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import AppButton from '../../Components/AppButton';
import colors from '../../config/colors';
import { styles } from '../purchaseOrders/style';

const { width: WIDTH } = Dimensions.get('window');
const LoginPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <View> */}
        <Image
          source={require('../../assets/icons/background.png')}
          style={{ width: '100%', flex: 1 }}
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
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            padding: 10,
          }}>
          <AppButton
            onPress={() => navigation.navigate('Registration')}
            color={colors.primary}
            title="SIGNUP"
            style={{
              marginVertical: 30,
              padding: 15,
              width: '100%',
            }}
          />

          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Already a Member?
          </Text>

          <AppButton
            onPress={() => navigation.navigate('Login page')}
            color={colors.secondary}
            title="LOGIN"
            style={{
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.secondary,

              marginVertical: 15,
              padding: 15,
              width: '100%',
            }}
          />
        </View>
        <View style={styles.socialBtnView}>
          <View style={styles.socialBtn}>
            <AppButton
              onPress={() => { console.log('facebook') }}
              color={colors.white}
              title="Facebook"
              style={{
                backgroundColor: colors.blue,
                borderWidth: 1,
                borderColor: colors.blue,
                marginVertical: 15,
                padding: 10,
                width: '80%',
              }}
            />
          </View>
          <View style={styles.socialBtn}>
            <AppButton
              onPress={() => { console.log('facebook') }}
              color={colors.white}
              title="Gmail"
              style={{
                backgroundColor: colors.blue,
                borderWidth: 1,
                borderColor: colors.blue,
                marginVertical: 15,
                padding: 10,
                width: '80%',
              }}
            />
          </View>

        </View>
      {/* </View> */}
    </View>
  );
};

export default LoginPage;