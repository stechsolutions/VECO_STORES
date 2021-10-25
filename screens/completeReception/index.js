import React, {Component, useState} from 'react';
import AppText from '../../Components/AppText';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppCard from '../../Components/AppCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Counter from '../../Components/Counter';
import AppButton from '../../Components/AppButton';
import Modal from '../../Components/Modal';
import StarRating from 'react-native-star-rating';
import AppPhotoInput from '../../Components/AppPhotoInput';
import * as ImagePicker from 'react-native-image-picker';
import {IMLocalized} from '../../i18n/Localize';

export default function CompleteReception({navigation}) {
  const [count, setCount] = useState(3);
  const [claimModal, setClaimModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const pickImageHandler = () => {
    // setShowModal(false);
    ImagePicker.launchImageLibrary(
      {
        title: 'Pick an Image',
        maxWidth: 800,
        maxHeight: 600,
      },
      (res) => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          console.log(res.uri, 'uri');
        }
      },
    );
  };
  return (
    <Screen style={{backgroundColor: colors.light}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.statusView}>
          <View style={styles.status}>
            <View style={styles.circle} />
            <AppText style={styles.statusText}>
              Order Created (26/Feb/2021)
            </AppText>
          </View>
          <View style={styles.yellowBar} />
          <View style={styles.status}>
            <View style={styles.circle} />
            <AppText style={styles.statusText}>
              Paid Order (26/Feb/2021)
            </AppText>
          </View>
          <View style={styles.yellowBar} />
          <View style={styles.status}>
            <View style={styles.circle} />
            <AppText style={styles.statusText}>
              Approved Dealer (26/Feb/2021)
            </AppText>
          </View>
          <View style={styles.yellowBar} />
          <View style={styles.status}>
            <View style={styles.circle} />
            <Text style={styles.statusText}>
              Shipped by dealer (27/Feb/2021)
            </Text>
          </View>
          <View style={styles.yellowBar} />
          <View style={styles.status}>
            {/* <View style={styles.circle} /> */}
            <FontAwesome
              style={{marginHorizontal: 15}}
              name="arrow-circle-right"
              color={colors.secondary}
              size={50}
            />
            <Text
              style={[styles.statusText, {fontWeight: 'bold', color: 'black'}]}>
              Arrived - Ended Proces (28/Feb/2021)
            </Text>
          </View>
        </View>
        <View style={styles.btnView}>
          <AppButton
            onPress={() =>
              navigation.navigate('DashboardStack', {
                screen: 'Vehicle in circulation',
              })
            }
            color={colors.primary}
            title="Go To Map"
            style={{
              // marginVertical: 30,
              // marginHorizontal: 20,
              padding: 15,
              paddingHorizontal: 40,
              // width: '30%',
            }}
          />
        </View>
        <View style={[styles.btnView, {padding: 20}]}>
          <Text style={{fontSize: 18, fontWeight: '700', color: '#333333'}}>
            How about your Delivery?
          </Text>
        </View>
        <View style={styles.ratingView}>
          <AppText style={styles.ratingLabel}>Punctuality</AppText>
          <View style={{flex: 0.5}}>
            <StarRating
              emptyStarColor={'gray'}
              fullStarColor="yellow"
              halfStarColor="yellow"
              disabled={false}
              maxStars={5}
              // rating={this.state.starCount}
              // selectedStar={(rating) => (rating)}
            />
          </View>
        </View>
        <View style={styles.ratingView}>
          <AppText style={styles.ratingLabel}>Condition of Products</AppText>
          <View style={{flex: 0.5}}>
            <StarRating
              emptyStarColor={'gray'}
              fullStarColor="yellow"
              halfStarColor="yellow"
              disabled={false}
              maxStars={5}
              // rating={this.state.starCount}
              // selectedStar={(rating) => (rating)}
            />
          </View>
        </View>
        <View style={styles.ratingView}>
          <AppText style={styles.ratingLabel}>Communication</AppText>
          <View style={{flex: 0.5}}>
            <StarRating
              emptyStarColor={'gray'}
              fullStarColor="yellow"
              halfStarColor="yellow"
              disabled={false}
              maxStars={5}
              // rating={this.state.starCount}
              // selectedStar={(rating) => (rating)}
            />
          </View>
        </View>
        <View style={styles.ratingView}>
          <AppText style={styles.ratingLabel}>Cordiality</AppText>
          <View style={{flex: 0.5}}>
            <StarRating
              emptyStarColor={'gray'}
              fullStarColor="yellow"
              halfStarColor="yellow"
              disabled={false}
              maxStars={5}
              // rating={this.state.starCount}
              // selectedStar={(rating) => (rating)}
            />
          </View>
        </View>
        <View style={styles.ratingView}>
          <AppText style={styles.ratingLabel}>Clothing</AppText>
          <View style={{flex: 0.5}}>
            <StarRating
              emptyStarColor={'gray'}
              fullStarColor="yellow"
              halfStarColor="yellow"
              disabled={false}
              maxStars={5}
              // rating={this.state.starCount}
              // selectedStar={(rating) => (rating)}
            />
          </View>
        </View>
        <AppPhotoInput
          style={{margin: 20, width: '90%'}}
          placeHolder="Photo of operation notice"
          onPress={() => pickImageHandler()}
        />
        <View>
          <TextInput
            placeholder={IMLocalized('Write your comments')}
            multiline
            numberOfLines={7}
            style={{
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderWidth: 0.5,
              borderRadius: 20,
            }}
          />
        </View>
        <View
          style={[
            styles.btnView,
            {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: 20,
              marginVertical: 20,
            },
          ]}>
          <AppButton
            onPress={() => setClaimModal(true)}
            color={colors.primary}
            title="Claim"
            style={{
              marginVertical: 5,
              marginHorizontal: 5,
              padding: 15,
              paddingHorizontal: 30,
              // width: '30%',
            }}
          />
          <AppButton
            onPress={() => setConfirmModal(true)}
            color={colors.primary}
            title="Confirm"
            style={{
              marginVertical: 5,
              marginHorizontal: 5,
              padding: 15,
              paddingHorizontal: 30,
              // width: '30%',
            }}
          />
        </View>
      </ScrollView>
      <Modal onClose={() => setClaimModal(false)} visible={claimModal}>
        <AppText style={styles.modalHead}>
          Your Claim has been submitted
        </AppText>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <AntDesign name="checkcircleo" color="#253370" size={100} />
        </View>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <AppText style={styles.link}>See Details</AppText>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <AppButton
            onPress={() => console.log('hello world')}
            color={colors.primary}
            title="Do you want to chat with the dealer?"
            style={{
              marginVertical: 30,
              marginHorizontal: 20,
              padding: 15,
              width: '80%',
            }}
          />
        </View>
      </Modal>
      <Modal onClose={() => setConfirmModal(false)} visible={confirmModal}>
        <AppText style={styles.modalHead}>Delivery Completed !</AppText>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <AntDesign name="checkcircleo" color="#253370" size={100} />
        </View>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <AppText style={styles.link}>See Details</AppText>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <AppButton
            onPress={() => console.log('hello world')}
            color={colors.primary}
            title="Do you want to chat with the dealer?"
            style={{
              marginVertical: 30,
              marginHorizontal: 20,
              padding: 15,
              width: '80%',
            }}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 5,
  },
  modalHead: {
    textAlign: 'center',
    fontSize: 20,
    color: '#666666',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 10,
  },
  statusView: {
    margin: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: colors.dark,
    fontSize: 16,
  },
  yellowBar: {
    width: 10,
    height: 50,
    backgroundColor: colors.secondary,
    marginLeft: 30,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ratingLabel: {
    flex: 0.5,
    fontSize: 16,
    color: colors.dark,
  },
});
