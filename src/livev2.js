import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import requestLocationPermission from './permission'

var styles = require('./styles');


export default class SensorsComponent extends Component {

  constructor() {
    super()
    this.manager = new BleManager() //initialize
    this.state = {info: "", values: {}} //initialize
    this.prefixUUID = "f000aa" //NOT SURE
    this.suffixUUID = "-0451-4000-b000-000000000000" //NOT SURE
  }



  info(message) {
    this.setState({info: message})
  }

  error(message) {
    this.setState({info: "ERROR: " + message})
  }

  updateValue(key, value) {
    this.setState({values: {...this.state.values, [key]: value}})
  }


  //Force iOS to scan
  componentWillMount() {
   if (Platform.OS === 'ios') {
     this.manager.onStateChange((state) => {
       if (state === 'PoweredOn') this.scanAndConnect()
     })
   } else {
     this.scanAndConnect()
   }
  }

  //Scan and connects to device
  scanAndConnect() {
  this.manager.startDeviceScan(null,
                               null, (error, device) => {


      });
    }


  render() { //render results
    return (
      <View>
        <Text>{this.state.info}</Text>
        {Object.keys(this.sensors).map((key) => {
          return <Text key={key}>
                   {this.sensors[key] + ": " + (this.state.values[this.notifyUUID(key)] || "-")}
                 </Text>
        })}
      </View>
    )
  }
}
