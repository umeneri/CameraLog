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
import PhotoController from './lib/PhotoController';

export default class CameraScreen extends React.Component {

  async takePicture() {
    console.log('take');
    const options = {};

    const data = await this.camera.capture({metadata: options}).catch(err => console.error(err));
    const album = await PhotoController.findOrCreateAlbum();
    const asset = PhotoController.createAsset(album, data.path);
  }

  ref(cam) {
    this.camera = cam;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Camera
          ref={this.ref.bind(this)}
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

