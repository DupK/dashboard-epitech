/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from './Home';

const styles = StyleSheet.create({
    iconStyle: {
        flex: 0.15,
        fontSize: 50,
        color: "#2c3e50",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 5,
    },

    iconStyleFA: {
        flex: 0.15,
        fontSize: 40,
        color: "#2c3e50",
        justifyContent: 'center',
        marginLeft: 5,
    },

    ThumbStyle: {
        flex: 0.15,
        justifyContent: 'center',
    },

    itemTitle: {
        flex: 0.75,
        fontWeight: 'bold',
        fontFamily: 'Nunito-ExtraLight',
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
        fontFamily: 'Nunito-ExtraLight',
    },

    itemDescr: {
        fontWeight: 'normal',
        fontSize: 12,
    },

    arrowStyle: {
        flex: 0.03,
        fontSize: 20,
        alignSelf: 'center',
        color: '#2c3e50',
    },

    trafficLightStyle: {
        flex: 0.05,
        fontSize: 17,
        alignSelf: 'center',

    },

    logoutStyle: {
        flex: 0.15,
        fontSize: 50,
        marginRight: 5,
        marginLeft: 5,
        color: "#b24c42",
    },

    //scrollable header
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2c3e50',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
    },
    bar: {
        height: HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'Nunito-Light',
        fontSize: 16,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;