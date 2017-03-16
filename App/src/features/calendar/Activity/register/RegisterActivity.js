/**
 * Created by Utilisateur on 15/03/2017.
 */

import React, {Component} from 'react';
import moment from 'moment';
import {
    View,
    LayoutAnimation
} from 'react-native';
import {observer} from 'mobx-react/native';
import {wasPresent} from '../../utils';

import RegisterBox from './RegisterBox';
import RegisterButton from './RegisterButton';
import RegisterText from './RegisterText';

const RegisterActivity = observer(({ activityStore, event }) => {

    const isEventPassed = moment(event.end).isBefore(moment());
    const registered = isEventPassed && !wasPresent(event.registered) ? 'forbidden' : event.registered;

    const registerText = {
        registered: 'You are registered.',
        unregistered: 'You are not registered.',
        forbidden: isEventPassed
            ? 'You can\'t register anymore.'
            : 'You can\'t register.',
        present: 'You were present to this activity.'
    };

    const registerCallbacks = {
        registered: async () => await activityStore.unregisterActivity(event),
        unregistered: async () => await activityStore.registerActivity(event),
        forbidden: () => null,
        present: () => null
    };

    const registerActivity = async () => {
        const isValidated = await registerCallbacks[registered]();

        if (isValidated) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            activityStore.markActivityAsRegistered();
        }
    };

    return (
        <RegisterBox>
            <RegisterButton
                registered={registered}
                buttonSize={25}
                iconSize={25}
                onPress={registerActivity}
            />
            <RegisterText>
                { registerText[registered] }
            </RegisterText>
        </RegisterBox>
    );
});

RegisterActivity.propTypes = {
    activityStore: React.PropTypes.object,
    event: React.PropTypes.object,
};

export default RegisterActivity;
