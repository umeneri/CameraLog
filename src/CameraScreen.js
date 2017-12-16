'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Capture with ${navigation.state.params.user}`,
  });

  async takePicture() {
    console.log('take');
    const options = {};
    //options.location = ...

    const data = this.camera.capture({metadata: options}).catch(err => console.error(err));
    console.log(data);

    return data;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
  button: {
    flex: 1,
    width: 40,
  },
});

