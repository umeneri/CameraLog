// https://medium.com/react-native-training/mastering-the-camera-roll-in-react-native-13b3b1963a2d
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
import RNFetchBlob from 'react-native-fetch-blob';
import PhotoController from './lib/PhotoController';

let styles;
const { width } = Dimensions.get('window');

export default class CollectionScreen extends React.Component {
  state = {
    modalVisible: false,
    photos: [],
    index: null
  };

  navigate = () => {
    const { navigate } = this.props.navigation;
    navigate('Home')
  };

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  };

  getPhotos = () => {
    /* console.log("getPhotos"); */
    /* console.log(CameraRoll);  */
    /* CameraRoll.getPhotos({                         */
    /*   first: 20,                                   */
    /*   assetType: 'All'                             */
    /* })                                             */
    /* .then(r => this.setState({ photos: r.edges })) */
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  startGetPhotos = () => {
    this.toggleModal();
    this.getPhotos();
  };

  render() {
    console.log('state :', this.state)
    return (
      <View style={styles.container}>
        <Button
          title='View Photos'
          onPress={this.startGetPhotos}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={this.toggleModal}
            />
            <ScrollView
              contentContainerStyle={styles.scrollView}>
              {
                this.state.photos.map((p, i) => {
                  return (
                    <TouchableHighlight
                      style={{opacity: i === this.state.index ? 0.5 : 1}}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.setIndex(i)}
                    >
                      <Image
                        style={{
                          width: width/3,
                          height: width/3
                        }}
                        source={{uri: p.node.image.uri}}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
  };
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
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
