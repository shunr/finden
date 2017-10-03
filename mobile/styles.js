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
  responseText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  buttonPrimary: {
    backgroundColor: '#7d64ff',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10
  },
  buttonInferior: {
    backgroundColor: '#ccc',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
    marginBottom: 24,
    marginTop: 0
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
  mainTitle: {
    textAlign: 'center',
    color: '#7d64ff',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  listItem: {
    padding: 8,
    textAlign: 'center'
  },
  buttonBack: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingLeft: 10,
    paddingTop: 10
  },
  alert: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  },
  buttonCamera: {
    backgroundColor: '#7d64ff',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 10
  },
});
