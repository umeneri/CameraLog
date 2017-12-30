import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import PhotoView from 'react-native-photo-view';

export default class TestScreen extends Component {
  _onScale = (event) => {
    console.log('_onScale', event.nativeEvent);
  };
  _onTap = (event) => {
      console.log('_onTap', event.nativeEvent);
  };
  _onViewTap = (event) => {
      console.log('_onViewTap', event.nativeEvent);
  };
  _onLoadStart = (event) => {
      console.log('_onLoadStart', event.nativeEvent);
  };
  _onLoad = (event) => {
      console.log('_onLoad', event.nativeEvent);
  };
  _onLoadEnd = (event) => {
      console.log('_onLoadEnd', event.nativeEvent);
  };
  render() {
    return (
      <View style={styles.container}>
        <PhotoView
          source={{uri: "http://placehold.jp/500x500.png"}}
          onScale={this._onScale}
          onTap={this._onTap}
          onViewTap={this._onViewTap}
          onLoadStart={this._onLoadStart}
          onLoad={this._onLoad}
          onLoadEnd={this._onLoadEnd}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          style={styles.photo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  photo: {
    width: 500,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    backgroundColor: "transparent",
    color: "#FFF",
  }
});

