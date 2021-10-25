import React from 'react';
import AppText from '../../Components/AppText';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

const CreateStore = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginVertical: 100}}>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#FFD700'}}>
              LOGO
            </Text>
          </View>

          <View style={{marginVertical: 20}}>
            <AppText style={{fontSize: 26, textAlign: 'center'}}>
              {' '}
              Welcome!
            </AppText>
            <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 10}}>
              Create your dealer store now
            </Text>
          </View>

          <View
            style={{
              marginVertical: 45,
              paddingHorizontal: 50,
              alignContent: 'center',
            }}>
            <Button
              style={{paddingVertical: 20, paddingHorizontal: 20}}
              mode="outlined"
              onPress={() => console.log('Pressed')}>
              Create Store
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateStore;
