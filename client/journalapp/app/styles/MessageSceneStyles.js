import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    width: Dimensions.get('window').width * 1,
    paddingTop: 70, 
    marginLeft: 0,
    backgroundColor: '#fdf6e3', 
  },
  bodyWidth: {
    marginLeft: Dimensions.get('window').width * .05,
    marginRight: Dimensions.get('window').width * .05,
  },
  fadedText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  }, 
  footer: {
    position: 'absolute', 
    marginLeft: 0,
    marginTop: 0, 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    borderTopWidth: 1, 
    borderTopColor: 'rgba(175,175,175,.6)',
    height: 49, 
    paddingTop: 6, 

  },
  footerContent: {
    color:"#c7c7cc", 
    fontSize: 24
  },
  footerPadlock: {
    marginLeft: Dimensions.get('window').width * .08,
    width: Dimensions.get('window').width * .1,
  }, 
  footerArrow: {
    marginLeft: Dimensions.get('window').width * .3,
  },
  footerText: {
    fontSize: 16,
    marginLeft: Dimensions.get('window').width * .02,
    width: Dimensions.get('window').width * .46,
  }
});

module.exports = styles;