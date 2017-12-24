import React, { Component } from 'react';
import {
  ActionSheetIOS,
  Platform,
  CameraRoll,
  StyleSheet,
} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
import PhotoController from './lib/PhotoController';

export default class DetailScreen extends Component {
  onSelectionChanged = (media, index, selected) => {
    alert(`${media.photo} selection status: ${selected}`);
  };

  onActionButton = (media, index) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: media.photo,
          message: media.caption,
        },
        () => {},
        () => {},
      );
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      mediaList: [],
      title: 'Library photos',
      description: 'showing grid first, custom action method',
      startOnGrid: true,
      displayActionButton: true,
      displayNavArrows: true,
      displaySelectionButtons: true,
      itemPerRow: 3, // bug for 7
    };
  }

  async componentDidMount() {
    const album = await PhotoController.getAlbum();
    const assets = await PhotoController.getAssets(album);
    const mediaList = assets.map((asset) => {
      return {
        photo: asset.uri,
      }
    });

    this.setState({
      mediaList,
    });
  }

  render() {
    const {
      mediaList,
      initialIndex,
      displayNavArrows,
      displayActionButton,
      displaySelectionButtons,
      startOnGrid,
      enableGrid,
      alwaysDisplayStatusBar,
      itemPerRow,
    } = this.state;

    return (
      <PhotoBrowser
      onBack={navigator.pop}
      mediaList={mediaList}
      initialIndex={initialIndex}
      displayNavArrows={displayNavArrows}
      displaySelectionButtons={displaySelectionButtons}
      displayActionButton={displayActionButton}
      startOnGrid={startOnGrid}
      enableGrid={enableGrid}
      useCircleProgress
      onSelectionChanged={this.onSelectionChanged}
      onActionButton={this.onActionButton}
      alwaysDisplayStatusBar={alwaysDisplayStatusBar}
      itemPerRow={itemPerRow}
      customTitle={(index, rowCount) => `${index} sur ${rowCount}`}
      />
    );
  }
}
