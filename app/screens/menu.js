import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import menu from '../database/menu';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NumericInput from 'react-native-numeric-input';
import CheckoutHelpers from '../ordering/cart';
import {useEffect} from 'react';

const NestedStack = createStackNavigator();
const menuData = menu();

const Menu = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Menu Layout"
        component={RenderMenuPress}
        options={{title: 'Menu', headerShown: false}}
      />
      {renderMenuSectionScreens()}
    </NestedStack.Navigator>
  );
};

const renderMenuSectionScreens = () => {
  return Object.keys(menuData).map(menuSection => {
    return (
      <NestedStack.Screen
        name={toTitleCase(menuSection)}
        key={menuSection}
        component={RenderSectionItemScreen}
        options={{title: toTitleCase(menuSection)}}
      />
    );
  });
};

const RenderMenuPress = () => {
  const navigation = useNavigation();
  const renderPressables = () => {
    return Object.keys(menuData).map(menuSection => {
      return (
        <Pressable
          style={styles.tile}
          key={menuSection}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() =>
            navigation.navigate(toTitleCase(menuSection), {
              screen: toTitleCase(menuSection),
              menuSection: menuSection,
            })
          }>
          <Text style={styles.title}>{toTitleCase(menuSection)}</Text>
        </Pressable>
      );
    });
  };
  return <View style={styles.centeredView}>{renderPressables()}</View>;
};

const RenderSectionItemScreen = ({route, navigation}) => {
  const GetItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.itemDescText, {paddingBottom: 5}]}>
          {item.description}
        </Text>
        <View style={styles.cartOptionsRow}>
          <View>
            <Text style={styles.itemDetailsText}>
              Calories: {item.calories}
            </Text>
            <Text style={styles.itemDetailsText}>Price: ${item.price}</Text>
          </View>
          <View
            style={{
              marginBottom: '2%',
              marginLeft: 'auto',
            }}>
            <Image
              source={item.imageRef}
              fadeDuration={300}
              resizeMethod={'resize'}
              resizeMode={'stretch'}
              style={styles.image}
            />
            <NumericInput
              totalWidth={150}
              totalHeight={50}
              iconSize={25}
              onChange={value => (item.qty = value)}
              valueType="integer"
              value={0}
              minValue={1}
              maxValue={20}
              rounded={true}
              type="plus-minus"
              textColor="#B0228C"
              iconStyle={{color: '#ffffff'}}
              rightButtonBackgroundColor="#006400"
              leftButtonBackgroundColor="#c7c7c7"
              reachMinDecIconStyle={{color: '#999999'}}
              reachMaxIncIconStyle={{color: '#999999'}}
            />
          </View>
        </View>
        <Pressable
          style={styles.addToCart}
          key={item.title}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() => {
            if (item.qty && item.qty > 0) {
              CheckoutHelpers.UpdateCart(item);
            }
          }}>
          <Text style={styles.title}>Add to Cart</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.itemView}>
        <FlatList
          data={menuData[route.params.menuSection]}
          renderItem={GetItem}
          keyExtractor={item => item.title}
        />
      </View>
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.placeOrderBottom, styles.button]}
          onPress={() => navigation.navigate('Place Order')}>
          <Text style={styles.title}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  );
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#13bd9c',
    borderRadius: 5,
    borderColor: '#717171',
    borderWidth: 0.5,
    height: 45,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 50,
    alignSelf: 'center',
    // borderRadius: 100,
    marginBottom: 3,
  },
  itemDescText: {
    fontSize: 18,
  },
  itemDetailsText: {
    fontSize: 15,
  },
  item: {
    padding: 5,
    borderRadius: 5,
    borderColor: '#717171',
    borderWidth: 0.5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cartOptionsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  addToCart: {
    backgroundColor: '#a01c1c',
    borderRadius: 5,
    borderColor: '#717171',
    borderWidth: 0.5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderBottom: {
    position: 'absolute',
    bottom: 25,
  },
  button: {
    borderRadius: 8,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#ffab02',
    marginBottom: 5,
    padding: 0,
    height: 40,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
