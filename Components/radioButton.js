import React, { Component, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';

export default function RadioButton({ navigation, selected, onPress }) {
    // const [termsAccepted, setTermsAccepted] = useState(false);
    return (
        <View
            style={styles.radioView}>
            {selected ? (
                <AntDesign
                    onPress={() => {
                        onPress(false);
                    }}
                    color={colors.primary}
                    size={20}
                    name="checkcircle"
                    style={{ paddingRight: 5 }}
                />
            ) : (
                    <TouchableOpacity
                        onPress={() => {
                            onPress(true);
                        }}>
                        <View
                            style={{
                                width: 21,
                                height: 21,
                                backgroundColor: colors.white,
                                borderWidth: 2,
                                borderColor: colors.primary,
                                borderRadius: 20,
                                marginRight: 5,
                            }}></View>
                    </TouchableOpacity>
                )}
        </View>
    );
}

const styles = StyleSheet.create({

});
