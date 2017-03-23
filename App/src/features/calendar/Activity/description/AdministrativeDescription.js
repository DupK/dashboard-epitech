/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import { View } from "react-native";
import { observer } from 'mobx-react/native';

import TextDescription from './TextDescription';

const AdministrativeDescription = observer((props) => {
    const {
        date,
        startTime,
        endTime,
        room,
        registeredStudents,
    } = props;


    const roomSentence = room
        ? (
            <TextDescription>
                See you in&nbsp;
                <TextDescription bold>{room}</TextDescription>&nbsp;!
            </TextDescription>
        )
        : ( <TextDescription>No room is given for this activity.</TextDescription> );

    return (
        <View>
            <TextDescription>
                This activity is scheduled for the&nbsp;
                <TextDescription bold>{date}</TextDescription>
            </TextDescription>
            <TextDescription>
                It begins at&nbsp;
                <TextDescription bold>{startTime}</TextDescription>&nbsp;
                and finishes at&nbsp;
                <TextDescription bold>{endTime}</TextDescription>&nbsp;
            </TextDescription>
            { roomSentence }
            <TextDescription>
                There are currently&nbsp;
                <TextDescription bold>{registeredStudents}</TextDescription>&nbsp;students registered.
            </TextDescription>
        </View>
    );
});

AdministrativeDescription.propTypes = {
    date: React.PropTypes.string,
    startTime: React.PropTypes.string,
    endTime: React.PropTypes.string,
    room: React.PropTypes.string,
    registeredStudents: React.PropTypes.number,
};

export default AdministrativeDescription;