import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../../screens/Home';
import MailBox from '../../screens/MailBox';
import Dashboard from '../../screens/Dashboard';
import ProductServices from '../../screens/ProductServices';
import CreatePromotions from '../../screens/CreatePromotions';
import CreatedPromotions from '../../screens/CreatedPromotions';
import PromotionEditDelete from '../../screens/PromotionEditDelete';
import createDashboard from '../../screens/createDashboard';
import PromotionAndOffer from '../../screens/PromotionAndOffer';
import Orders from '../../screens/Orders';
import MailOpen from '../../screens/MailOpen';
import Stat from '../../screens/Statistic/Stat';
import NewStores from '../../screens/newStores';
import PurchaseOrders from '../../screens/purchaseOrders';
import VehicleInCirculation from '../../screens/VehicleInCirculation';
import OrdersOnTheWay from '../../screens/OrdersOnTheWay';
import createDelivery1 from '../../screens/createDelivery1';
import createDelivery2 from '../../screens/createDelivery2';
import UploadProduct from '../../screens/UploadProduct';
import PendingApprovalOrders from '../../screens/PendingApprovalOrders';
import ImportProductInventory from '../../screens/ImportProductInventory';
import ApprovedOrders from '../../screens/ApprovedOrders';
import PaidOrders from '../../screens/paidOrders';
import PendingDeliveries from '../../screens/PendingDeliveries';
import DeliveredOrders from '../../screens/DeliveredOrders';
import ReturnOrRejected from '../../screens/ReturnOrRejected';
import SeeProducts from '../../screens/SeeProducts';
import UpdateDeleteProduct from '../../screens/UpdateDeleteProduct';
import AssignDispatcher from '../../screens/assignDispatcher';
import ApproveOrDisapprove from '../../screens/approveOrDisapprove';
import UpdateDeleteStore from '../../screens/updateDeleteStore';
import Documentation from '../../screens/documentation';
import ListingAndDocumentation from '../../screens/listingAndDocumentation';
import StoreLocation from '../../screens/storeLocation';
import BlockStores from '../../screens/blockStores';
import EditPurchaseOrders from '../../screens/editPurchaseOrders';
import CreatePurchaseOrders from '../../screens/createPurchaseOrders';
import CreateNotes from '../../screens/createNotes';
import AssignProductDate from '../../screens/assignProductDate';
import Customers from '../../screens/Customers';
import Products from '../../screens/Products';
import ComplianceAndEffectiveness from '../../screens/ComplianceAndEffectiveness';
import ComplianceView from '../../screens/ComplianceView';
import Tasks from '../../screens/Tasks';
import AssignTasks from '../../screens/AssignTasks';
import AssignedTasks from '../../screens/AssignedTasks';
import CreateStore from '../../screens/CreateStore';
import ApplicationReview from '../../screens/ApplicationReview';
import Welcome from '../../screens/Welcome';
import EditStore from '../../screens/EditStore/index';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateSalesMan from '../../screens/createSalesMan/index';
import CreateSubAdmin from '../../screens/createSubAdmin/index';
import CreateDispatcher from '../../screens/createDispatcher/index';
import Recycle from '../../screens/recycle';
import ProductAddUpdate from '../../screens/productAddUpdate';
import EditProduct from '../../screens/editProduct';
import SearchProducts from '../../screens/searchProducts';
import SearchedProducts from '../../screens/searchedProducts';
import ProductDetail from '../../screens/productDetail';
import PendingOrders from '../../screens/pendingOrders/index';
import StoreAndDetails from '../../screens/storeAndDetails/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MakeDeposit from '../../screens/makeDeposit/index';
import colors from '../../config/colors';
import UpdateStore from '../../screens/updateStore';
import UpdateStore2 from '../../screens/updateStore2';
import CheckOut from '../../screens/checkOut';
import CartIcon from '../../Components/cartIcon';
import PaymentMethods from '../../screens/paymentMethods/index';
import OrderCompletion from '../../screens/orderCompletion/index';
import PendingOrderDetail from '../../screens/pendingOrderDetail';
import CompleteReception from '../../screens/completeReception';
import CreditNotes from '../../screens/creditNotes';
import CreditNoteDetail from '../../screens/creditNoteDetail';

import LoginNavigation from '../LoginNavigation/index';
import {IMLocalized} from '../../i18n/Localize';

const Stack = createStackNavigator();

