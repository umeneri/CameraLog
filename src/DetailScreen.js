import React, { Component } from 'react';
import {
  ActionSheetIOS,
  Platform,
  CameraRoll,
  StyleSheet,
  Button,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import PhotoController from './lib/PhotoController';
import ZoomableImage from './components/ZoomableImage';

const { width } = Dimensions.get('window');

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'title',
  });

  constructor(props) {
    super(props);
    console.log(this.props);

    /* const { selectedItems } = this.props.navigation.state.params; */

    this.state = {
      selectedItems: [],
      currentIndex: 0,
      /* width: 500,  */
      /* height: 500, */
      top: 0,
      left: 0,
      zoom: 1,
      mode: 'horizontal',
    };
  }

  toggle() {
    const list = this.state.selectedItems;
    console.log('toggle');
    console.log(this.state.currentIndex);

    this.setState({
      currentIndex: this.state.currentIndex + 1 % list.length,
    })
  }

  async componentDidMount() {
    /* setInterval(this.toggle.bind(this), 1000); */
  }

  onProcessPinch(state) {
    console.log('pinch');
    /* console.log(state); */
    this.setState({top, left, zoom} = state);
  }

  onProcessTouch(state) {
    console.log('touch');
    /* console.log(state); */

    this.setState({top, left, zoom} = state);
  }

  renderImage() {
            /* <Image                                              */
        /*   style={styles.image}                              */
        /*   source={{uri: selectedItems[currentIndex].photo}} */
        /* />                                                  */
  }

  render() {
    /* console.log("detail");   */

    const {
      selectedItems,
      currentIndex,
    } = this.state;

    const flexDirection = this.state.mode === 'horizontal' ? 'row' : 'column';
    const style = {
          flex: 1,
      /* flexDirection: 'column', */
      /* flexDirection: 'row', */
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#888',
      flexDirection
    };

    console.log(style);

    return (
      <View
        style={style}
      >
        <View
          style={styles.layer}
        >
          <ZoomableImage
            id={1}
            style={styles.image}
            top={this.state.top}
            left={this.state.left}
            zoom={this.state.zoom}
            mode={this.state.mode}
            imageWidth={500}
            imageHeight={500}
            onProcessPinch={this.onProcessPinch.bind(this)}
            onProcessTouch={this.onProcessTouch.bind(this)}
            source={{uri: "https://placehold.jp/this.state.widthxthis.state.width.png"}}
          />
        </View>
        <View
          style={styles.layer}
        >
          <ZoomableImage
            id={2}
            style={styles.image}
            top={this.state.top}
            left={this.state.left}
            zoom={this.state.zoom}
            mode={this.state.mode}
            imageWidth={500}
            imageHeight={500}
            onProcessPinch={this.onProcessPinch.bind(this)}
            onProcessTouch={this.onProcessTouch.bind(this)}
            source={{uri: "https://placehold.jp/cc9999/993333/500x500.png"}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* flexDirection: 'column', */
    /* flexDirection: 'row', */
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#888',
  },
  buttons: {
    backgroundColor: '#999',
    /* width, */
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  layer: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#e83366',
    overflow: 'hidden',
  },
  image: {
    /* alignSelf: 'stretch', */
    backgroundColor: 'red',
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


