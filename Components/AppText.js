import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {IMLocalized} from '../i18n/Localize';

function AppText({children, ...otherProps}) {
  return <Text {...otherProps}>{IMLocalized(children)}</Text>;
}

const styles = StyleSheet.create({
  container: {},
});

export default AppText;
