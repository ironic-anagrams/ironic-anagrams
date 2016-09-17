import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: '#cccccc',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#f6f6f6'
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 2,
  },
  rowHeader: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
  },
  rowFooter: {
    flex: 1,
    paddingRight: 5,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  rowBack: {
    backgroundColor: 'white'
  },
  filler: {
  },
  leftGroup: {
    justifyContent: 'flex-start'
  },
  username: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '700',
    marginRight: 50
  },
  date: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '500'
  },
  tag: {
    marginRight: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    color: '#007fff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  location: {
    justifyContent: 'flex-end',
    fontSize: 11,
    color: '#999999',
    fontWeight: '500'
  },
  rowBody: {
    marginLeft: 0,
    marginTop: 12,
    flexDirection: 'column',
  },
  entryText: {
    justifyContent: 'flex-start',
    fontSize: 15,
    fontWeight: '500',
    color:"#424242",
  },
});

module.exports = styles;