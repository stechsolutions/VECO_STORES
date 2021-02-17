import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';

const index = () => {
  return (
    <Screen style={styles.container}>
      <ScrollView style={{padding: 20}}>
        <View style={styles.containerView}>
          <View style={styles.userContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/mosh.jpg')}
            />
            <Text style={styles.title}>Ashhar Imam</Text>
          </View>
          <Text style={styles.issueTitle}>Issue</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            repellat molestias obcaecati. Explicabo numquam est cumque error
            qui! Perferendis eius quasi nobis et aliquam nemo dolore id tenetur
            explicabo unde.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  userContainer: {
    alignItems: 'center',
    padding: '10%',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 10,
  },
  issueTitle: {
    fontSize: 20,
  },
  containerView: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
  },
  paragraph: {
    color: colors.dark,
    marginHorizontal: 10,
  },
});
