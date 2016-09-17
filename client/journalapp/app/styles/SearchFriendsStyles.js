import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({

  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection:'column',
    justifyContent:'flex-start',
    marginTop:60,
    backgroundColor: '#fdf6e3'
  },
  textinput: {
    height: 36,
    paddingLeft:12,
    borderColor: 'grey',
    borderBottomWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    color:"#666666",
  },

});

module.exports = styles;