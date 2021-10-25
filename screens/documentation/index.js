import React from 'react';
import AppText from '../../Components/AppText';
import {View, ScrollView, StyleSheet} from 'react-native';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppImageTitleView from '../../Components/AppImageTitleView';
import AppButton from '../../Components/AppButton';
import AppInfoCard from '../../Components/AppInfoCard';

export default function index() {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <View style={styles.contentContainer}>
          <AppInfoCard
            title="Information"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maxime natus vitae voluptatem minima temporibus ipsam eaque illo odit illum asperiores facere officia architecto tempora eum explicabo omnis non enim."
          />
          <AppInfoCard
            title="Information"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maxime natus vitae voluptatem minima temporibus ipsam eaque illo odit illum asperiores facere officia architecto tempora eum explicabo omnis non enim."
          />
          <AppInfoCard
            title="Information"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maxime natus vitae voluptatem minima temporibus ipsam eaque illo odit illum asperiores facere officia architecto tempora eum explicabo omnis non enim."
          />
        </View>
        <View style={styles.btnContainer}>
          <AppButton
            title="DELETE"
            style={[styles.btn, styles.btnDelete]}
            color={colors.white}
            onPress={() => console.log('Create Promotion >>> Button')}
          />
          <AppButton
            title="CREATE"
            style={styles.btn}
            color={colors.primary}
            onPress={() => console.log('Create Promotion >>> Button')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  btn: {
    width: 100,
    padding: 15,
  },
  btnDelete: {
    backgroundColor: '#FF4E00',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  contentContainer: {
    marginVertical: 10,
  },
});
