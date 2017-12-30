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
import PhotoBrowser from 'react-native-photo-browser';
import PhotoController from './lib/PhotoController';

const { width } = Dimensions.get('window');

export default class HomeScreen extends Component {
  remove = (arr, element) => {
    const index = arr.indexOf(element);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  onSelectionChanged = (media, index, selected) => {
    let selectedItemIndexes = this.state.selectedItemIndexes.slice();

    if (selected) {
      selectedItemIndexes.push(index);
    } else {
      selectedItemIndexes = this.remove(selectedItemIndexes, index)
    }

    const oldMediaList = this.state.mediaList;
    const newMediaList = oldMediaList.slice();
    const selectedMedia = {
      ...oldMediaList[index],
      selected,
    };
    newMediaList[index] = selectedMedia;

    this.setState({
      mediaList: newMediaList,
      selectedItemIndexes,
    });
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

    console.log('home');

    this.state = {
      mediaList: [],
      title: 'Library photos',
      description: 'showing grid first, custom action method',
      startOnGrid: true,
      displayActionButton: true,
      displayNavArrows: true,
      displaySelectionButtons: true,
      itemPerRow: 3, // bug for 7
      num: 0,
      selectedItemIndexes: [],
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

  customTitle(index, rowCount) {
    return `${index} sur ${rowCount}`;
  }

  onBuckButton() {
    console.log('pressed');
  }

  onDetailButton() {
    console.log('detail');
    const { navigate } = this.props.navigation;

    navigate('Detail', {
      selectedItems: this.state.selectedItemIndexes.map((index) => {
        return this.state.mediaList[index];
      }),
    });
  }

  renderButtons() {
    if (this.state.selectedItemIndexes.length == 0) {
      return null;
    }

    return (
      <View
      style={styles.buttons}
      >
        <TouchableHighlight
          style={styles.content}
          onPress={this.onBuckButton.bind(this)}>
          <Text style={styles.text}>
            戻る
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.content}
          onPress={this.onDetailButton.bind(this)}>
          <Text style={styles.text}>
            Detail
          </Text>
      </TouchableHighlight>
      </View>
    );
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
      <View
        style={styles.container}
      >
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
        customTitle={this.customTitle}
        />
        { this.renderButtons() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: '#999',
    width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});

