import 'react-native-gesture-handler';

import * as React from 'react';
import { Image, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeScreen from './component/Home';

const Tab = createMaterialBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{height: 60, width: 183.56, marginLeft: 35.28, marginTop: 26}}
      source={require('./images/logo.png')}/>
  );
}

function App() {
  return (
    <NavigationContainer>
      <View style={{height: 105, backgroundColor: '#ffd700', alignItems: 'center', justifyContent: 'center'}}><LogoTitle/></View>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#aaaaaa" inactiveColor='#727472'
        labelStyle={{ fontSize: 10 }}
        barStyle={{ backgroundColor: '#ffd700' }}
        tabBarOptions={{style:{height: 75}}}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="alarm" color={'#aaaaaa'} size={25} />
        )}}/>
        <Tab.Screen name="Schedule" component={HomeScreen} options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-today" color={'#aaaaaa'} size={25} />
        )}}/>
        <Tab.Screen name="User" component={HomeScreen} options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="sticker-emoji" color={'#aaaaaa'} size={25} />
        )}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;