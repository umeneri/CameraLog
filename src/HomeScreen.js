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
import DatePhotoBrowser from './components/DatePhotoBrowser';
import PhotoController from './lib/PhotoController';
import moment from 'moment'

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
          url: media.uri,
          message: media.caption,
        },
        () => {},
        () => {},
      );
    } else {
      alert(`handle sharing on android for ${media.uri}, index: ${index}`);
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
      itemPerRow: 7,
      selectedItemIndexes: [],
    };
  }

  async componentDidMount() {
    const album = await PhotoController.getAlbum();
    const assets = await PhotoController.getAssets(album);
    const mediaList = assets.map((asset) => {
      return {
        uri: asset.uri,
        createdAt: moment(new Date(asset.modificationDateUTCSeconds * 1000)).format("MM/DD"),
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
    const mediaList = this.state.mediaList;
    this.state.selectedItemIndexes.forEach((index) => {
      mediaList[index].selected = false;
    });

    this.setState({
      selectedItemIndexes: [],
      mediaList,
    });
  }

  onDetailButton() {
    const { navigate } = this.props.navigation;

    navigate('Detail', {
      selectedItems: this.state.selectedItemIndexes.map((index) => {
        return this.state.mediaList[index];
      }),
    });
  }

  renderButtons() {
    if (this.state.selectedItemIndexes.length < 2) {
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
            やりなおす
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.content}
          onPress={this.onDetailButton.bind(this)}>
          <Text style={styles.text}>
            くらべる
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
        <DatePhotoBrowser
        onBack={navigator.pop}
        mediaList={mediaList}
        initialIndex={initialIndex}
        displayNavArrows={displayNavArrows}
        displaySelectionButtons={displaySelectionButtons}
        displayActionButton={displayActionButton}
        displayTopBar={true}
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
    width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});

