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
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'title',
  });

  constructor(props) {
    super(props);

    const { selectedItems } = this.props.navigation.state.params;

    this.state = {
      selectedItems,
      currentIndex: 0,
      top: 0,
      left: 0,
      zoom: 1,
      mode: 'horizontal',
    };
  }

  onProcessPinch(state) {
    this.setState({top, left, zoom} = state);
  }

  onProcessTouch(state) {
    this.setState({top, left, zoom} = state);
  }

  onHorizontalButton() {
    this.setState({
      mode: 'horizontal',
    });
  }

  onVerticalButton() {
    this.setState({
      mode: 'vertical',
    });
  }

  renderButtons() {

    return (
      <View
      style={styles.buttons}
      >
        <TouchableHighlight
          style={styles.content}
          onPress={this.onHorizontalButton.bind(this)}>
          <View style={styles.horizontalSquareContainer}>
            <Text style={styles.horizontalSquare}>
            </Text>
            <Text style={styles.horizontalSquare}>
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.content}
          onPress={this.onVerticalButton.bind(this)}>
          <View style={styles.verticalSquareContainer}>
            <Text style={styles.verticalSquare}>
            </Text>
            <Text style={styles.verticalSquare}>
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderImages() {
    const flexDirection = this.state.mode === 'horizontal' ? 'row' : 'column';
    const style = {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#888',
      flexDirection,
    };

    const {
      selectedItems,
      currentIndex,
    } = this.state;

    console.log(this.state);

    return (
      <View
        style={style}
      >
        <View
          style={styles.layer}
        >
          <ZoomableImage
            id={0}
            style={styles.image}
            top={this.state.top}
            left={this.state.left}
            zoom={this.state.zoom}
            mode={this.state.mode}
            imageWidth={500}
            imageHeight={500}
            onProcessPinch={this.onProcessPinch.bind(this)}
            onProcessTouch={this.onProcessTouch.bind(this)}
            source={{uri: selectedItems[0].uri}}
          />
        </View>
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
            source={{uri: selectedItems[1].uri}}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderImages() }
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
    backgroundColor: '#888',
  },
  buttons: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  layer: {
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  image: {
    backgroundColor: 'red',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
  horizontalSquareContainer: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalSquare: {
    width: 12,
    height: 24,
    borderWidth: 1,
    borderColor: 'white',
  },
  verticalSquareContainer: {
    width: 24,
    height: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalSquare: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
});


