import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundimage here
    //a background color that is very opaque on top?

  },
  tabbar: {
    height: 54,
    backgroundColor: '#48b9c7'
    //color:'#fdf6e3'
  },
  tabbartext: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
    color: '#fdf6e3'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
  },
  fixit: {
    position: 'absolute'
  }
});

module.exports = styles;