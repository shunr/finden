import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, getUsername, sendImageBase64 } from '../actions'
import Camera from 'react-native-camera'

class Game extends Component {

    takePicture() {

        const options = {};
        //options.location = ... 
        this.camera.capture({ metadata: options })
            .then((data) => this.props.sendImageBase64(data))
            .catch(err => console.error(err));

    }
    render() {
        return (
            <View ref="camera" style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
                <View>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={{ margin: 'auto' }} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>
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