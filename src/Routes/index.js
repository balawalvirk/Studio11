import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import {useDispatch, useSelector} from 'react-redux';
// ********************firebas auth *************************
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
export default function Routes() {
   // Set an initializing state whilst Firebase connects
   const [initializing, setInitializing] = useState(true);
   const [isLogin, setisLogin] = useState();
   const dispatch = useDispatch();
   // Handle isLogin state changes
   function onAuthStateChanged(isLogin) {
     setisLogin(isLogin);
     if (initializing) setInitializing(false);
   }
   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);
 
   if (initializing) return null;
    // const isLogin = useSelector(state => state.Auth.isLogin)
  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

