/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    pictureAndroid: {
        width: 30,
        height: 30,
        borderRadius: 40,
        marginRight: 10,
    },

    pictureIOS: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },

    title: {
        flex: 0.7,
        fontWeight: 'bold',
        fontSize: 12,
        color: "#233445",
    },

    detail: {
        fontWeight: 'normal',
        fontSize: 11,
        color: "#233445",
        padding: 10,
    },

    container: {
        backgroundColor: "#fafafa",
    },
});

export default styles;