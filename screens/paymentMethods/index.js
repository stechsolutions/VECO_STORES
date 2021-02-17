import React, { Component, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import Counter from '../../Components/Counter';
import AppButton from '../../Components/AppButton';
import RadioButton from '../../Components/radioButton';
export default function PaymentMethods({ navigation }) {
    const [count, setCount] = useState(3);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [selected, setSelected] = useState('');

    return (
        <Screen style={{ backgroundColor: colors.light }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.item}>
                    <FontAwesome style={{ paddingRight: 20, }} name='cc-visa' size={30} />
                    <RadioButton selected={selected === 'visa'} onPress={() => setSelected('visa')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Visa</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <FontAwesome style={{ paddingRight: 20, }} name='cc-mastercard' size={30} />
                    <RadioButton selected={selected === 'mastercard'} onPress={() => setSelected('mastercard')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Mastercard</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Ionicons style={{ paddingRight: 20, }} name='cash' size={30} />
                    <RadioButton selected={selected === 'cash'} onPress={() => setSelected('cash')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Cash</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Ingresar monto</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <AntDesign style={{ paddingRight: 20, }} name='wallet' size={30} />
                    <RadioButton selected={selected === 'Clave o debito (POS)'} onPress={() => setSelected('Clave o debito (POS)')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Clave o debito (POS)</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <MaterialIcons style={{ paddingRight: 20, }} name='compare-arrows' size={30} />
                    <RadioButton selected={selected === 'Transferencia'} onPress={() => setSelected('Transferencia')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Transferencia</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Adjuntar doc.</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <AntDesign style={{ paddingRight: 20, }} name='creditcard' size={30} />
                    <RadioButton selected={selected === 'Yappy'} onPress={() => setSelected('Yappy')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Yappy</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Ingresar ID</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <AntDesign style={{ paddingRight: 20, }} name='creditcard' size={30} />
                    <RadioButton selected={selected === 'Nequi'} onPress={() => setSelected('Nequi')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Nequi</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Ingresar ID</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <FontAwesome style={{ paddingRight: 20, }} name='paypal' size={30} />
                    <RadioButton selected={selected === 'Paypal'} onPress={() => setSelected('Paypal')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Paypal</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Detalles</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <AntDesign style={{ paddingRight: 20, }} name='qrcode' size={30} />
                    <RadioButton selected={selected === 'Vale digital'} onPress={() => setSelected('Vale digital')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>Vale digital</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Leer codigo</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <AntDesign style={{ paddingRight: 20, }} name='creditcard' size={30} />
                    <RadioButton selected={selected === 'Otros'} onPress={() => setSelected('Otros')} />
                    <View style={styles.name}>
                        <Text style={styles.nameText}>OtrosVale digital</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>Metodo</Text>
                    </View>
                </View>


                <View style={styles.checkOutBtnView}>
                    <AppButton
                        disabled={!selected}
                        onPress={() => navigation.navigate('OrderCompletion', { paymentMethod: selected })}
                        color={colors.primary}
                        title="Next"
                        style={{
                            marginVertical: 30,
                            padding: 15,
                            width: '70%',
                        }}
                    />
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'flex-start',
        margin: 10,
    },
    imageView: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    image: {
        width: '100%',
        height: '100%', borderRadius: 50,
    },
    name: {
        flex: 0.9,
        fontSize: 20,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333'
    },
    priceView: {
        // flex: 0.2,
        // borderWidth:1,

    },
    price: {
        fontSize: 16,
        color: 'red',
        fontWeight: '700',
        textAlign: 'center'
    },
    checkOutBtnView: {
        justifyContent: 'center', alignItems: 'center',
    },
    radioView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginRight: 10,
    }
}); 
