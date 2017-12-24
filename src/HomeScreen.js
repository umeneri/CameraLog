import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CalendarCameraRollPicker from './components/CalendarCameraRollPicker';

const TITLE = 'cameralog';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
    };
  }


  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
      groupTypes: 'Faces',
    });

    console.log(current);
    console.log(this.state.selected);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            <Text style={styles.bold}> {this.state.num} </Text> images has been selected
          </Text>
        </View>
        <CalendarCameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes={this.state.groupTypes}
          batchSize={5}
          maximum={3}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={7}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});

