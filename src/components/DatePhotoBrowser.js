import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
  ListView,
  View,
  StyleSheet,
  ViewPropTypes
} from 'react-native';

import PhotoBrowser from 'react-native-photo-browser';
import Constants from 'react-native-photo-browser/lib/constants';
import { TopBar } from 'react-native-photo-browser/lib/bar';
import DateGridContainer from './DateGridContainer';
import FullScreenContainer from 'react-native-photo-browser/lib/FullScreenContainer';

const TOOLBAR_HEIGHT = Constants.TOOLBAR_HEIGHT;

export default class DatePhotoBrowser extends PhotoBrowser {
  render() {
    const {
      alwaysShowControls,
      displayNavArrows,
      alwaysDisplayStatusBar,
      displaySelectionButtons,
      displayActionButton,
      enableGrid,
      useCircleProgress,
      onActionButton,
      onBack,
      itemPerRow,
      style,
      square,
      gridOffset,
    } = this.props;
    const {
      dataSource,
      mediaList,
      isFullScreen,
      fullScreenAnim,
      currentIndex,
      title,
      displayTopBar,
    } = this.state;
    const screenHeight = Dimensions.get('window').height;

    let gridContainer;
    let fullScreenContainer;
    if (mediaList.length > 0) {
      if (enableGrid) {
        gridContainer = (
          <Animated.View
            style={{
              height: screenHeight,
              marginTop: fullScreenAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, screenHeight * -1 - TOOLBAR_HEIGHT],
              }),
            }}
          >
            <DateGridContainer
              square={square}
              offset={gridOffset}
              dataSource={dataSource}
              displaySelectionButtons={displaySelectionButtons}
              onPhotoTap={this._onGridPhotoTap}
              onMediaSelection={this._onMediaSelection}
              itemPerRow={itemPerRow}
            />
          </Animated.View>
        );
      }

      fullScreenContainer = (
        <FullScreenContainer
          ref="fullScreenContainer"
          dataSource={dataSource}
          mediaList={mediaList}
          initialIndex={currentIndex}
          alwaysShowControls={alwaysShowControls}
          displayNavArrows={displayNavArrows}
          alwaysDisplayStatusBar={alwaysDisplayStatusBar}
          displaySelectionButtons={displaySelectionButtons}
          displayActionButton={displayActionButton}
          enableGrid={enableGrid}
          useCircleProgress={useCircleProgress}
          onActionButton={onActionButton}
          onMediaSelection={this._onMediaSelection}
          onGridButtonTap={this._onGridButtonTap}
          updateTitle={this._updateTitle}
          toggleTopBar={this._toggleTopBar}
          bottomBarComponent={this.props.bottomBarComponent}
          onPhotoLongPress={this.props.onPhotoLongPress}
          delayLongPress={this.props.delayPhotoLongPress}
        />
      );
    }

    const TopBarComponent = this.props.topBarComponent || TopBar;

    return (
      <View style={[styles.container, {
        paddingTop: gridContainer ? TOOLBAR_HEIGHT : 0,
      }, style]}>
        {gridContainer}
        {fullScreenContainer}
        {/* this is here for bigger z-index purpose */}
        <TopBarComponent
          height={TOOLBAR_HEIGHT}
          displayed={displayTopBar}
          title={isFullScreen ? title : `${mediaList.length} photos`}
          onBack={onBack}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

