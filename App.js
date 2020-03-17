import 'react-native-gesture-handler';

import * as React from 'react';
import { Image, View, AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeScreen from './component/Home';
import ScheduleScreen from './component/Schedule';
import UserScreen from './component/User';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const Tab = createMaterialBottomTabNavigator();

const httpLink = new HttpLink({
  uri: "https://leave-work-server.herokuapp.com/playground"
});

const authLink = setContext(async(req, {headers}) => {
  const token = await getToken()
  return {
    ...headers,
    headers: {
      "X-JWT": token ? `${token}` : null
    }
  }
}) 


const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link, cache: new InMemoryCache()
});

function LogoTitle() {
  return (
    <Image
      style={{height: 60, width: 183.56, marginLeft: 35.28, marginTop: 26}}
      source={require('./images/logo.png')}/>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;