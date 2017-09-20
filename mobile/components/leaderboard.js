import React, { Component } from 'react'
import { View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, getUsername, getLeaderboard } from '../actions'
import Camera from 'react-native-camera'
import appStyles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';

const MK = require('react-native-material-kit');
const { MKButton, MKTextField, MKColor } = MK

class Leaderboard extends Component {
    componentWillMount() {
        this.props.getLeaderboard()
    }

    render() {
      return (
        <Image
          source={require('../assets/bg.png')}
          style={styles.backgroundImage}>

          <View style = {appStyles.cardMain}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Icon style={appStyles.iconLogo} name="rocket" size={42} color={MKColor.BlueGrey} />
              </View>
            </View>

            <View style={styles.row}>
                <Text style={{color: '#fff'}}>
                  User1 <Icon name="rocket" size={16} />
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={{color: '#fff'}}>
                  User2 <Icon name="rocket" size={16} />
                </Text>
            </View>

            <View style={styles.row}>
              <TouchableHighlight style={appStyles.buttonRegister} onPress={this.goSignOut}>
                <Text style={{color: '#fff'}}>
                  SignOut <Icon name="rocket" size={12} />
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.row}>
              <TouchableHighlight style={appStyles.buttonRegister} onPress={this.goCamera}>
                <Text style={{color: '#fff'}}>
                  Camera <Icon name="rocket" size={16} />
                </Text>
              </TouchableHighlight>
            </View>
            {/* <TouchableHighlight style={appStyles.buttonBack} onPress={() => this.props.changeScreen('mainMenu')}>
              <Icon name="chevron-left" size={30} color='#aaa' />
            </TouchableHighlight> */}
          </View>
        </Image>


      )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLeaderboard: () => {
          dispatch(getLeaderboard())
        },
        changeScreen: (newScreen) => {
            dispatch(changeScreen(newScreen))
        },
        getLeaderboard: () => {
            dispatch(getUsername())
        }
    }
}


const styles = Object.assign({}, appStyles, StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7, marginRight: 7,
    padding: 8,
    // color: '#FFF',
  },
  textfield: {
    color: '#FFF',
    height: 28,  // have to do it on iOS
    marginTop: 32,
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
  backgroundCard: {
    flex:1,
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
