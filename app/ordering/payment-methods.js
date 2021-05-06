import {StyleSheet, Text, View} from 'react-native';

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text>Pay here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Payment;
