import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={require('../images/chomp-stop-logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>Menu</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() => navigation.navigate('Place Order')}>
          <Text style={styles.buttonText}>Place Order</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          android_ripple={{color: '#c7c7c7'}}
          onPress={() => navigation.navigate('Locations')}>
          <Text style={styles.buttonText}>Locations</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginTop: 0,
    alignSelf: 'center',
    borderRadius: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    overflow: 'hidden',
    borderRadius: 8,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#DC143C',
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  buttonText: {
    fontSize: 25,
    color: '#000000',
  },
});

export default Home;
