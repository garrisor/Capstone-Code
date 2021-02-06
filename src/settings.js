import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

var styles = require('./styles');

export default function SettingsScreen() {
  return (
    <View style={styles.background}>
      <Text>Settings!</Text>
    </View>
  );
}
