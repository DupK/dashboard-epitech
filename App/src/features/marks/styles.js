/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#2c3e50',
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerArrow: {
        alignSelf: 'center',
        margin: 20,
    },

    headerIcon: {
        color: '#FFFFFF',
    },

    bodyContainer: {
        flex: 0.9,
    },

    header: {
        backgroundColor: '#2c3e50',
        height: 35,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 3,
        borderLeftColor: '#62c462',
    },

    headerText: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },

    subHeaderText: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    content: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    },

    textContent: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        marginLeft: 10,
        fontSize: 13,
    },

    markContent: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        marginRight: 10,
    },

    /* MarkDetails */

    listContainerStyle: {
        flex: 0.6,
    },

    scoringContainerStyle: {
        backgroundColor: '#39516a',
        flex: 0.4,
    },

    itemStyle: {
        flex: 0.95,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 13,
    },

    markStyle: {
        flex: 0.05,
        color: '#FFFFFF',
    },

    itemContainerStyle: {
        flexDirection: 'row',
    },

    container: {
        flexDirection: 'row',
        margin: 5,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    name: {
        flex: 0.95,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
    },

    mark: {
        flex: 0.05,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
    },
});

export default styles;