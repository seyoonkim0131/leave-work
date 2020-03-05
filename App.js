import 'react-native-gesture-handler';

import * as React from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './component/Home';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{height: 60, width: 183.56, marginLeft: 35.28}}
      source={require('./images/logo.png')}/>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerStyle:{height: 105}, headerTitle: props => <LogoTitle {...props} />}}/>
        {/* <Stack.Screen name="Test" component={CountdownTimer} options={{headerStyle:{height: 105}, headerTitle: props => <LogoTitle {...props} />}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;