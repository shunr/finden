var {StyleSheet, Platform} = require('react-native');
var {MKColor} = require('react-native-material-kit');

module.exports = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10, marginBottom: 20,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
  },
  cardMain: {
    backgroundColor: '#f1f1f1',
    width: '100%',
    margin: 32,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8
  },
  buttonRegister: {
    backgroundColor: MKColor.BlueGrey,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    marginBottom: 24,
    marginTop: 10
  },

  iconLogo: {
    padding: 20,
    textAlign: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'center',
    flexDirection : 'row',
    justifyContent:'center',
    padding: 32
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7, marginRight: 7,
    padding: 8,
    // color: '#FFF',
  },
});
