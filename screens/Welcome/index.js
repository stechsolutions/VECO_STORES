import React from 'react';
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

const { width: WIDTH } = Dimensions.get('window');
const LoginPage = ({ navigation, changeFirstTime }) => {
  const goToCreateStore=()=>{
  navigation.navigate('createStore');
  }
  return (
    <Screen style={{ flex: 1, backgroundColor: colors.light }}>
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 200, marginVertical: 150 }}>
            <Text style={styles.title}>Welcome! to the VECO family</Text>
            <Text style={styles.subTitle}>Create your dealer store now</Text>
            <AppButton
              // disabled={
              //   !storeName ||
              //   !location ||
              //   !locationDetailsArray.length ||
              //   !documentImage ||
              //   !image
              // }
              // loading={loading}
              style={[styles.btn, styles.mVertical]}
              title="Create Online Store"
              onPress={goToCreateStore}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.secondary,
    width: '100%',
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
  },
  subTitle: {
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  btnText: {},
});
