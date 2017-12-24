import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import ImageItem from 'react-native-camera-roll-picker/ImageItem';

class CalendarImageItem extends ImageItem {
  render() {
    const { item, selected, selectedMarker, imageMargin } = this.props;

    const marker = selectedMarker ? selectedMarker :
      <Image
        style={[styles.marker, { width: 25, height: 25 }]}
        source={require('react-native-camera-roll-picker/circle-check.png')}
      />;

    const image = item.node.image;

    return (
      <TouchableOpacity
        style={{ marginBottom: imageMargin, marginRight: imageMargin }}
        onPress={() => this._handleClick(image)}>
        <Text>{ '1/2' }</Text>
        <Image
          source={{ uri: image.uri }}
          style={{ height: this._imageSize, width: this._imageSize }} />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
})

export default CalendarImageItem;

