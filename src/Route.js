import React from 'react';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import CollectionScreen from './CollectionScreen';
import PhotosScreen from './PhotosScreen';
import DetailScreen from './DetailScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
} from 'react-native';

import {
  Platform,
} from 'react-native';

const AppNavigator = TabNavigator(
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
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons name={ focused ? "ios-copy" : "ios-copy-outline" } style={{
            height: 24,
              width: 24,
              fontSize: 24,
          }}
          />
        )
      },
    },
  },
  {
    initialRouteName: 'Detail',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#676767',
    },
  }
);

export default () => <AppNavigator />;

