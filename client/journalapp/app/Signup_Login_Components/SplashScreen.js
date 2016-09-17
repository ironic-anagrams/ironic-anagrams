import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Switch,
  Slider,
  Picker,
  PickerIOS,
  AsyncStorage,
  Image,
} from 'react-native';

import styles from '../styles/AuthGeneralStyles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

var Splash = () => {

  return (
    <View style={styles.viewContainer}>
      <View style={styles.splashcontainer}>
        <Text style={styles.title}> welcome to caster </Text>
        <Text style={styles.subtitle}> a messaging app that let's you broadcast important text messages to your @network and @friends  </Text>
      </View>
    </View>
  )
};

module.exports = Splash;
