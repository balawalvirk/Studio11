import React, { } from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppColors from '../../utills/AppColors';
import { createStackNavigator } from '@react-navigation/stack';
import { width, height } from 'react-native-dimension'
import BarberHomeScreen from '../../screens/BarberHomeScreen';
import ChatListBarber from '../../screens/ChatListBarber';
import Calender from '../../screens/Calender';
import BarberNotifications from '../../screens/BarberNotifications';
import ProfileBarber from '../../screens/ProfileBarber';

const Tab = createBottomTabNavigator();
const BarberStack = createStackNavigator();
function BarberHomeStackScreen() {
  return (
    <BarberStack.Navigator headerMode='none' >
      <BarberStack.Screen name="BarberHomeScreenTab" component={BarberHomeScreen} />
    </BarberStack.Navigator>
  );
}
const BarberMessagessStack = createStackNavigator();
function BarberMessagessStackScreen() {
  return (
    <BarberMessagessStack.Navigator headerMode='none'>
      <BarberMessagessStack.Screen name="ChatListBarberTab" component={ChatListBarber} />
    </BarberMessagessStack.Navigator>
  );
}
const CalenderStack = createStackNavigator();
function CalenderStackScreen() {
  return (
    <CalenderStack.Navigator headerMode='none'>
      <CalenderStack.Screen name="CalenderTab" component={Calender} />
    </CalenderStack.Navigator>
  );
}
const BarberNotificationsStack = createStackNavigator();
function BarberNotificationsStackScreen() {
  return (
    <BarberNotificationsStack.Navigator headerMode='none'>
      <BarberNotificationsStack.Screen name="BarberNotificationsTab" component={BarberNotifications} />
    </BarberNotificationsStack.Navigator>
  );
}
const BarberProfileStack = createStackNavigator();
function BarberProfileStackScreen() {
  return (
    <BarberProfileStack.Navigator headerMode='none' screenOptions={navigation => {
      return ({
        tabBarVisible: navigation?.route?.state?.index > 0 ? false : true,
      })
    }} >
      <BarberProfileStack.Screen name="ProfileBarberTab" component={ProfileBarber} />
    </BarberProfileStack.Navigator>
  );
}
export default function BarberBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'BarberHomeScreen') {
            iconName = focused
              ? require('../../assets/images/home.png')
              : require('../../assets/images/home.png');
          } else if (route.name === 'ChatListBarber') {
            iconName = focused
              ? require('../../assets/images/message.png')
              : require('../../assets/images/message.png');
          } else if (route.name === 'Calender') {
            iconName = focused
              ? require('../../assets/images/Calender.png')
              : require('../../assets/images/Calender.png');
          }
          else if (route.name === 'BarberNotifications') {
            iconName = focused
              ? require('../../assets/images/bell.png')
              : require('../../assets/images/bell.png');
          }
          else if (route.name === 'BarberProfile') {
            iconName = focused
              ? require('../../assets/images/user.png')
              : require('../../assets/images/user.png');
          }
          return <Image style={{ width: width(4), height: width(4), resizeMode: 'contain', tintColor: color }}
            source={iconName} />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          let label;
          if (route.name === 'BarberHomeScreen') {
            label = focused
              ? 'Home'
              : 'Home';
          } else if (route.name === 'ChatListBarber') {
            label = focused
              ? 'Messages'
              : 'Messages';
          }
          else if (route.name === 'Calender') {
            label = focused
              ? 'Calender'
              : 'Calender';
          }
          else if (route.name === 'BarberNotifications') {
            label = focused
              ? 'Notifications'
              : 'Notifications';
          }
          else if (route.name === 'BarberProfile') {
            label = focused
              ? 'Profile'
              : 'Profile';
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
      <Tab.Screen name="BarberHomeScreen" component={BarberHomeStackScreen}
        options={navigation => ({
          tabBarVisible: navigation?.route?.state?.index > 0 ? false : true,
        })} />
      <Tab.Screen name="ChatListBarber" component={BarberMessagessStackScreen} />
      <Tab.Screen name="Calender" component={CalenderStackScreen} />
      <Tab.Screen name="BarberNotifications" component={BarberNotificationsStackScreen} />
      <Tab.Screen name="BarberProfile" component={BarberProfileStackScreen}
      />
    </Tab.Navigator>
  )
}