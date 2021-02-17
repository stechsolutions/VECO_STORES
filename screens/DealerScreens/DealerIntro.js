import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


const DealerIntro = () => {

    return(
    <>
        <SafeAreaView>
            <View style={{flex : 1 ,justifyContent : 'center' , alignItems : 'center' , backgroundColor : 'white'}}>

                <View style={{marginVertical : 100}}>
                    <Text style={{fontSize : 40 , fontWeight : "bold" , color : '#FFD700'}}>LOGO</Text>
                </View>

                <View style={{marginVertical : 20}}>
                    <Text style={{fontSize : 26}}> Hello Dealer </Text>
                </View>

                <View style={{marginVertical : 30 , paddingHorizontal : 50 , alignContent : 'center'}}>
                    <Text style={{fontSize : 18 , textAlign : 'center'}}> Your information is being reviwed, you will be notiy soon when it is approved </Text>
                </View>

            </View>
        </SafeAreaView>
    </>
    )
    
}

export default DealerIntro;