import 'react-native-gesture-handler';

import * as React from 'react';
import { View } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeScreen from './component/Home';
import ScheduleScreen from './component/Schedule';
import UserScreen from './component/User';
import SignInScreen from './component/SignIn';

import LogoTitle from './component/LogoTitle';

import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { signIn, signOut, getToken } from './util';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const httpLink = new HttpLink({
  uri: "https://leave-work-server.herokuapp.com/graphql"
});

const authLink = setContext(async(_, {headers}) => {
  const token = await getToken()
  console.log(`token: ${token}`)
  return {
    ...headers,
    headers: {
      "X-JWT": token ? `${token}` : null
    }
  }
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link, cache: new InMemoryCache()
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: false
    }
  }

  
  componentDidMount() {
    this._handleChangeJwtState();
  }

  _handleChangeJwtState = async(jwt = false, token) => {
    this.setState({jwt});
    if(jwt) { 
      await signIn(token);
    } else {
      await signOut();
    }  
  }
  
  render() {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          {this.state.jwt ?
            <View>
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
            </View>
          :
            <Stack.Navigator headerMode={"none"}>
              <Stack.Screen name='SignIn' component={SignInScreen}/>
            </Stack.Navigator>
          }
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}

export default App;