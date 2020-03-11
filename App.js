import 'react-native-gesture-handler';

import * as React from 'react';
import { Image, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeScreen from './component/Home';
import ScheduleScreen from './component/Schedule';
import UserScreen from './component/User';

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
    // <SafeAreaView>
      <NavigationContainer>
        <View style={{height: 105, backgroundColor: '#fdda6c', alignItems: 'center', justifyContent: 'center'}}><LogoTitle/></View>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#2f2f2f" inactiveColor='#727472'
          labelStyle={{ fontSize: 0 }}
          barStyle={{ backgroundColor: '#fdda6c', height: 65 }} labeled={false}
          >
          <Tab.Screen name="Schedule" component={ScheduleScreen} options={{tabBarIcon: () => (
            <MaterialCommunityIcons name="calendar-today"  size={25} />
          )}}/>
          <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: () => (
            <MaterialCommunityIcons name="alarm"  size={25} />
          )}}/>
          <Tab.Screen name="User" component={UserScreen} options={{tabBarIcon: () => (
            <MaterialCommunityIcons name="sticker-emoji"  size={25} />
          )}}/>
        </Tab.Navigator>
      </NavigationContainer>
    /* </SafeAreaView> */
  );
}

export default App;