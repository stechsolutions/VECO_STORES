import React, {Component} from 'react';
import AppText from '../../Components/AppText';
import {View, ScrollView} from 'react-native';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

export default class OrderDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <AntDesign size={30} name="left" />
          </View>
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Order</Text>
          </View>
          <View style={styles.headerIcon}></View>
        </View>
        {/* <View style={styles.ItemsView}> */}
        <ScrollView style={{flex: 1}}>
          <View style={styles.informationView}>
            <View style={styles.informationHead}>
              <AppText style={styles.infoHeadText}>Information</AppText>
            </View>
            <View style={styles.informationTextView}>
              <Text style={styles.infoText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </Text>
            </View>
          </View>
          <View style={styles.informationView}>
            <View style={styles.informationHead}>
              <AppText style={styles.infoHeadText}>Information</AppText>
            </View>
            <View style={styles.informationTextView}>
              <Text style={styles.infoText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </Text>
            </View>
          </View>
          <View style={styles.informationView}>
            <View style={styles.informationHead}>
              <AppText style={styles.infoHeadText}>Information</AppText>
            </View>
            <View style={styles.informationTextView}>
              <Text style={styles.infoText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* </View> */}
      </View>
    );
  }
}
