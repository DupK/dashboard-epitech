/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        backgroundColor: '#2c3e50',
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null,
    },

    logoImage: {
        alignSelf: 'center',
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 20,
    },

    boxTitle: {
        margin: 3,
        alignSelf: 'center',
        fontFamily: 'Nunito-ExtraLight',
        color: "#FFFFFF",
        fontSize: 20,
    },

    title: {
        fontWeight: 'bold',
    },

    subTitle: {

    },

    iconButton: {
        color: "#FFFFFF",
        fontSize: 40,
    },

    iconInputMail: {
        color: "#FFFFFF",
        marginLeft: 13,
    },

    iconInputPwd: {
        color: "#FFFFFF",
        marginLeft: 16,
    },

    pwdInput: {
        fontSize: 14,
        color: "#FFFFFF",
        fontFamily: "Nunito-Light",
        marginLeft: 15,
    },

    mailInput: {
        fontSize: 14,
        color: "#FFFFFF",
        fontFamily: "Nunito-Light",
        marginLeft: 15,
    },

    emptyBox: {
        justifyContent: 'flex-end',
        flex: 0.4,
    },

    forgroundTitleBox: {
        backgroundColor: 'rgba(44, 62, 80, 0.26)',
    },

    notLoggedMessage: {
        alignSelf: 'center',
        fontFamily: 'Nunito-ExtraLight',
        color: "#ff3d31",
        fontSize: 16,
    },
});

export default style;