import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ListView,
  TouchableHighlight,
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
} from 'react-native';

import GridContainer from 'react-native-photo-browser/lib/GridContainer';
import Constants from 'react-native-photo-browser/lib/constants';
import { Photo } from 'react-native-photo-browser/lib/media';

export default class DateGridContainer extends GridContainer {
  _renderRow(media: Object, sectionID: number, rowID: number) {
    const {
      displaySelectionButtons,
      onPhotoTap,
      onMediaSelection,
      itemPerRow,
      square,
      offset,
    } = this.props;
    const screenWidth = Dimensions.get('window').width - offset;
    const photoWidth = Math.floor(screenWidth / itemPerRow) - 2;

    return (
      <TouchableHighlight onPress={() => onPhotoTap(parseInt(rowID, 10))}>
        <View style={styles.row}>
          <View style={styles.date}>
            <Text style={styles.text}>
              { media.createdAt }
            </Text>
          </View>
          <Photo
            width={photoWidth}
            height={square ? photoWidth : 100}
            resizeMode={'cover'}
            thumbnail
            progressImage={require('react-native-photo-browser/Assets/hourglass.png')}
            displaySelectionButtons={displaySelectionButtons}
            uri={media.thumb || media.photo}
            selected={media.selected}
            onSelection={(isSelected) => {
              onMediaSelection(rowID, isSelected);
            }}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { dataSource } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={dataSource}
          initialListSize={42}
          pageSize={3}
          scrollRenderAheadDistance={500}
          renderRow={this._renderRow}
          removeClippedSubviews={false}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Constants.TOOLBAR_HEIGHT,
  },
  list: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 1,
  },
  date: {
    backgroundColor: 'black'
  },
  text: {
    color: 'white',
  },
});

