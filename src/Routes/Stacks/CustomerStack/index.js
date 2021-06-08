import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTab from '../../UserBottomTab/UserBottomTab';
import Appointments from '../../../screens/Appointments';
import PaymentMethods from '../../../screens/PaymentMethods';
import Settings from '../../../screens/Settings';
import Feedback from '../../../screens/Feedback';
import Suggestion from '../../../screens/Suggestion';
import TermsConditions from '../../../screens/TermsConditions';
import AppointmentDetails from '../../../screens/AppointmentDetails';
import VenmoConnected from '../../../screens/VenmoConnected';
import AddPaymentMethod from '../../../screens/AddPaymentMethod';
import HairStyles from '../../../screens/HairStyles';
import HairStylesBarber from '../../../screens/HairStylesBarber';
import BarberProfile from '../../../screens/BarberProfile';
import VideoUploads from '../../../screens/VideoUploads';
import VideoPlay from '../../../screens/VideoPlay';
import ShoppingCart from '../../../screens/ShoppingCart';
import ProductDetails from '../../../screens/ProductDetails';
import SelectPaymentMethodShop from '../../../screens/SelectPaymentMethodShop';
import Reviews from '../../../screens/Reviews';
import GetAppointment from '../../../screens/GetAppointment';
import SelectPaymentMethod from '../../../screens/SelectPaymentMethod';
import Chat from '../../../screens/Chat';
const Stack = createStackNavigator();
export function CustomerStack() {
    return (
        <Stack.Navigator initialRouteName="UserBottomTab" headerMode="none">
            <Stack.Screen name="UserBottomTab" component={UserBottomTab} />
            <Stack.Screen name="Appointments" component={Appointments} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="Suggestion" component={Suggestion} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
            <Stack.Screen name="VenmoConnected" component={VenmoConnected} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
            <Stack.Screen name="HairStyles" component={HairStyles} />
            <Stack.Screen name="HairStylesBarber" component={HairStylesBarber} />
            <Stack.Screen name="BarberProfile" component={BarberProfile} />
            <Stack.Screen name="VideoUploads" component={VideoUploads} />
            <Stack.Screen name="VideoPlay" component={VideoPlay} />
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="SelectPaymentMethodShop" component={SelectPaymentMethodShop} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="GetAppointment" component={GetAppointment} />
            <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
}
export default CustomerStack;