import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl
} from 'react-native';

import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';

let styles;
const { width } = Dimensions.get('window');

export default class CollectionScreen extends React.Component {
  state = {
    modalVisible: false,
    photos: [],
    index: null
  };

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  };

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  };

  share = () => {
    const image = this.state.photos[this.state.index].node.image.uri
    RNFetchBlob.fs.readFile(image, 'base64')
    .then((data) => {
      let shareOptions = {
        title: "React Native Share Example",
        message: "Check out this photo!",
        url: `data:image/jpg;base64,${data}`,
        subject: "Check out this photo!"
      };

      Share.open(shareOptions)
        .then((res) => console.log('res:', res))
        .catch(err => console.log('err', err))
    })
  };

  renderShareButton = () => {
    return (
      <View style={styles.shareButton}>
        <Button
          title='Share'
          onPress={this.share}
        />
      </View>
      );
  };

  renderImage = (photo, index) => {
    return (
      <TouchableHighlight
        style={{ opacity: index === this.state.index ? 0.5 : 1 }}
        key={index}
        underlayColor='transparent'
        onPress={() => this.setIndex(index)}
      >
        <Image
          style={{
            width: width/3,
            height: width/3,
          }}
          source={{uri: photo.node.image.uri}}
        />
      </TouchableHighlight>
      );
  };

  render() {
    console.log('state :', this.state)
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollView}>
          {
            this.state.photos.map(this.renderImage);
          }
        </ScrollView>
        {
          this.state.index !== null  && renderShareButton();
        }
      </View>
    )
  };
};

styles = StyleSheet.create({
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  shareButton: {
    position: 'absolute',
    width,
    padding: 10,
    bottom: 0,
    left: 0
  },
});

