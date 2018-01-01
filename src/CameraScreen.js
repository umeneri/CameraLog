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
      selected: [],
      type: 'back',
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
    const newSelected = this.state.selected.concat(asset);
    if (newSelected.length > 2) {
        newSelected.shift();
    }

    const result = await this.setState({
      selected: newSelected,
    });

    if (newSelected.length >= 2) {
      this.jumpToDetail();
    }
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
    const uri = assets.length !== 0 ? assets[0].uri : null;

    this.setState({
      uri,
    });
  }

  onZoom() {
    console.log('zoom');
  }

  jumpToDetail() {
    const { navigate } = this.props.navigation;

    navigate('Detail', {
      selectedItems: this.state.selected,
    });
  }


  reverse() {
    const nextType = this.state.type === 'front' ? 'back' : 'front';

    this.setState({
      type: nextType,
    });

  }

  renderReverse() {
    return (
      <TouchableHighlight style={styles.reverse} onPress={this.reverse.bind(this)}>
        <Ionicons name={ "ios-reverse-camera" } style={styles.reverseIcon} />
      </TouchableHighlight>
    )
  }

  renderSelectedImage(asset) {
    return (
      <Image style={{
        width: 60,
        height: 60,
        }}
        source={{uri: asset.uri}}
      />
    )
  }

  renderSelected() {
    const selected = this.state.selected;

    if (selected.length === 0) {
      return (
        <TouchableHighlight style={styles.selected} onPress={this.onZoom.bind(this)}>
          <Text></Text>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight style={styles.selected} onPress={this.onZoom.bind(this)}>
          { this.renderSelectedImage(selected[0]) }
        </TouchableHighlight>
      );
    }
  }

  renderShutter() {
    return (
      <TouchableHighlight style={styles.shutter} onPress={this.takePicture.bind(this)}>
        <Ionicons name={ "ios-camera" } style={styles.shutterIcon} />
      </TouchableHighlight>
    )
  }

  renderButtons() {
    return (
      <View style={styles.buttonLayer}>
        { this.renderSelected() }
        { this.renderShutter() }
        { this.renderReverse() }
      </View>
    );
  }

  renderTargetImage() {
    const selected = this.state.selected;
    if (selected.length === 0) {
      return null;
    } else {
      return (
        <View style={styles.target}>
          <Image style={styles.image}
             source={{uri: selected[0].uri}}
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
        aspect={Camera.constants.Aspect.fill}
        type={this.state.type}>
      </Camera>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        { this.renderButtons() }
        { this.renderTargetImage() }
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
  buttonLayer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 2000,
    width,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  shutter: {
    flex: 0,
    width: 200,
    /* padding: 10, */

    // fix the gap of icon
    /* paddingLeft: 15, */
    alignItems: 'center',
    justifyContent: 'center',
    /* borderRadius: 5, */
    /* backgroundColor: 'blue', */
  },
  shutterIcon: {
    /* height: 80, */
    /* width: 80, */
    fontSize: 80,
    /* opacity: 0.5, */
    color: 'white',
  },
  selected: {
    flex: 1,
    /* width: 60, */
    /* height: 60, */
    /* margin: 20, */
    alignItems: 'center',
    justifyContent: 'center',
    /* paddingLeft: 10, */
    /* backgroundColor: 'white', */
    /* opacity: 0.5, */
  },
  reverse: {
    flex: 1,
    /* paddingLeft: 30, */
    /* width: 50, */
    /* height: 00, */
    alignItems: 'center',
    justifyContent: 'center',
    /* backgroundColor: 'green', */
  },
  reverseIcon: {
    /* height: 60, */
    /* width: 60, */
    fontSize: 50,
    /* opacity: 0.5, */
    color: 'white',
  },
});

