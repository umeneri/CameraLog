import React, {Component} from 'react';
import CameraRollPicker from 'react-native-camera-roll-picker';
import CalendarImageItem from './CalendarImageItem'
import PhotoController from '../lib/PhotoController';
import {
  CameraRoll,
  Platform,
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicator,
} from 'react-native';

export default class CalendarCameraRollPicker extends CameraRollPicker {
  /* async _fetch() {                                               */
  /* const album = await PhotoController.getAlbum();        */
  /* const assets = await PhotoController.getAssets(album); */

  /*   const {groupTypes, assetType} = this.props;                  */

  /*   const fetchParams = {                                        */
  /*     first: 1000,                                               */
  /*     groupTypes: groupTypes,                                    */
  /*     assetType: assetType,                                      */
  /*   };                                                           */

  /*   if (Platform.OS === "android") {                             */
  /*     // not supported in android                                */
  /*     delete fetchParams.groupTypes;                             */
  /*   }                                                            */

  /*   if (this.state.lastCursor) {                                 */
  /*     fetchParams.after = this.state.lastCursor;                 */
  /*   }                                                            */

  /*   const data = await CameraRoll.getPhotos(fetchParams)         */
  /*   console.info(data);                                          */
  /*   this._appendImages(data);                                    */
  /* }                                                              */

  _renderImage(item) {
    const {selected} = this.state;
    const {
      imageMargin,
      selectedMarker,
      imagesPerRow,
      containerWidth
    } = this.props;

    const uri = item.node.image.uri;
    const isSelected = (this._arrayObjectIndexOf(selected, 'uri', uri) >= 0) ? true : false;

    return (
      <CalendarImageItem
      key={uri}
      item={item}
      selected={isSelected}
      imageMargin={imageMargin}
      selectedMarker={selectedMarker}
      imagesPerRow={imagesPerRow}
      containerWidth={containerWidth}
      onClick={this._selectImage.bind(this)}
      />
    );
  }
}

