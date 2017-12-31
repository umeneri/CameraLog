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
import Ionicons from 'react-native-vector-icons/Ionicons';

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

    const data = await this.camera.capture({metadata: options}).catch(this.onError);
    const album = await PhotoController.findOrCreateAlbum().catch(this.onError);
    const asset = await PhotoController.createAsset(album, data.path);
    console.log(asset);
  }

  onError(error) {
    console.error(error);
  }

  ref(cam) {
    this.camera = cam;
  }

  async setTargetAsset() {
    const album = await PhotoController.findOrCreateAlbum().catch(this.onError);
    const assets = await PhotoController.getAssets(album, 0, 1).catch(this.onError);
    const uri = assets.length === 0 ? assets[0].uri : null;

    this.setState({
      uri,
    });
  }

  renderButton() {
    return (
      <View style={styles.buttonLayer}>
        <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)}>
          <Ionicons name={ "ios-camera" } style={{
            height: 80,
            width: 80,
            fontSize: 80,
            opacity: 0.5,
            color: 'white',
            }}
          />
        </TouchableHighlight>
      </View>
    )
  }

  renderImage() {
    if (this.state.uri === null) {
      return null;
    } else {
      return (
        <View style={styles.target}>
          <Image style={styles.image}
             source={{uri: this.state.uri}}
           />
        </View>
      );
    }
  }

  renderCamera() {
    return (
      <Camera
        ref={this.ref.bind(this)}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
      </Camera>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        { this.renderButton() }
        { this.renderImage() }
        { this.renderCamera() }
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
  buttonLayer: {
    position: 'absolute',
    left: 0,
    bottom: 40,
    zIndex: 2000,
    width,
    height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    width: 100,

    padding: 10,

    // fix the gap of icon
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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
    opacity: 0.2,
  },
});

