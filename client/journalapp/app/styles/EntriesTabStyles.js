import {
  StyleSheet,
  Dimensions,
} from 'react-native';

// For the styles, the height: Dimensions.get('window').height - 60 and marginTop: 60 accommodates 
// the navbar's height, as set in Main.js. 

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 70,
    height: Dimensions.get('window').height - 70,
    width: Dimensions.get('window').width * .93,
    paddingLeft:6,
    paddingRight:6,
  },
  header: {
    marginTop: 0,
    marginLeft: 0, 
    borderBottomWidth: 0.5,
    borderColor: '#cccccc',
    paddingBottom: 16
  }, 
  date: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '500'
  }, 
  headerButton: {
    width: Dimensions.get('window').width //* .75,
  },
  buttonText: {
    color: '#0078f0',
    fontSize: 18, 
    marginTop: 11, 
    marginLeft: 38, 
    marginRight: 12
  },
  tabbarimage: {
    height: 20,
    width: 20,
    marginTop: 12,
    marginLeft: 0, 
    position: 'absolute', 
  }
});

module.exports = styles;