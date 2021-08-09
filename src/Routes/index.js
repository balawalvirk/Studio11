import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
// ********************firebas auth *************************
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthStack from './Stacks/AuthStack';
import CustomerStack from './Stacks/CustomerStack';
import BarberStack from './Stacks/BarberStack';
import messaging from '@react-native-firebase/messaging';

import { login } from '../Redux/Actions/Auth';
import { NotificationTypes } from '../utills/Enums';
console.disableYellowBox = true;
const Stack = createStackNavigator();

export default function Routes() {
  // Set an initializing state whilst Firebase connects
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const loginScreenType = useSelector((state) => state.Auth.loginScreenType);
  const user = useSelector((state) => state.Auth.user);
  const isLogin = useSelector((state) => state.Auth.isLogin);

  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator initialRouteName="AuthStack" headerMode="none">
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Navigator>
      ) : user?.Type == 'Customer' ? (
        <Stack.Navigator initialRouteName="CustomerStack" headerMode="none">
          <Stack.Screen name="CustomerStack" component={CustomerStack} />
        </Stack.Navigator>
      ) : user?.Type == 'Barber' ? (
        <Stack.Navigator initialRouteName="BarberStack" headerMode="none">
          <Stack.Screen name="BarberStack" component={BarberStack} />
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
  );
}