const CreateStoreNavigation = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="ApplicationReview"
      component={ApplicationReview}
      options={(navigation) => ({
        title: IMLocalized('Application Review'),
        headerRight: () => (
          <AntDesign
            name="poweroff"
            size={20}
            onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  AsyncStorage.removeItem('user').then(() => {
                    goToStart();
                  });
                  AsyncStorage.clear().then(() => {
                    goToStart();
                  });
                });
            }}
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 15,
        },
      })}
    />
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={({navigation, goToStart}) => ({
        title: 'Welcome',
        headerRight: () => (
          <AntDesign
            name="poweroff"
            size={20}
            onPress={() => {
              goToStart();
              // auth().signOut()
              //   .then(() => {
              //     AsyncStorage.removeItem("user")
              //       .then(() => {
              //         goToStart();
              //       })
              //   })
            }}
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 15,
        },
      })}
    />
    <Stack.Screen
      name="CreateStore"
      component={Welcome}
      options={({navigation}) => ({
        headerLeft: () => (
          <Entypo
            name="chevron-thin-left"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Admin Approval"
      component={ApplicationReview}
      options={{title: IMLocalized('Admin Approval')}}
    />
  </Stack.Navigator>
);
const MailStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Mailbox"
      component={MailBox}
      options={({navigation}) => ({
        title: IMLocalized('Mailbox'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Mail Open"
      component={MailOpen}
      options={{title: IMLocalized('Mail Open')}}
    />
  </Stack.Navigator>
);
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={({navigation}) => ({
        title: IMLocalized('Dashboard'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Vehicle in circulation"
      component={VehicleInCirculation}
      options={{title: IMLocalized('Vehicle in circulation')}}
    />
    <Stack.Screen
      name="Order in circulation"
      component={VehicleInCirculation}
      options={{title: IMLocalized('Order in circulation')}}
    />
    <Stack.Screen
      name="Pending Deliveries"
      component={VehicleInCirculation}
      options={{title: IMLocalized('Pending Deliveries')}}
    />
    <Stack.Screen
      name="Orders on the way"
      component={OrdersOnTheWay}
      options={{title: IMLocalized('Orders on the way')}}
    />
    <Stack.Screen
      name="recycle"
      component={Recycle}
      options={{title: IMLocalized('Recycling')}}
    />
  </Stack.Navigator>
);
const UpdateStoreStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="UpdateStore1"
      component={UpdateStore}
      options={({navigation}) => ({
        title: IMLocalized('Update Store'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="UpdateStore2"
      component={UpdateStore2}
      options={({navigation}) => ({
        title: IMLocalized('Update Store'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
  </Stack.Navigator>
);
const CreateStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Dashboard"
      component={createDashboard}
      options={({navigation}) => ({
        title: IMLocalized('Dashboard'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="createSalesMan"
      component={CreateSalesMan}
      options={{title: IMLocalized('Create SalesMan')}}
    />
    <Stack.Screen
      name="createSubAdmin"
      component={CreateSubAdmin}
      options={{title: IMLocalized('Create SubAdmin')}}
    />
    <Stack.Screen
      name="createDispatcher"
      component={CreateDispatcher}
      options={{title: IMLocalized('Create Dispatcher')}}
    />
  </Stack.Navigator>
);
const CreatePromotionsStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Promotion and offers"
      component={PromotionAndOffer}
      options={({navigation}) => ({
        title: IMLocalized('Promotion and offers'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Create promotions"
      component={CreatePromotions}
      options={{title: IMLocalized('Create promotions')}}
    />
    <Stack.Screen
      name="Created promotions"
      component={CreatedPromotions}
      options={{title: IMLocalized('Created promotions')}}
    />
    <Stack.Screen
      name="Edit promotion"
      component={PromotionEditDelete}
      options={{title: IMLocalized('Edit promotion')}}
    />
  </Stack.Navigator>
);
const ProductServicesStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="ProductAddUpdate"
      component={ProductAddUpdate}
      options={({navigation}) => ({
        title: IMLocalized('Products'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="uploadProduct"
      component={UploadProduct}
      options={{title: IMLocalized('Upload Product')}}
    />
    <Stack.Screen
      name="editProduct"
      component={EditProduct}
      options={{title: IMLocalized('Edit Product')}}
    />
  </Stack.Navigator>
);
const OrdersStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Orders"
      component={Orders}
      options={({navigation}) => ({
        title: IMLocalized('Orders'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Pending approval orders"
      component={PendingApprovalOrders}
      options={{title: IMLocalized('Pending approval orders')}}
    />
    <Stack.Screen
      name="Approved orders"
      component={ApprovedOrders}
      options={{title: IMLocalized('Approved orders')}}
    />
    <Stack.Screen
      name="Paid orders"
      component={PaidOrders}
      options={{title: IMLocalized('Paid orders')}}
    />
    <Stack.Screen
      name="Pending deliveries"
      component={PendingDeliveries}
      options={{title: IMLocalized('Pending deliveries')}}
    />
    <Stack.Screen
      name="Delivered orders"
      component={DeliveredOrders}
      options={{title: IMLocalized('Delivered orders')}}
    />
    <Stack.Screen
      name="Returned or rejected"
      component={ReturnOrRejected}
      options={{title: IMLocalized('Returned or rejected')}}
    />
  </Stack.Navigator>
);
const NewStoreStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="New store / customers"
      component={NewStores}
      options={{title: IMLocalized('New store / customers')}}
    />
    <Stack.Screen
      name="Assign dispatcher"
      component={AssignDispatcher}
      options={{title: IMLocalized('New store / customers')}}
      options={{title: IMLocalized('Assign dispatcher')}}
    />
    <Stack.Screen
      name="Block or delete stores"
      component={BlockStores}
      options={{title: IMLocalized('Block or delete stores')}}
    />
    <Stack.Screen
      name="Update / delete store"
      component={UpdateDeleteStore}
      options={{title: IMLocalized('Update / delete store')}}
    />
    <Stack.Screen
      name="Listing and documentation"
      component={ListingAndDocumentation}
      options={{title: IMLocalized('Listing and documentation')}}
    />
    <Stack.Screen
      name="Documentation"
      component={Documentation}
      // options={{title: IMLocalized('Name of documentation')}}
      options={{title: IMLocalized('Documentation')}}
    />
    <Stack.Screen
      name="Store location"
      component={StoreLocation}
      options={{title: IMLocalized('Store location')}}
    />
  </Stack.Navigator>
);
const PurchaseOrdersStack = () => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    getCart();
  });

  const getCart = async () => {
    var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));
    console.log(cart, 'cartt in home nav');
    var count = 0;
    if (cart) {
      for (var i = 0; i < cart.length; i++) {
        console.log(cart[i].products.length, 'cart[i]');
        if (cart[i].products.length) {
          count += cart[i].products.length;
        }
      }
      setCount(count);
    }
  };

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Purchase orders"
        component={PurchaseOrders}
        options={({navigation}) => ({
          title: IMLocalized('Purchase Orders'),
          headerLeft: () => (
            <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
        })}
      />
      <Stack.Screen name="searchProducts" options={{headerShown: false}}>
        {(props) => (
          <SearchProductsStack
            {...props}
            count={count}
            setCount={(count) => setCount(count)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{title: IMLocalized('Pending Orders')}}
        name="pendingOrders"
        component={PendingOrders}
      />
      <Stack.Screen
        options={{title: IMLocalized('Order Status')}}
        name="pendingOrderDetail"
        component={PendingOrderDetail}
      />
      <Stack.Screen
        options={{title: IMLocalized('Complete Reception')}}
        name="completeReception"
        component={CompleteReception}
      />
      <Stack.Screen
        options={{title: IMLocalized('Credit Notes')}}
        name="creditNotes"
        component={CreditNotes}
      />
      <Stack.Screen
        options={{title: IMLocalized('Credit Note Details')}}
        name="creditNoteDetail"
        component={CreditNoteDetail}
      />

      <Stack.Screen
        name="makeDeposit"
        component={MakeDeposit}
        options={{title: IMLocalized('Make Deposit')}}
      />
      <Stack.Screen
        name="Create purchase orders"
        component={CreatePurchaseOrders}
        options={{title: IMLocalized('Create purchase orders')}}
      />
      <Stack.Screen
        name="Assign / edit product delivery date"
        component={AssignProductDate}
        options={{title: IMLocalized('Assign / edit product delivery date')}}
      />
      <Stack.Screen
        name="Paid orders"
        component={PaidOrders}
        options={{title: IMLocalized('Paid orders')}}
      />
      <Stack.Screen
        name="Create notes"
        component={CreateNotes}
        options={{title: IMLocalized('Create notes')}}
      />
    </Stack.Navigator>
  );
};
const StatStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Statistics"
      component={Stat}
      options={({navigation}) => ({
        title: IMLocalized('Statistics'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Customers"
      component={Customers}
      options={{title: IMLocalized('Customers')}}
    />
    <Stack.Screen
      name="Products"
      component={Products}
      options={{title: IMLocalized('Products')}}
    />
    <Stack.Screen
      name="StoreAndDetails"
      component={StoreAndDetails}
      options={{title: IMLocalized('Store And Details')}}
    />
    <Stack.Screen
      name="My Dealers"
      component={ComplianceAndEffectiveness}
      options={{title: IMLocalized('My Dealers')}}
    />
    <Stack.Screen
      name="Compliance view"
      component={ComplianceView}
      options={{title: IMLocalized('Compliance view')}}
    />
  </Stack.Navigator>
);
const TasksStack = () => (
  <Stack.Navigator Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Tasks"
      component={Tasks}
      options={({navigation}) => ({
        title: IMLocalized('Tasks'),
        headerLeft: () => (
          <Entypo name="home" size={25} onPress={() => navigation.goBack()} />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
      })}
    />
    <Stack.Screen
      name="Assign tasks"
      component={AssignTasks}
      options={{title: IMLocalized('Assign tasks')}}
    />
    <Stack.Screen
      name="Assigned tasks"
      component={AssignedTasks}
      options={{title: IMLocalized('Assigned tasks')}}
    />
  </Stack.Navigator>
);
const SearchProductsStack = ({count, setCount}) => (
  <Stack.Navigator Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="SearchProductStack"
      // component={SearchProducts}
      options={({navigation}) => ({
        title: IMLocalized('Search Products'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <CartIcon
            onPress={() => navigation.navigate('CheckOut')}
            items={count || 0}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 20,
        },
      })}>
      {(props) => (
        <SearchProducts {...props} cartCount={count} setCartCount={setCount} />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="SearchedProducts"
      component={SearchedProducts}
      options={({navigation}) => ({
        title: IMLocalized('Searched Products'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <CartIcon
            onPress={() => navigation.navigate('CheckOut')}
            items={count || 0}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 20,
        },
      })}
    />
    <Stack.Screen
      name="ProductDetail"
      // component={ProductDetail}
      options={({navigation}) => ({
        title: IMLocalized('Product Detail'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <CartIcon
            onPress={() => navigation.navigate('CheckOut')}
            items={count || 0}
          />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 20,
        },
      })}>
      {(props) => (
        <ProductDetail {...props} cartCount={count} setCartCount={setCount} />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="CheckOut"
      // component={CheckOut}
      options={({navigation}) => ({
        title: IMLocalized('Order Summary'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
      })}>
      {(props) => (
        <CheckOut {...props} cartCount={count} setCartCount={setCount} />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="PaymentMethods"
      component={PaymentMethods}
      options={({navigation}) => ({
        title: IMLocalized('Payment Methods'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    />
    <Stack.Screen
      name="OrderCompletion"
      // component={OrderCompletion}
      options={({navigation}) => ({
        title: IMLocalized('Order Completed'),
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={25}
            onPress={() => navigation.navigate('SearchProductStack')}
          />
        ),
      })}>
      {(props) => (
        <OrderCompletion {...props} cartCount={count} setCartCount={setCount} />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const index = ({goToStart}) => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    getCart();
  });

  const getCart = async () => {
    var cart = JSON.parse(await AsyncStorage.getItem('storeCart'));
    console.log(cart, 'cartt in home nav');
    var count = 0;
    if (cart) {
      for (var i = 0; i < cart.length; i++) {
        console.log(cart[i].products.length, 'cart[i]');
        if (cart[i].products.length) {
          count += cart[i].products.length;
        }
      }
      setCount(count);
    }
  };
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="ApplicationReview"
        component={ApplicationReview}
        options={(navigation) => ({
          title: IMLocalized('Application Review'),
          headerRight: () => (
            <AntDesign
              name="poweroff"
              size={20}
              onPress={() => {
                goToStart();
                AsyncStorage.removeItem('user').then(() => {
                  goToStart();
                });
                AsyncStorage.clear().then(() => {
                  goToStart();
                });
              }}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={(navigation) => ({
          title: IMLocalized('Dashboard'),
          headerRight: () => (
            <AntDesign
              name="poweroff"
              size={20}
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => {
                    AsyncStorage.removeItem('user').then(async () => {
                      await AsyncStorage.removeItem('store');
                      // goToStart();
                      navigation.navigation.reset({
                        routes: [{name: 'LoginNavigation'}],
                      });
                    });
                  });
              }}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 15,
          },
          headerLeft: () => (
            <View
              style={{
                borderRadius: 50,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
                backgroundColor: '#FFFFFF',
              }}>
              <Text>50</Text>
              <FontAwesome5 name="coins" size={30} color="#E7BF4E" />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="LoginNavigation"
        component={LoginNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatStack"
        component={StatStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateStoreStack"
        component={UpdateStoreStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MailStack"
        component={MailStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateStack"
        component={CreateStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductServicesStack"
        component={ProductServicesStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Promotion and Offer"
        component={CreatePromotionsStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrdersStack"
        component={OrdersStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="New Stores / Customers"
        component={NewStoreStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PurchaseOrdersStack"
        component={PurchaseOrdersStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TasksStack"
        component={TasksStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateStore"
        component={EditStore}
        options={{headerShown: false}}
      />
      <Stack.Screen name="searchProductStack" options={{headerShown: false}}>
        {(props) => (
          <SearchProductsStack
            {...props}
            count={count}
            setCount={(count) => setCount(count)}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default index;
