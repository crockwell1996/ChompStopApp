/**
 * Chomp Stop React-Native App
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// import Header from './app/components/header';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Custom Screens folder composed of screen js files
import Screens from './app/screens/index';
import OrderSummaryHelpers from './app/ordering/order-summary';
import Payment from './app/ordering/payment-methods';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Screens.Home}
          options={{title: 'Chomp Stop'}}
        />
        <Stack.Screen
          name="Menu"
          component={Screens.Menu}
          options={{title: 'Menu'}}
        />
        <Stack.Screen
          name="Locations"
          component={Screens.Locations}
          options={{title: 'Locations'}}
        />
        <Stack.Screen
          name="Place Order"
          component={Screens.PlaceOrder}
          options={{title: 'Cart'}}
        />
        <Stack.Screen
          name="Order Summary"
          component={OrderSummaryHelpers.OrderSummary}
          options={{title: 'Checkout'}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{title: 'Payment'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
