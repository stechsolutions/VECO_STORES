import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StartNavigation from './navigation/StartNavigation';
// import Welcome from './screens/Welcome';
// import Stat from './screens/Statistic/Stat';
import SearchProduct from './screens/searchProducts/index'

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <StartNavigation />
      </NavigationContainer>
      {/* <EditProduct/> */}
      {/* <SearchProduct/> */}
      </>
      
  );
};
export default App;
