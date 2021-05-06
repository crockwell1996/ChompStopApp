import * as React from 'react';
import cartGlobals from './ordering.global';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  View,
} from 'react-native';
import {useState} from 'react';

const orderSumm = cartGlobals.orderSummary;
const cartItems = cartGlobals.cart;

// React render the order summary for display
const OrderSummary = ({navigation}) => {
  calculateOrderSummary();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Text style={styles.title}>PAYMENT SUCCESSFUL</Text>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={{marginTop: 10, alignSelf: 'center'}}>
            Your order #0001 is being prepared.
          </Text>
        </View>
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.paymentButton, {width: '80%', alignSelf: 'center'}]}
            android_ripple={{color: '#c7c7c7'}}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate('Home');
              cartGlobals.cart = [];
              calculateOrderSummary();
            }}>
            <Text style={[styles.title, {padding: 5}]}>Okay</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={[styles.centeredView, {alignSelf: 'center', width: '80%'}]}>
        {RenderCartSummary()}
      </View>
      <View style={styles.centeredView}>
        <Pressable
          style={styles.paymentButton}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() => setModalVisible(true)}>
          <Text style={[styles.title, {padding: 5}]}>Tap to Pay</Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.centeredView,
          {alignSelf: 'center', position: 'absolute', bottom: 10},
        ]}>
        {RenderOrderSummary()}
      </View>
    </View>
  );
};

const RenderCartSummary = () => {
  const GetItem = ({item}) => (
    <View style={styles.item}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.title}</Text>
        <Text style={styles.itemDetailsText}>Qty: {item.qty}</Text>
        <Text style={styles.itemDetailsText}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.itemView}>
      <FlatList
        data={cartGlobals.cart}
        renderItem={GetItem}
        keyExtractor={item => item.title}
        // extraData={cartItems}
      />
    </View>
  );
};

const RenderOrderSummary = () => {
  return Object.keys(orderSumm).map(amntLine => {
    const amountLine = orderSumm[amntLine];
    return (
      <Text key={amntLine} style={[styles.title, {alignSelf: 'center'}]}>
        {amountLine.title}: ${amountLine.amount}
      </Text>
    );
  });
};

// Calculate and update the order summary if needed
const calculateOrderSummary = () => {
  // Return accumulated sum
  const getSum = (total, price) => {
    const sum = total + price;
    return sum;
  };
  // Assign totals from cart data
  const subtotal = cartItems
    .map(item => item.price * item.qty)
    .reduce(getSum, 0);
  const tax = subtotal ? 0.07 * subtotal : 0;
  // const discount = 0;
  const grandTotal = subtotal ? subtotal + tax : 0;

  for (const [totalType, totalDetails] of Object.entries(orderSumm)) {
    if (totalType === 'subtotal') {
      cartGlobals.orderSummary.subtotal.amount = roundToTwo(subtotal);
    }
    if (totalType === 'tax') {
      cartGlobals.orderSummary.tax.amount = roundToTwo(tax);
    }
    /*if (totalType === 'discount') {
      discount
    }*/
    if (totalType === 'grandTotal') {
      cartGlobals.orderSummary.grandTotal.amount = roundToTwo(grandTotal);
    }
  }

  function roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  console.log('Updated cart summary:', cartGlobals.orderSummary);
};

const OrderSummaryHelpers = {
  OrderSummary,
  calculateOrderSummary,
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
    alignSelf: 'center',
  },
  itemView: {
    top: 5,
    height: '83%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 2,
  },
  itemDetailsText: {
    fontSize: 18,
    marginLeft: 'auto',
  },
  item: {
    padding: 5,
    borderRadius: 5,
    borderColor: '#717171',
    borderWidth: 0.5,
    marginBottom: 4,
  },
  paymentButton: {
    borderRadius: 25,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#018ce8',
    marginBottom: 0,
    padding: 0,
    height: 50,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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

export default OrderSummaryHelpers;
