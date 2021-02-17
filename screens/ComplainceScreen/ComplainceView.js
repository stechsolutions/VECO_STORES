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

import { Card, Title, Paragraph } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
const {width : WIDTH } = Dimensions.get('window')

const ComplainceView = () => {
    return(
        <SafeAreaView>
            
            <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>

            <Card style={{marginHorizontal : 20, marginVertical: 20 , shadowColor : 'black' , elevation : 8}}>
                <Card.Content>

                <View style={{marginTop : 20 , flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                    <Avatar.Image size={84} source={require('./avatar.jpg')} />
                </View>

                <Title style={{textAlign : 'center'}}>David Blex</Title>
                <Text style={{fontSize : 20 , paddingVertical : 10}}>Issue: </Text>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  </Paragraph>
                </Card.Content>
            </Card>
                
            </View>
            
        </SafeAreaView>
    )
}

export default ComplainceView;