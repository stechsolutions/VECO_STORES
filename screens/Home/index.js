import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {color} from 'react-native-reanimated';
import HomeCard from '../../Components/HomeCard';
import HomeCardMain from '../../Components/HomeCardMain';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import ToggleBtn from '../../Components/ToggleBtn';
import AppButton from '../../Components/AppButton';
import {PushNotification} from '../../Components/PushNotifications';
const index = ({navigation}) => {
  const [store, setStore] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [showBuyOptions, setShowBuyOptions] = useState(false);
  const [showSellOptions, setShowSellOptions] = useState(false);

  const [loading, setLoading] = useState(true);

  const toggleBtn = async () => {
    setToggle(!toggle);
    await firestore()
      .collection('vendorStores')
      .doc(store.storeId)
      .update({open: !toggle});

    AsyncStorage.setItem('open', !toggle === false ? 'false' : 'true');
  };

  const getUser = async () => JSON.parse(await AsyncStorage.getItem('user'));

  PushNotification();

  useEffect(() => {
    AsyncStorage.getItem('open').then((open) =>
      open === 'true'
        ? setToggle(true)
        : open === 'false'
        ? setToggle(false)
        : '',
    );
    // AsyncStorage.getItem('store').then((store) => {
    //   if (store) {
    //     var storeParsed = JSON.parse(store);
    //     setStore(JSON.parse(store));
    //     setLoading(false);
    //     console.log(JSON.parse(store), 'store');
    //   } else {
    //   }
    // });
    getStore();
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem('store').then((store) => {
  //     if (store) {
  //       var storeParsed = JSON.parse(store);
  //       setStore(JSON.parse(store));

  //       console.log(JSON.parse(store), 'store');
  //     } else {
  //       getStore();
  //     }
  //   });
  // }, []);

  const getStore = async () => {
    const user = await getUser();

    firestore()
      .collection('vendorStores')
      .where('userId', '==', user.userId)
      .limit(1)
      .get()
      .then((res) => {
        let count = 1;
        res.forEach((e) => {
          setStore({storeId: e.ref.id, ...e.data()});
          console.log(e.data(), 'store');
          setToggle(e.data().open);
          console.log('OPEN', e.data().open);
          AsyncStorage.setItem(
            'store',
            JSON.stringify({storeId: e.ref.id, ...e.data()}),
          );

          if (count === res.size) {
            setLoading(false);
          }
          count++;
        });
      });
  };

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <Screen>
      {/* Card Prop >>> name=IconName, title, subtitle, buttonTitle="Button's Title" */}
      {/* Card props >>> ii = IonIcons | mci= MaterialCommunityIcons | fa = FontAwsome */}
      <ScrollView style={styles.container}>
        <View>
          <ToggleBtn onPress={toggleBtn} toggle={toggle} />
          {toggle ? (
            <View style={styles.storeInfo}>
              <AppText style={styles.storeInfoHead}>Your Store is Open</AppText>
              <AppText style={styles.storeInfoText}>
                you are connected now
              </AppText>
            </View>
          ) : (
            <View style={styles.storeInfo}>
              <AppText style={styles.storeInfoHead}>
                Your Store is Closed
              </AppText>
              <Text style={styles.storeInfoText}>
                Active now so that you can get connected
              </Text>
            </View>
          )}
        </View>
        <View>
          <HomeCardMain
            image={store?.photoBusinessUrl}
            name="image"
            title={store?.tradeName}
            subtitle="You can customize your store"
            buttonTitle="Customize"
            onPress={() =>
              navigation.navigate('UpdateStoreStack', {updateStore: getStore})
            }
          />
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <AppButton
            title={'Buy Options'}
            style={{
              margin: 5,
              width: 200,
              padding: 15,
              backgroundColor: colors.white,
              shadow: {width: 10, height: 0},
            }}
            onPress={() => setShowBuyOptions(!showBuyOptions)}
          />
        </View>

        {showBuyOptions && (
          <View style={styles.cardContainer}>
            <HomeCard
              fa5
              name="shopping-cart"
              title="Search Product"
              onPress={() =>
                navigation.navigate('PurchaseOrdersStack', {
                  screen: 'searchProducts',
                })
              }
            />
            {/* <HomeCard
            ii
            name="ios-stats-chart-sharp"
            title="Statistics"
            onPress={() => navigation.navigate('StatStack')}
          /> */}
            <HomeCard
              order
              title="Create Purchase Orders"
              onPress={() => navigation.navigate('PurchaseOrdersStack')}
            />
          </View>
        )}

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <AppButton
            title={'Sell Options'}
            style={{
              margin: 5,
              width: 200,
              padding: 15,
              backgroundColor: colors.white,
              shadow: {width: 10, height: 0},
            }}
            onPress={() => setShowSellOptions(!showSellOptions)}
          />
        </View>

        {showSellOptions && (
          <View style={styles.cardContainer}>
            <HomeCard
              mci
              name="face"
              title="Create"
              // subtitle="Salesman - Dispatcher - SubAdmin"
              onPress={() => navigation.navigate('CreateStack')}
            />
          </View>
        )}
        {showSellOptions && (
          <View style={styles.cardContainer}>
            <HomeCard
              fa
              name="product-hunt"
              title="Create Product"
              onPress={() => navigation.navigate('ProductServicesStack')}
            />
            <HomeCard
              mi
              name="show-chart"
              title="Create Promotion"
              onPress={() => navigation.navigate('Promotion and Offer')}
            />
          </View>
        )}

        <View style={styles.cardContainer}>
          {/* <HomeCard
            mi
            name="settings"
            title="Edit / Update Store"
            onPress={() =>
              navigation.navigate('CreateStore', {updateStore: getStore})
            }
          /> */}
          <HomeCard
            ii
            name="grid"
            title="Dashboard"
            onPress={() => navigation.navigate('DashboardStack')}
          />
          <HomeCard
            ii
            name="ios-stats-chart-sharp"
            title="Statistics"
            onPress={() => navigation.navigate('StatStack')}
          />
          <HomeCard
            entypo
            name="mail"
            title="Mailbox"
            onPress={() => navigation.navigate('MailStack')}
          />
        </View>

        {/* <View style={styles.cardContainer}>
          <HomeCard
            mci
            name="camera"
            title="Survey Designer"
            onPress={() => console.log('Dashboard >>>Survey Designer')}
          />
          <HomeCard
            order
            title="Orders"
            onPress={() => navigation.navigate('OrdersStack')}
          />
        </View> */}
        {/* <View style={styles.cardContainer}>
          <HomeCard
            mci
            name="face"
            title="New Stores / Cusomers"
            onPress={() => navigation.navigate('New Stores / Customers')}
          />
          <HomeCard
            order
            title="Purchase Orders"
            onPress={() => navigation.navigate('PurchaseOrdersStack')}
          />
        </View> */}
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
    backgroundColor: colors.light,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  storeInfo: {
    flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfoHead: {
    fontSize: 20,
  },
  storeInfoText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
