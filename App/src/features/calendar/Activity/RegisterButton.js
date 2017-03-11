/**
 * Created by desver_f on 11/03/17.
 */
import React, {Component, PropTypes} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import HeartBeat from './HeartBeat';

export default class RegisterButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const buttonColor = {
            registered: '#F44235',
            unregistered: '#62C462',
            forbidden: '#b9b9b9'
        };

        const registerIcon = {
            registered: 'ios-remove',
            unregistered: 'ios-add',
            forbidden: 'ios-close',
        };

        return (
            <HeartBeat
                ref={(button) => this.animatedButton = button}
                onPress={this.props.onPress}
                style={{
                    backgroundColor: buttonColor[this.props.registered],
                    width: this.props.buttonSize,
                    height: this.props.buttonSize,
                    borderRadius: 50,
                    elevation: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 15,
                }}
            >
                <Icon name={registerIcon[this.props.registered]} color='#FAFAFA' size={this.props.iconSize}/>
            </HeartBeat>
        );

    };
}

RegisterButton.propTypes = {
    registered: React.PropTypes.oneOf([
        'registered', 'unregistered', 'forbidden',
    ]),
    iconSize: React.PropTypes.number,
    buttonSize: React.PropTypes.number,
    onPress: React.PropTypes.func,
};

RegisterButton.defaultProps = {
    iconSize: 20,
    buttonSize: 20,
    registered: 'registered',
};