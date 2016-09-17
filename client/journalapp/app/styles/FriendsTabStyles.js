import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingLeft:6,
    paddingRight:6,
    paddingTop: 6,
    paddingBottom:6,
    marginTop:52,
    marginBottom: 52,
    flex: 1,
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  subHeader: {
    fontSize: 12,
    fontWeight: '700',
    color:"#424242",
    marginLeft:12,
    marginBottom:12,
    marginTop:17
  }
});  

module.exports = styles;