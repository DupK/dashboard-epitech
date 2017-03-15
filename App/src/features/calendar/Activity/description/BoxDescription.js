/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";

import { observer } from 'mobx-react/native';

const BoxDescription = observer(({ style, icon, title, children }) => {
    return (
        <View style={style}>
            <View style={styles.titleContainer}>
                { icon }
                <Text style={styles.title}>
                    { title }
                </Text>
            </View>
            <View style={styles.descriptionContainer}>
                <ScrollView>
                    { children }
                </ScrollView>
            </View>
        </View>
    );
});

BoxDescription.propTypes = {
    children: React.PropTypes.any.isRequired,
    icon: React.PropTypes.node.isRequired,
    title: React.PropTypes.string.isRequired,
    style: React.PropTypes.any,
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: '#FAFAFA',
        marginLeft: 15,
    },
    descriptionContainer: {
        paddingBottom: 30,
    }
});

export default BoxDescription;
