import React from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppColors from '../../utills/AppColors';
import { createStackNavigator } from '@react-navigation/stack';
import { width, height } from 'react-native-dimension';
import Dashboard from '../../screens/Dashboard';
import Messages from '../../screens/Messages';
import Notifications from '../../screens/Notifications';
import Shop from '../../screens/Shop';
import TrackOrder from '../../screens/TrackOrder';
import OrderDetails from '../../screens/OrderDetails';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode='none' >
      <HomeStack.Screen name="CustomerDashboard" component={Dashboard} />
    </HomeStack.Navigator>
  );
}

const MessagessStack = createStackNavigator();
function MessagessStackScreen() {
  return (
    <MessagessStack.Navigator headerMode='none'>
      <MessagessStack.Screen name="CustomerMessages" component={Messages} />
    </MessagessStack.Navigator>
  );
}
const ShopStack = createStackNavigator();
function ShopStackScreen() {
  return (
    <ShopStack.Navigator headerMode='none'>
      <ShopStack.Screen name="CustomerShop" component={Shop} />
      <ShopStack.Screen name="TrackOrder" component={TrackOrder} />
      <ShopStack.Screen name="OrderDetails" component={OrderDetails} />
    </ShopStack.Navigator>
  );
}
const NotificationsStack = createStackNavigator();
function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator headerMode='none'>
      <NotificationsStack.Screen name="CustomerNotifications" component={Notifications} />
    </NotificationsStack.Navigator>
  );
}
export default function UserBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused
              ? require('../../assets/images/home.png')
              : require('../../assets/images/home.png');
          } else if (route.name === 'Messages') {
            iconName = focused
              ? require('../../assets/images/message.png')
              : require('../../assets/images/message.png');
          } else if (route.name === 'Shop') {
            iconName = focused
              ? require('../../assets/images/shop.png')
              : require('../../assets/images/shop.png');
          }
          else if (route.name === 'Notifications') {
            iconName = focused
              ? require('../../assets/images/bell.png')
              : require('../../assets/images/bell.png');
          }
          return <Image style={{ width: width(4), height: width(4), resizeMode: 'contain', tintColor: color }}
            source={iconName} />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          let label;
          if (route.name === 'Dashboard') {
            label = focused
              ? 'Home'
              : 'Home';
          } else if (route.name === 'Messages') {
            label = focused
              ? 'Messages'
              : 'Messages';
          } else if (route.name === 'Shop') {
            label = focused
              ? 'Shop'
              : 'Shop';
          } else if (route.name === 'Notifications') {
            label = focused
              ? 'Notifications'
              : 'Notifications';
          }
          return <Text style={{ fontSize: width(3), color: color, marginBottom: height(0.25) }}
          >{label}</Text>;
        },
      })}
      tabBarOptions={{
        activeTintColor: AppColors.primaryGold,
        inactiveTintColor: AppColors.iconColor,
        tabStyle: { backgroundColor: AppColors.headerColor, elevation: 10 },
        style: { borderTopWidth: 0, elevation: 10, },
      }}
    >
      <Tab.Screen name="Dashboard" component={HomeStackScreen}
        options={navigation => ({
          tabBarVisible: navigation?.route?.state?.index > 0 ? false : true,
          // tabBarIcon: ({ color }) => <Ionicons name={'person-outline'} size={width(6)} color={color} />
        })} />
      <Tab.Screen name="Shop" component={ShopStackScreen}
        options={navigation => ({
          tabBarVisible: navigation?.route?.state?.index > 0 ? false : true
        })} />
      <Tab.Screen name="Messages" component={MessagessStackScreen}
        options={navigation => ({
          tabBarVisible: navigation?.route?.state?.index > 0 ? false : true
        })} />
      <Tab.Screen name="Notifications" component={NotificationsStackScreen} />
    </Tab.Navigator>

  )
}