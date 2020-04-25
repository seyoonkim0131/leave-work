import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignIn';


const Stack = createStackNavigator();

function LogOutStack() {
    return (
        <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
        </Stack.Navigator>
    )
}
export default LogOutStack;