import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
} from 'react-native';
import RNPhotosFramework from 'react-native-photos-framework';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  async componentDidMount() {
    const album = await this.findOrCreateAlbum();
    console.log(album);

    this.getAssets(album);
  };

  async findOrCreateAlbum() {
    const title = 'cameralog';
    const result = await RNPhotosFramework.getAlbumsByTitle(title);
    const albums = result.albums;
    console.log(albums);

    if (albums.length > 0) {
      console.log("album exists");
      return albums[0];
    }

    const album = await RNPhotosFramework.createAlbum(title);

    return album;
  }

  async getAssets(album) {
    const photos = await album.getAssets({
      //The fetch-options from the outer query will apply here, if we get
      startIndex: 0,
      endIndex: 10,
      //When you say 'trackInsertsAndDeletes or trackAssetsChange' for an albums assets,
      //They will be cached and tracking will start.
      //Call album.stopTracking() to stop this. ex. on componentDidUnmount
      trackInsertsAndDeletes: true,
      trackChanges: false,
    });

    console.log("photos");
    console.log(photos);
    return photos;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Let's Take a Picture!"
          onPress={() =>
            navigate('Camera', { user: 'ume' })
          }
        />
        <Button
          title="Let's Show Your Collection!"
          onPress={() =>
            navigate('Collection')
          }
        />
      </View>
    );
  }
}
