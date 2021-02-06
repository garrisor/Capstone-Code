import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

var styles = require('./styles');


export default function LiveScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.graphBox}>
        <Text>Dosiflexion curve will go here.</Text>
      </View>
      <View style={styles.displayBox2}>
        <Text style={styles.displayBoxTitle}>Live Range</Text>
        <Text style={styles.displayBoxDataText}>9 &deg;</Text>
      </View>
      <View style={styles.settingsBoxToggle}>
        <Text>Live audio feedback?</Text>
      </View>
    </View>
  );
}

/*

export default class BLEtest extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
            this.scanAndConnect();
            subscription.remove();
        }
    }, true);
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            return
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        if (device.name === 'TI BLE Sensor Tag' ||
            device.name === 'SensorTag') {

            // Stop scanning as it's not necessary if you are scanning for one device.
            this.manager.stopDeviceScan();

            // Proceed with connection.
        }
    });
  }

  render(props) {
    return(
    <View style={styles.settingsBoxToggle}>
      <Text>{this.props.device.name}</Text>
    </View>
    );
  }
}
*/
