/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import {Actions} from "react-native-mobx";
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import { observer } from 'mobx-react/native';

import RegisterBox from './RegisterBox';
import RegisterText from './RegisterText';

const ViewAvailableSlots = observer(({ activityTitle, isRegisteredToRelatedProject }) => {

    if (!isRegisteredToRelatedProject) {
        return (
            <RegisterBox>
                <RegisterText>
                    You are not registered to the related project.
                </RegisterText>
            </RegisterBox>
        );
    }

    return (
        <RegisterBox>
            <TouchableOpacity
                style={{ flexDirection: 'row', }}
                onPress={() => Actions.availableSlots({ title: `Slots for ${activityTitle}`})}
            >
                <RegisterText>
                    Check out available slots
                </RegisterText>
                <SLIcon name="arrow-right" style={styles.iconStyle}/>
            </TouchableOpacity>
        </RegisterBox>
    );
});

ViewAvailableSlots.propTypes = {
    activityTitle: React.PropTypes.string.isRequired,
    isRegisteredToRelatedProject: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    iconStyle: {
        color: '#FAFAFA',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 15,
    }
});

export default ViewAvailableSlots;
