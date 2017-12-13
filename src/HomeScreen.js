import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Let's Take a Picture!"
          onPress={() =>
            navigate('Camera', { user: 'ume' })
          }
        />
        <Button
          title="Let's Show Your Collection!"
          onPress={() =>
            navigate('Collection')
          }
        />
      </View>
    );
  }
}
