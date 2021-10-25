import React, {useState, useEffect} from 'react';
import AppText from '../../Components/AppText';
import {View, ScrollView, StyleSheet} from 'react-native';
import Screen from '../../Components/Screen';
import colors from '../../config/colors';
import AppImageTitleView from '../../Components/AppImageTitleView';
import AppButton from '../../Components/AppButton';
import AppInfoCard from '../../Components/AppInfoCard';

export default function index({navigation, route}) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    var product = route.params.product;
    setProduct(product);
    console.log(product, 'product');
  }, []);

  return (
    <Screen style={styles.container}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <AppImageTitleView image={product.image} title={product.productName} />
        <View style={styles.contentContainer}>
          <AppInfoCard
            titleStyle={{fontWeight: 'bold', paddingVertical: 10}}
            viewStyle={{margin: 10}}
            title="Information"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maxime natus vitae voluptatem minima temporibus ipsam eaque illo odit illum asperiores facere officia architecto tempora eum explicabo omnis non enim."
          />
          <AppInfoCard
            titleStyle={{fontWeight: 'bold', paddingVertical: 10}}
            viewStyle={{margin: 10}}
            title="Information"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maxime natus vitae voluptatem minima temporibus ipsam eaque illo odit illum asperiores facere officia architecto tempora eum explicabo omnis non enim."
          />
          <AppInfoCard
            titleStyle={{fontWeight: 'bold', paddingVertical: 10}}
            viewStyle={{margin: 10}}
            title="Information"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, maxime natus vitae voluptatem minima temporibus ipsam eaque illo odit illum asperiores facere officia architecto tempora eum explicabo omnis non enim."
          />
        </View>
        <View style={styles.btnContainer}>
          <AppButton
            title="DELETE"
            style={[styles.btn, styles.btnDelete]}
            color={colors.white}
            onPress={() =>
              Alert.alert(
                'Are your Sure?',
                'you want to delete this product',
                [
                  {
                    text: 'yes',
                    onPress: () =>
                      route.params.deleteProduct(product.productId),
                  },
                  {text: 'cancel'},
                ],
                {cancelable: false},
              )
            }
          />
          <AppButton
            title="UPDATE"
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
    marginBottom: 20,
  },
  contentContainer: {
    marginVertical: 10,
  },
});
