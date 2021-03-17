import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import requestLocationPermission from './permission'

var styles = require('./styles');

/*
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
*/


export default class SensorsComponent extends Component {

  constructor() {
    super()
    this.manager = new BleManager() //initialize
    this.state = {info: "", values: {}} //initialize
    this.prefixUUID = "f000aa" //NOT SURE
    this.suffixUUID = "-0451-4000-b000-000000000000" //NOT SURE
    this.sensors = { //Sensor names
      0: "Right Foot",
      1: "Left Foot"
    }
  }

  serviceUUID(num) {
    return this.prefixUUID + num + "0" + this.suffixUUID
  }

  notifyUUID(num) {
    return this.prefixUUID + num + "1" + this.suffixUUID
  }

  writeUUID(num) {
    return this.prefixUUID + num + "2" + this.suffixUUID
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
    this.info("Scanning...") //display message while scanning for device
    console.log(device)

    if (error) {
      this.error(error.message)
      return
    }


    if (device.name === 'NAME' || device.name === 'NAME') { //Search for these names
      this.info("Connecting to NAME")
      this.manager.stopDeviceScan() //Stop scan
      device.connect() //start connect
        .then((device) => {
          this.info("Discovering services and characteristics")
          return device.discoverAllServicesAndCharacteristics()
        })
        .then((device) => {
          this.info("Setting notifications")
          return this.setupNotifications(device)
        })
        .then(() => {
          this.info("Listening...")
        }, (error) => {
          this.error(error.message)
        })
    }
  });
}

//function that listens for results
async setupNotifications(device) {
    for (const id in this.sensors) {
      const service = this.serviceUUID(id)
      const characteristicW = this.writeUUID(id)
      const characteristicN = this.notifyUUID(id)

      const characteristic = await device.writeCharacteristicWithResponseForService(
        service, characteristicW, "AQ==" /* 0x01 in hex */
      )

      device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
        if (error) {
          this.error(error.message)
          return
        }
        this.updateValue(characteristic.uuid, characteristic.value)
      })
    }
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
