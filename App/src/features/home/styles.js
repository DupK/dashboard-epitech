/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    iconStyle: {
        flex: 0.15,
        fontSize: 40,
        color: "rgba(255, 255, 255, 1)",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 15,
    },

    iconStyleFA: {
        flex: 0.15,
        fontSize: 40,
        color: "rgba(255, 255, 255, 1)",
        justifyContent: 'center',
        marginLeft: 10,
    },

    ThumbStyle: {
        flex: 0.15,
        justifyContent: 'center',
    },

    itemTitle: {
        fontWeight: 'bold',
        fontFamily: 'Nunito-ExtraLight',
        color: 'white',
    },

    itemTitleLogout: {
        flex: 0.75,
        fontWeight: 'bold',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
    },

    profileTitle: {
        flex: 0.75,
        fontWeight: 'bold',
        fontFamily: 'Nunito-Light',
    },

    itemDescr: {
        fontFamily: 'Nunito-Light',
        fontWeight: 'normal',
        fontSize: 12,
        color: 'white',
        lineHeight: 22,
    },

    arrowStyle: {
        flex: 0.05,
        fontSize: 10,
        alignSelf: 'center',
        color: 'white',
        marginRight: 3,
    },

    trafficLightStyle: {
        flex: 0.05,
        fontSize: 17,
        alignSelf: 'center',

    },

    logoutStyle: {
        flex: 0.15,
        fontSize: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 15,
        color: "#b24c42",
    },
});

export default styles;