import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
    Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,
    Icon, Left, Body, Right, Item, Input, Picker, Radio, DatePicker
}
    from 'native-base';


export default class PaidOrderInvoice extends Component {
    state = {
        licenseType: null,
        debitCard: true,
        cashOnDel: false,
    }
    onValueChange(value, property) {
        this.setState({
            [property]: value
        });
    }
    toggleRadioCashOnDel = () => {
        this.setState({ cashOnDel: true, debitCard: false });
    }
    toggleRadioCredit = () => {
        this.setState({ debitCard: true, cashOnDel: false });
    }
    setDate = (newDate) => {
        this.setState({ chosenDate: newDate });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <AntDesign size={30} name='left' />
                    </View>
                    <View style={styles.headerTextView}>
                        <Text style={styles.headerText}>
                            Paid Orders
                        </Text>

                    </View>
                    <View style={styles.headerIcon}>

                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}  >

                    <View style={styles.assignRouteView}>
                        <Text style={styles.assignRouteText}>Invoice</Text>
                        <View style={styles.orderInfoView}>
                            <View style={styles.orderProfile}>
                                <Thumbnail size={50} source={require('./assets/user.jpg')} />
                            </View>
                            <Text style={styles.orderName}>
                                Order Name
                        </Text>
                        </View>
                    </View>

                    <View style={styles.itemDetailView}>
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemHead}>Item Number</Text>
                            <Item style={styles.item} rounded>
                                <Input style={styles.input} placeholder='' disabled />
                            </Item>
                        </View>
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemHead}>Quantity</Text>
                            <Item style={styles.item} rounded>
                                <Input disabled style={styles.input} placeholder='' />
                            </Item>
                        </View>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemHead}>Description</Text>
                        <Item style={styles.item} rounded>
                            <Input disabled style={styles.input} multiline numberOfLines={2} placeholder='' />
                        </Item>
                    </View>
                    <View style={styles.nextBtnView}>
                        <TouchableOpacity style={styles.btn} delayPressIn={'300ms'}>
                            <Text style={styles.btnText}>Assign</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.totalView}>
                        <View style={styles.eachCalcView}>
                            <Text style={styles.property}>Amount</Text>
                            <Text style={styles.value}>$0.00</Text>
                        </View>
                        <View style={styles.eachCalcView}>
                            <Text style={styles.property}>VAT</Text>
                            <Text style={styles.value}>$0.00</Text>
                        </View>
                        <View style={styles.eachCalcView}>
                            <Text style={styles.property}>Total</Text>
                            <Text style={styles.value}>$0.00</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }




}