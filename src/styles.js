'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  titleText: {
    backgroundColor: '#ffffff',
    fontFamily: "Cochin",
    color: '#0384fc'
  },
  displayBoxTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0384fc'
  },
  displayBoxDataText: {
    fontSize: 30,
    color: '#0384fc'
  },
  background: {
    flex: 1,
    backgroundColor: '#0384fc',
    justifyContent: "space-around",
    alignItems: "center"
  },
  displayBox1: {
    width: '75%',
    height: '20%',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayBox2: {
    width: '80%',
    height: '20%',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayBox3: {
    width: '75%',
    height: '10%',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphBox: {
    width: '80%',
    height: '40%',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    //position: 'absolute',
    //top: 60
  },
  settingsBoxToggle: {
    width: '80%',
    height: '10%',
    borderRadius: 25,
    backgroundColor: '#364d5c',
    alignItems: 'center',
    justifyContent: 'center',
    //position: 'absolute',
    //top: 60
  }
});
