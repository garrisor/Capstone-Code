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
      data_array: [1,10,-5,2,0],
      start_date: '2021-03-01',
      end_date: '2021-03-02',
      example1: 1,
    }
    this.db = SQLite.openDatabase({name: "ankle2.db", createFromLocation : 1}, this.successDB, this.failDB);
  }


  successDB = () => {
    this.db.transaction(tx => {
      tx.executeSql('SELECT field2 FROM dorsiflexion_data WHERE strftime("%Y-%m-%d %H:%M:%S.%f", field1) BETWEEN date(?) AND date(?)', [this.state.start_date, this.state.end_date], (tx,results) => {
        let datalength = results.rows.length;
        let temp_array =[];
        if (datalength > 0) {
          for (let i = 0; i < datalength; i++) {
            temp_array.push(Object.values(results.rows.item(i)));
          }
          console.log(temp_array)
          this.setState({
            count: datalength/100,
            data_array: temp_array
          });
        }
      }, this.failSQL);
    });
  }


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
          <LineChart withInnerLines={false}
            data={{
              labels: ['0%','25%','50%','75%','100%'],
              datasets: [
                {
                  data: this.state.data_array //[0,1,2,3,4,5,4,3,2,1,0,-1,-2,-1,0,1,0,-1,0]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2, // number of dps
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //curve color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //axis color
              propsForDots: {r: "0"}, //dot size
              propsForBackgroundLines: {strokeDasharray: ""}, //removes grid lines
              fillShadowGradient: "#ffffff"//shaded area under curve color
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />


      <View style={styles.displayBox3}>
        <Text>Start Date</Text>
        <DatePicker
          style={{width: 200}}
          date={new Date()}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2021-01-01"
          maxDate={new Date()}
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
          }}
          onDateChange={(date) => {this.setState({start_date: date})}}
        />
      </View>

      <View style={styles.displayBox3}>
        <Text>End Date</Text>
        <DatePicker
          style={{width: 200}}
          date={new Date()}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={this.state.start_date}
          maxDate={new Date()}
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
          }}
          onDateChange={(date) => {this.setState({end_date: date})}}
        />
      </View>


        <View style={styles.displayBox3}>
            <Text style={styles.displayBoxTitle}>{this.state.count} rows</Text>
        </View>

      </View>

      );
  }
}
