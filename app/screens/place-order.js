import * as React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import CheckoutHelpers from '../ordering/cart';
import NumericInput from 'react-native-numeric-input';
import cartGlobals from '../ordering/ordering.global';
import {useState} from 'react';
import OrderSummaryHelpers from '../ordering/order-summary';

const PlaceOrder = ({navigation}) => {
  const GetItem = ({item}) => (
    <View style={styles.item}>
      <Text style={[styles.title, {textAlign: 'center'}]}>{item.title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <Pressable
          style={styles.removeFromCart}
          key={item.title}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() => {
            CheckoutHelpers.RemoveFromCart(item);
            // setCartItems(cartGlobals.cart);
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>X</Text>
        </Pressable>
        <Text style={styles.itemDetailsText}>${item.price}</Text>
        <Text style={styles.itemDetailsText}>Qty:</Text>
        <NumericInput
          totalWidth={125}
          totalHeight={40}
          iconSize={25}
          onChange={value => {
            item.qty = value;
            CheckoutHelpers.UpdateCartLineItem(item);
            // Trigger a re-render upon updating cart item qty
          }}
          valueType="integer"
          value={item.qty}
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
  );
  const RenderCartPage = () => {
    if (cartGlobals.cart.length) {
      OrderSummaryHelpers.calculateOrderSummary();
      return (
        <View style={styles.centeredView}>
          <View style={styles.centeredView}>
            <Text style={styles.title}>
              Subtotal: ${cartGlobals.orderSummary.subtotal.amount}
            </Text>
          </View>
          <View style={styles.centeredView}>
            <Pressable
              style={[styles.checkoutProceed, styles.checkoutButton]}
              onPress={() => navigation.navigate('Order Summary')}>
              <Text style={styles.title}>Proceed to Checkout</Text>
            </Pressable>
          </View>
          <View style={styles.itemView}>
            <FlatList
              data={cartGlobals.cart}
              renderItem={GetItem}
              keyExtractor={item => item.title}
              // extraData={cartItems}
            />
          </View>
          <View style={styles.centeredView}>
            <Pressable
              style={[styles.backToMenu, styles.menuButton]}
              onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.title}>Go to Menu</Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.centeredView}>
          <Text style={[styles.centeredView, styles.title]}>
            You have no items in your cart.
          </Text>
          <View style={styles.centeredView}>
            <Pressable
              style={[styles.backToMenu, styles.menuButton]}
              onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.title}>Go to Menu</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  };

  return RenderCartPage();
};

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
    top: 5,
    height: '83%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  itemDetailsText: {
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item: {
    padding: 5,
    borderRadius: 5,
    borderColor: '#717171',
    borderWidth: 0.5,
    marginBottom: 4,
  },
  removeFromCart: {
    backgroundColor: '#a01c1c',
    borderRadius: 5,
    borderColor: '#717171',
    borderWidth: 0.5,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
    marginRight: 'auto',
  },
  checkoutProceed: {
    position: 'absolute',
    top: 0,
  },
  backToMenu: {
    position: 'absolute',
    bottom: 10,
  },
  checkoutButton: {
    borderRadius: 8,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#49dc14',
    marginBottom: 5,
    padding: 0,
    height: 40,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    borderRadius: 8,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#DC143C',
    marginBottom: 5,
    padding: 0,
    height: 40,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaceOrder;
