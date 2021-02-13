import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

var styles = require('./styles');

export default function HomeScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.displayBox1}>
        <Text style={styles.displayBoxTitle}>Hourly Range</Text>
        <Text style={styles.displayBoxDataText}>10 &deg;</Text>
      </View>
      <View style={styles.displayBox1}>
        <Text style={styles.displayBoxTitle}>Daily Range</Text>
        <Text style={styles.displayBoxDataText}>8 &deg;</Text>
      </View>
      <View style={styles.displayBox1}>
        <Text style={styles.displayBoxTitle}>Weekly Range</Text>
        <Text style={styles.displayBoxDataText}>9 &deg;</Text>
      </View>
    </View>
  );
}
