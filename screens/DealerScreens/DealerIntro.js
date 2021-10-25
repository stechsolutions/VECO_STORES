import React from 'react';
import AppText from '../../Components/AppText';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const DealerIntro = () => {
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{marginVertical: 100}}>
            <AppText
              style={{fontSize: 40, fontWeight: 'bold', color: '#FFD700'}}>
              LOGO
            </AppText>
          </View>

          <View style={{marginVertical: 20}}>
            <AppText style={{fontSize: 26}}> Hello Dealer </AppText>
          </View>

          <View
            style={{
              marginVertical: 30,
              paddingHorizontal: 50,
              alignContent: 'center',
            }}>
            <AppText style={{fontSize: 18, textAlign: 'center'}}>
              {' '}
              Your information is being reviwed, you will be notiy soon when it
              is approved{' '}
            </AppText>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DealerIntro;
