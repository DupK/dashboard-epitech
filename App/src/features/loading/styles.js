/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#233445",
        flex: 1,
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    loadingSubContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainTitle: {
        alignSelf: 'center',
        fontFamily: 'Nunito-ExtraLight',
        color: "#FFFFFF",
        fontSize: 20,
    },

    title: {
        fontWeight: 'bold',
    },

    fetchingTitle: {
        fontFamily: 'Nunito-ExtraLight',
        color: "#FFFFFF",
        fontSize: 14,
    },

    iconFetching: {
        color: "#FFFFFF",
    },

    slogan: {
        fontFamily: 'Nunito-ExtraLight',
        fontWeight: "100",
        color: "#FFFFFF",
        fontSize: 13.5,
        alignSelf: 'center',
    },

    loadingText: {
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 14,
        marginTop: 20,
        color: 'white',
    }
});

export default styles;