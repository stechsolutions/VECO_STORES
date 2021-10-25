import React, {createRef, useEffect, useState} from 'react';
import AppText from '../../Components/AppText';
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
import {Notifi} from '../../Components/pushNotification';
import {IMLocalized} from '../../i18n/Localize';

const {width: WIDTH} = Dimensions.get('window');
const shown = createRef();
shown.current = false;
const LoginPage = ({navigation, changeFirstTime, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [approved, setapproved] = useState('Disapproved');
  useEffect(() => {
    // getStore()
    getStore2();
  }, []);

  const sendMessage = (id, title, message) => {
    Notifi.configure();
    Notifi.CreatChannel(id);
    Notifi.LocatlNotification(id, title, message);
  };

  const getStore = async () => {
    AsyncStorage.getItem('user').then((user) => {
      console.log(user, 'userrr');
      var convUser = JSON.parse(user);
      console.log('ID', convUser.userId);
      // try {
      //   firestore()
      //     .collection('vendors')
      //     .doc(convUser.userId)
      //     .onSnapshot((querySnapshot) => {
      //       // Approved | Pending approval | blocked | Disapproved
      //       // console.log('SNAPSHOT IN REVIEWxzczxczx', querySnapshot?.data());
      //       if (querySnapshot?.data()?.approved === 'Approved') {
      //         navigation.navigate('welcome');
      //       }
      //       setIsLoading(false);
      //       AsyncStorage.removeItem('user')
      //     });
      // } catch (error) {
      //   setIsLoading(false);
      // }
    });
  };
  const getStore2 = async () => {
    AsyncStorage.getItem('user').then((user) => {
      console.log(user, 'userrr');
      var convUser = JSON.parse(user);
      console.log('ID', convUser.userId);
      firestore()
        .collection('vendors')
        .doc(convUser.userId)
        .onSnapshot((querySnapshot) => {
          // Approved | Pending approval | blocked | Disapproved
          console.log('SNAPSHOT IN REVIEW', querySnapshot?.data());
          console.log(
            convUser.approved.toString() ==
              querySnapshot.data().approved.toString(),
            'asdhasjkdhaskdha',
          );
          // if (querySnapshot.data().firstTime) {
          //   navigation.navigate('Welcome');
          // }
          // Approved | Pending approval | blocked | Disapproved
          switch (querySnapshot.data().approved) {
            case 'Approved':
              if (
                convUser.approved.toString() ==
                  querySnapshot.data().approved.toString() ||
                user?.approved?.toString() ==
                  querySnapshot.data().approved.toString()
              ) {
              } else {
                !shown.current &&
                  sendMessage(
                    `${convUser.userId}`,
                    'store',
                    `Your Request For store is ${
                      querySnapshot.data().approved
                    } by Admin`,
                  );
                shown.current = true;
                const temp = {
                  ...convUser,
                  approved: querySnapshot.data().approved,
                };
                AsyncStorage.setItem('user', JSON.stringify(temp));
              }
              navigation.navigate('Home');
              // changeFirstTime();
              // setapproved(querySnapshot.data().approved);
              break;
            case 'Blocked':
            case 'Disapproved':
              if (
                convUser.approved.toString() ==
                  querySnapshot.data().approved.toString() ||
                user?.approved?.toString() ==
                  querySnapshot.data().approved.toString()
              ) {
              } else {
                sendMessage(
                  `${convUser.userId}`,
                  'store',
                  `Your Request For store is ${
                    querySnapshot.data().approved
                  } by Admin`,
                );
                const temp = {
                  ...convUser,
                  approved: querySnapshot.data().approved,
                };
                AsyncStorage.setItem('user', JSON.stringify(temp));
              }
              setapproved(querySnapshot.data().approved);
              // AsyncStorage.removeItem('user')
              // navigation.navigate('welcome');

              break;

            //   case 'Blocked':
            // case 'Disapproved':
            //   sendMessage(
            //     `${convUser.userId}`,
            //     'store',
            //     `Your Request For store is ${querySnapshot.data().approved
            //     } by Admin`,
            //   );
            //   setapproved(querySnapshot.data().approved)
            //   // AsyncStorage.removeItem('user')
            //   // navigation.navigate('welcome');

            //   break;
            case 'Pending':
              if (convUser.firstTime || route.params?.firstTime) {
                navigation.navigate('welcome');
              } else {
                if (!convUser?.showPending) {
                  sendMessage(
                    `${convUser.userId}`,
                    'store',
                    `Your Request For store is pending`,
                  );

                  const temp = {...convUser, showPending: true};
                  AsyncStorage.setItem('user', JSON.stringify(temp));
                }
                setapproved(querySnapshot.data().approved);
              }

              // AsyncStorage.removeItem('user')
              // navigation.navigate('welcome');
              break;

            default:
              Alert.alert('NUMBER NOT FOUND');
          }
        });
    });
  };

  if (approved === 'Pending') {
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
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 200, marginVertical: 150}}>
              <AppText style={styles.title}>Hello Store!</AppText>
              <AppText style={styles.subTitle}>
                {IMLocalized(
                  'Your Information Is Being Reviewed You Will Be Notify Soon When It Is Approved',
                )}
              </AppText>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (approved === 'Approved') {
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
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 200, marginVertical: 150}}>
              <AppText style={styles.title}>Welcome!</AppText>
              <AppText style={styles.subTitle}>
                Create your dealer store now
              </AppText>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('createStore', {changeFirstTime})
                }>
                <View style={styles.btn}>
                  <AppText style={styles.btnText}>Create Store</AppText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
  if (approved === 'Disapproved') {
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
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 200, marginVertical: 150}}>
              <AppText style={styles.title}>Hello Store!</AppText>
              <AppText style={styles.subTitle}>
                Your Account Have been Disapproved By The Admin
              </AppText>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (approved === 'Blocked') {
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
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 200, marginVertical: 150}}>
              <AppText style={styles.title}>Hello Store!</AppText>
              <AppText style={styles.subTitle}>
                Your Information is being reviewed, you are blocked by admin
              </AppText>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
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
  btn: {
    padding: 20,
    backgroundColor: colors.secondary,
    borderRadius: 15,
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
  btnText: {
    color: 'black',
    textAlign: 'center',
  },
});
