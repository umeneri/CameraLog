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

const { width } = Dimensions.get('window');

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'title',
  });

  constructor(props) {
    super(props);
    console.log(this.props);

    const { selectedItems } = this.props.navigation.state.params;

    this.state = {
      selectedItems,
      currentIndex: 0,
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

  render() {
    console.log("detail");

    const {
      selectedItems,
      currentIndex,
    } = this.state;

    return (
      <View
        style={styles.container}
      >
        <Text>
         image is here.
        </Text>
        <Image
          style={styles.image}
          source={{uri: selectedItems[currentIndex].photo}}
        />
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
  image: {
    flex: 1,
    width,
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


