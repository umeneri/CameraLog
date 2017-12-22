import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import CollectionScreen from './CollectionScreen';
import PhotosScreen from './PhotosScreen';
import DetailScreen from './DetailScreen';

import {
  Platform,
} from 'react-native';

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Camera: { screen: CameraScreen },
    Collection: { screen: CollectionScreen },
    Photos: { screen: PhotosScreen },
    Detail: { screen: DetailScreen },
  },
  {
    initialRouteName: 'Detail',
    /* headerMode: 'none', */

    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);

export default () => <AppNavigator />;

