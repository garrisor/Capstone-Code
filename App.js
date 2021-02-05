import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import LiveScreen from './src/live';





function HomeScreen() {
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

function HistoryScreen() {
  return (
    <View style={styles.background}>
      <Text>History!</Text>
    </View>
  );
}


function LiveScreen() {
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


function SettingsScreen() {
  return (
    <View style={styles.background}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#000000"
    inactiveColor="#000000"
    barStyle={{ backgroundColor: '#ffffff' }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}

          options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Live"
          component={LiveScreen}
          options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera-timer" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}

          options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
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
