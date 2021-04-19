import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
export default function Routes() {
    const isLogin = useSelector(state => state.Auth.isLogin)
  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

