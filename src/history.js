import 'react-native-gesture-handler';
import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, List, Dimensions } from 'react-native';
import {ListItem} from 'react-native-elements'
import SQLite from 'react-native-sqlite-storage';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import DatePicker from 'react-native-datepicker'
var styles = require('./styles');
SQLite.DEBUG(true);

export default class History extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      data_array: [],
      date:"2016-05-15"
    }
    this.db = SQLite.openDatabase({name: "ankle.db", createFromLocation : 1}, this.successDB, this.failDB);
  }


  successDB = () => {
    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM dummy_data', [], (tx,results) => {
        let datalength = results.rows.length;
        let temp_array =[];
        if (datalength > 0) {
          for (let i = 0; i < datalength; i++) {
            temp_array.push(results.rows.item(i));
          }

          this.setState({
            count: datalength,
            data_array: temp_array
          });
        }
      }, this.failSQL);
    });
  }


/*
  successDB = () => {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO sample_data (time_point, data_point) VALUES (),(),(),(); SELECT * FROM sample_data', [], (tx,results) => {
        let datalength = results.rows.length;
        this.setState({
          count: datalength
        })
      }, this.failSQL);
    });
  }
  */

  failDB = (err) => {
    this.setState({
      count: -2
    })
    console.log(err)
  }

  successSQL = () => {
    this.setState({
      count: 2
    })
  }

  failSQL = (err) => {
    this.setState({
      count: -1
    })
    console.log(err)
  }

  render() {
      return (
        <View style={styles.background}>
          <LineChart
            data={{
              labels: ["M", "T", "W", "T", "F", "S", "S"],
              datasets: [
                {
                  data: [
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#0384fc"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />


      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>
      );
  }
}
