import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../../screens/Login';
import Dummy from '../../../screens/Dummy';
import Register from '../../../screens/Register';
import ResetPassword from '../../../screens/ResetPassword';
import StaffLogin from '../../../screens/StaffLogin';
import TermsConditions from '../../../screens/TermsConditions';
import Splash from '../../../screens/Splash';

const Stack = createStackNavigator();
export function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dummy" component={Dummy} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="StaffLogin" component={StaffLogin} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
        </Stack.Navigator>
    );
}
export default AuthStack;