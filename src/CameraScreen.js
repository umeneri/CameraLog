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
import RNPhotosFramework from 'react-native-photos-framework';

export default class CameraScreen extends React.Component {

  async findOrCreateAlbum() {
    const title = 'cameralog';
    const result = await RNPhotosFramework.getAlbumsByTitle(title);
    const albums = result.albums;
    console.log(albums);

    if (albums.length > 0) {
      console.log("album exists");
      return albums[0];
    }

    return  await RNPhotosFramework.createAlbum(title);
  }

  async takePicture() {
    console.log('take');
    const options = {};

    const data = await this.camera.capture({metadata: options}).catch(err => console.error(err));
    const album = await this.findOrCreateAlbum();
    const assets = await RNPhotosFramework.createAssets({
      images : [{ uri : data.path }],
      album : album,
      includeMetadata : true,
    });

    const asset = assets[0];
    console.log(asset);
    let res = await asset.setFavorite(true);
    console.log(res);
    const date = Date.now();
    res = await asset.setCreationDate(date);
    console.log(res);
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

