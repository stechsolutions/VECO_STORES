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

export default class PendingApproval extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <AntDesign size={30} name="left" />
          </View>
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Pending Approval</Text>
          </View>
          <View style={styles.headerIcon}></View>
        </View>
        {/* <View style={styles.ItemsView}> */}
        <ScrollView style={{flex: 1}}>
          <View style={styles.cardOuterView}>
            <Card noShadow style={{flex: 1}}>
              <CardItem>
                <Left>
                  <Thumbnail
                    size={20}
                    source={require('../../assets/dress.jpg')}
                  />
                  {/* <FontAwesome name='opencart' /> */}
                  <Body>
                    <Text>Order Name</Text>
                    <AppText style={styles.itemStatusText}>
                      Pending Approval
                    </AppText>
                  </Body>
                </Left>
                <Right>
                  <AppText style={styles.detailText}>See details</AppText>
                </Right>
              </CardItem>
            </Card>
            <Card noShadow style={{flex: 1}}>
              <CardItem>
                <Left>
                  <Thumbnail
                    size={20}
                    source={require('../../assets/dress.jpg')}
                  />
                  {/* <FontAwesome name='opencart' /> */}
                  <Body>
                    <Text>Order Name</Text>
                    <AppText style={styles.itemStatusText}>
                      Pending Approval
                    </AppText>
                  </Body>
                </Left>
                <Right>
                  <AppText style={styles.detailText}>See details</AppText>
                </Right>
              </CardItem>
            </Card>
            <Card noShadow style={{flex: 1}}>
              <CardItem>
                <Left>
                  <Thumbnail
                    size={20}
                    source={require('../../assets/dress.jpg')}
                  />
                  {/* <FontAwesome name='opencart' /> */}
                  <Body>
                    <Text>Order Name</Text>
                    <AppText style={styles.itemStatusText}>
                      Pending Approval
                    </AppText>
                  </Body>
                </Left>
                <Right>
                  <AppText style={styles.detailText}>See details</AppText>
                </Right>
              </CardItem>
            </Card>
            <Card noShadow style={{flex: 1}}>
              <CardItem>
                <Left>
                  <Thumbnail
                    size={20}
                    source={require('../../assets/dress.jpg')}
                  />
                  {/* <FontAwesome name='opencart' /> */}
                  <Body>
                    <Text>Order Name</Text>
                    <AppText style={styles.itemStatusText}>
                      Pending Approval
                    </AppText>
                  </Body>
                </Left>
                <Right>
                  <AppText style={styles.detailText}>See details</AppText>
                </Right>
              </CardItem>
            </Card>
            <Card noShadow style={{flex: 1}}>
              <CardItem>
                <Left>
                  <Thumbnail
                    size={20}
                    source={require('../../assets/dress.jpg')}
                  />
                  {/* <FontAwesome name='opencart' /> */}
                  <Body>
                    <Text>Order Name</Text>
                    <AppText style={styles.itemStatusText}>
                      Pending Approval
                    </AppText>
                  </Body>
                </Left>
                <Right>
                  <AppText style={styles.detailText}>See details</AppText>
                </Right>
              </CardItem>
            </Card>
          </View>
        </ScrollView>
        {/* </View> */}
      </View>
    );
  }
}
