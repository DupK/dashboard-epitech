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
        color: 'white',
    },

    itemTitleLogout: {
        flex: 0.75,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    profileTitle: {
        flex: 0.75,
        fontWeight: 'bold',
    },

    itemDescr: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'white',
        lineHeight: 18,
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
        color: "#cd5447",
    },
});

export default styles;