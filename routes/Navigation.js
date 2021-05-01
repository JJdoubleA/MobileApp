import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../src/components/LoginPage.js';
import HomePage from '../src/components/HomePage.js';
import StatusPage from '../src/components/StatusPage.js';


const Stack = createStackNavigator();

export const Navigation = () =>  {
  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Status" component={StatusPage} />
      </Stack.Navigator>
    </NavigationContainer>
 
};

