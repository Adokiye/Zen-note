/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Home from './components/Home';
import NewNote from './components/NewNote';
import {
  createStackNavigator,
  createAppContainer, DrawerNavigator, DrawerItems
} from 'react-navigation';

const Screens = createStackNavigator({
 
  Home: {
      screen: NewNote,
  },
  NewNote: {
    screen: NewNote,
  },
});
Screens.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle='dark-content'/>
        <Screens/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
