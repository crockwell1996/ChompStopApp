import * as React from 'react';
import {Alert, Pressable, Text, View, StyleSheet, Linking} from 'react-native';
import locations from '../database/locations';

const restaurantLocs = locations();

const Locations = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      {renderLocPress()}
    </View>
  );
};

const renderLocPress = () => {
  return restaurantLocs.map(location => {
    return (
      <Pressable
        style={styles.tile}
        key={location.city}
        android_ripple={{color: '#d0bdbd'}}
        onPress={() => {
          Linking.canOpenURL(
            `geo:${location.coordinates.latitude},${location.coordinates.longitude}`,
          )
            .then(success => {
              if (success) {
                Linking.openURL(`geo:0,0?q=Houligan's%20${location.city}`).then(
                  {},
                );
              }
            })
            .catch(err => {
              Alert.alert('An error occurred.', `${err}`);
            });
        }}>
        <Text>{location.city}</Text>
        <Text style={styles.callToAction}>GET DIRECTIONS</Text>
      </Pressable>
    );
  });
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#c6a2a2',
    borderRadius: 8,
    borderColor: '#717171',
    borderWidth: 0.5,
    height: 150,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  callToAction: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});

export default Locations;
