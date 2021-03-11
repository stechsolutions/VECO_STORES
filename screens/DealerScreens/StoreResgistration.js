import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const StoreResgistrations = () => {
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
          <View style={{marginTop: 60}}>
            <TextInput
              placeholder={'Store Name'}
              placeholderTextColor={'black'}
              style={{
                width: WIDTH - 55,
                height: 55,
                borderRadius: 45,
                fontSize: 16,
                paddingLeft: 45,
                backgroundColor: '#eeeded',
              }}
            />
          </View>
          <View style={{marginTop: 30}}>
            <TextInput
              placeholder={'Location'}
              placeholderTextColor={'black'}
              style={{
                width: WIDTH - 55,
                height: 55,
                borderRadius: 45,
                fontSize: 16,
                paddingLeft: 45,
                backgroundColor: '#eeeded',
              }}
            />
          </View>
          <View style={{marginTop: 30}}>
            <TextInput
              placeholder={'+ Latitute and Longitude '}
              placeholderTextColor={'black'}
              style={{
                width: WIDTH - 55,
                height: 55,
                borderRadius: 45,
                fontSize: 16,
                paddingLeft: 45,
                backgroundColor: '#eeeded',
              }}
            />
          </View>

          <View style={{marginTop: 30}}>
            <TextInput
              placeholder={'+ Document Image'}
              placeholderTextColor={'black'}
              style={{
                width: WIDTH - 55,
                height: 55,
                borderRadius: 45,
                fontSize: 16,
                paddingLeft: 45,
                backgroundColor: '#eeeded',
              }}
            />
          </View>

          <View style={{marginTop: 50}}>
            <TextInput
              placeholder={' + Add Store Image'}
              placeholderTextColor={'black'}
              style={{
                width: WIDTH - 75,
                height: 105,
                borderRadius: 25,
                fontSize: 16,
                paddingLeft: 45,
                backgroundColor: '#eeeded',
              }}
            />
          </View>

          <View style={{marginTop: 40}}>
            <TouchableOpacity
              placeholder={'Create Store'}
              placeholderTextColor={'black'}
              style={{
                width: WIDTH - 55,
                height: 55,
                borderRadius: 45,
                backgroundColor: '#E7C04F',
                justifyContent: 'center',
              }}>
              <Text style={{color: '', fontSize: 18, textAlign: 'center'}}>
                Create Store
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default StoreResgistrations;
