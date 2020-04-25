import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { graphql } from '@apollo/react-hoc';
import { setContext } from 'apollo-link-context';

import HomeScreen from './Home';
import ScheduleScreen from './Schedule';
import UserScreen from './User';
import SignInScreen from './SignIn';

import LogoTitle from './LogoTitle';

import { IS_LOGGED_IN } from './../Queries/Query';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function LogInStack() {
    return (
        <View style={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor: '#fdda6c', alignItems: 'center', paddingVertical: 10}}>
                <LogoTitle/>
            </View>
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
        </View>
    )
}

function LogOutStack() {
    return (
        <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
        </Stack.Navigator>
    )
}

export default graphql(IS_LOGGED_IN)(Navigations);


function Navigations() {
    // console.log(`test: ${AsyncStorage.getItem('jwt').toString()}`)
    // let jwt = getToken();
    // console.log(jwt)
    // let token = Boolean(getToken())
    // if(isLoggedIn) {
    //     return <LogInStack/>
    // } else {
        return <LogOutStack/>
    // }
}