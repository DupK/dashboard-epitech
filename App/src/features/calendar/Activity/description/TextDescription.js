/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import {
    Text,
    StyleSheet,
} from "react-native";

import { observer } from 'mobx-react/native';

const TextDescription = observer(({ bold, children }) => {
    return (
        <Text style={[
            styles.container,
            { fontWeight: bold ? 'bold' : 'normal' }
        ]}>
            { children }
        </Text>
    );
});

TextDescription.propTypes = {
    bold: React.PropTypes.bool,
    children: React.PropTypes.any,
};

const styles = StyleSheet.create({
    container: {
        color: '#FAFAFA',
        fontFamily: 'Nunito-Light',
        fontSize: 12,
        lineHeight: 20,
    },
});

export default TextDescription;