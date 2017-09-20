import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenTransition from './components/screenTransition'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const store = createStore(reducer, {screen: 'login', targets: [], foundItem: -2, loading: false},
    applyMiddleware(thunkMiddleware)
)

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <ScreenTransition />
          </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
});
