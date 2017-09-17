import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, getUsername, sendImageBase64 } from '../actions'
import Camera from 'react-native-camera'
import appStyles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';


class Game extends Component {

    takePicture() {

        const options = {};
<<<<<<< HEAD
        //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) => console.log(data))
          .catch(err => console.error(err));
      }
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text style = {{textAlign: 'center'}}>
                    Snap a photo of the target! {//this.props.hasOwnProperty('user') && this.props.user.hasOwnProperty('username') && this.props.user.username
                    }
                </Text>
                <View style={{flex:1, justifyContent: 'center'}}>
=======
        //options.location = ... 
        this.camera.capture({ metadata: options })
            .then((data) => this.props.sendImageBase64(data))
            .catch(err => console.error(err));

    }
    render() {
        return (
            <View ref="camera" style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
                <View>
>>>>>>> origin/master
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={{ margin: 'auto' }} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>
                <TouchableHighlight style={appStyles.buttonBack} onPress={() => this.props.changeScreen('register')}>
                  <Icon name="chevron-left" size={30} color='#aaa' />
                </TouchableHighlight>
            </View>
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
        changeScreen: (newScreen) => {
            dispatch(changeScreen(newScreen))
        },
        getUsername: (uid) => {
            dispatch(getUsername(uid))
        },
        sendImageBase64: (data) => {
            dispatch(sendImageBase64(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
