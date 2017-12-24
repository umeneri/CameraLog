import React, { Component } from 'react';
import {
  ActionSheetIOS,
  Platform,
  CameraRoll,
  StyleSheet,
  Button,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import PhotoController from './lib/PhotoController';

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaList: [],
    };
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}
