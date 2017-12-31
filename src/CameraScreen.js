import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  Image,
} from 'react-native';
import Camera from 'react-native-camera';
import PhotoController from './lib/PhotoController';

const { width, height } = Dimensions.get('window');

export default class CameraScreen extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      uri: null,
    };

  }

  async componentDidMount() {
    this.setTargetAsset();
  }

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

  async setTargetAsset() {
    const album = await PhotoController.findOrCreateAlbum();
    const assets = await PhotoController.getAssets(album, 0, 1);

    if (assets.length === 0) {
      this.setState({
        uri: null,
      });
      return;
    }

    const asset = assets[0];
    console.log(asset);

    this.setState({
      uri: asset.uri,
    });
  }

  renderImage() {
    console.log('render');
    console.log(this.state.uri);

    if (this.state.uri === null) {
      return null;
    } else {
      return (
        <Image style={styles.image}
           source={{uri: this.state.uri}}
         />
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.target}>
          { this.renderImage() }
        </View>
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
    zIndex: 2000,
  },
  button: {
    flex: 1,
    width: 40,
  },
  target: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 1000,
  },
  image: {
    width,
    height,
    opacity: 0.3,
  },
});

