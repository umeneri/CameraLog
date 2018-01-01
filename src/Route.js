import React from 'react';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import DetailScreen from './DetailScreen';
import TestScreen from './TestScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
} from 'react-native';

import {
  Platform,
} from 'react-native';

const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons name={ focused ? "ios-apps" : "ios-apps-outline" } style={{
            height: 24,
              width: 24,
              fontSize: 24,
          }}
          />
        )
      },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons name={ focused ? "ios-camera" : "ios-camera-outline" } style={{
            height: 24,
              width: 24,
              fontSize: 24,
          }}
          />
        )
      },
    },
    /* Detail: {                                                                   */
    /*   screen: DetailScreen,                                                     */
    /*   navigationOptions: {                                                      */
    /*     tabBarIcon: ({ tintColor, focused }) => (                               */
    /*       <Ionicons name={ focused ? "ios-copy" : "ios-copy-outline" } style={{ */
    /*         height: 24,                                                         */
    /*           width: 24,                                                        */
    /*           fontSize: 24,                                                     */
    /*       }}                                                                    */
    /*       />                                                                    */
    /*     )                                                                       */
    /*   },                                                                        */
    /* }, */
  },
  {
    /* initialRouteName: 'Home', */
    initialRouteName: 'Camera',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#676767',
    },
  }
);


const MainStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: ({navigation}) => ({
        title: 'くらべる',
      }),
    },
  },
  {
    initialRouteName: 'Main',
    /* initialRouteName: 'Detail', */
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);


export default () => <MainStackNavigator />;
