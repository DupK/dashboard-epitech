/**
 * Created by Utilisateur on 15/03/2017.
 */
import React from "react";
import _ from "lodash";
import moment from "moment";
import {
    View,
    Text,
    Image,
    StyleSheet,
    LayoutAnimation
} from "react-native";
import {observer} from "mobx-react/native";

import RegisterButton from '../register/RegisterButton';

const borderLeftWidth = {
    taken: 0,
    available: 3,
    yours: 3,
};

const borderLeftColor = {
    taken: 'transparent',
    available: '#62C462',
    yours: '#FFD783',
};

const slotStateToRegister = {
    yours: (oneshot) => oneshot ? 'forbidden' : 'registered',
    available: (_) => 'unregistered',
};

const backgroundColor = {
    taken: '#293a4d',
    available: '#293a4d',
    yours: '#293a4d',
};

const textColor = {
    taken: '#FAFAFA',
    available: '#FAFAFA',
    yours: '#FFD783',
};

const Slot = observer(({ oneshot, state, date, memberPicture, slotObject, activityStore }) => {

    const registerCallbacks = {
        yours: async () => await activityStore.unregisterActivitySlot(slotObject),
        available: async () => await activityStore.registerActivitySlot(slotObject),
        taken: () => null,
    };

    const momentDate = moment(date, 'YYYY-MM-DD HH:mm:ss');

    //Weird cases where picture url is not complete (especially on coaching activities)
    const pictureWithUrl = _.startsWith(memberPicture, 'https://cdn.local.epitech.eu/userprofil/')
        ? memberPicture
        : `https://cdn.local.epitech.eu/userprofil/${memberPicture}`;

    const registerButton = state === 'available'
        ? (
            <RegisterButton
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    registerCallbacks[state]()
                }}
                buttonSize={25}
                iconSize={22}
                registered={slotStateToRegister[state](oneshot)}
            />
        )
        : (
            <Image
                style={styles.picture}
                source={{ uri: pictureWithUrl }}
            />
        );

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: backgroundColor[state],
                borderLeftWidth: borderLeftWidth[state],
                borderLeftColor: borderLeftColor[state],
            }
        ]}>
            <Text
                style={{
                    color: textColor[state],
                    fontFamily: 'Nunito-Light',
                    fontSize: 15,
                }}
            >
                { momentDate.format('ddd D MMM') } /&nbsp;
                <Text style={{ fontWeight: 'bold' }}>{ momentDate.format('HH:mm') }</Text>
            </Text>
            { registerButton }
        </View>
    );
});

Slot.propTypes = {
    state: React.PropTypes.oneOf([
        'taken',
        'available',
        'yours',
    ]).isRequired,
    date: React.PropTypes.string.isRequired,
    memberPicture: React.PropTypes.string,
    oneshot: React.PropTypes.bool.isRequired,
    slotObject: React.PropTypes.object.isRequired,
    activityStore: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        elevation: 3,
        paddingLeft: 10,
    },
    picture: {
        height: 25,
        width: 25,
        borderRadius: 50,
        marginRight: 15,
    }
});

export default Slot;
