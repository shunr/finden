import React, { Component } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux'
import { changeScreen, getUsername, sendImageBase64, switchLoading } from '../actions'
import Camera from 'react-native-camera'
import appStyles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';


class Game extends Component {
    componentDidMount() {
        this.setState({found: 'false'})
    }
    takePicture() {
        const options = {};
        this.props.switchLoading()
        //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) => {
              this.props.sendImageBase64(data)
              this.props.changeScreen('list')
          })
          .catch(err => console.error(err));
      }
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={{ height: '100%', width: '100%' }} onPress={this.takePicture.bind(this)}></Text>
                        <Text style = {appStyles.alert}>
                            Snap a photo of the target!
                        </Text>
                    </Camera>
                </View>
                <TouchableHighlight style={appStyles.buttonBack} onPress={() => this.props.changeScreen('list')}>
                  <Icon name="arrow-left" size={30} color='rgba(255,255,255,0.9)' />
                </TouchableHighlight>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        targets: state.targets
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
        },
        switchLoading: () => {
            dispatch(switchLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
