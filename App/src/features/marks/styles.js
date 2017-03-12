/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#233445',
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
        backgroundColor: '#233445',
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 5,
    },

    moduleText: {
        flex: 10,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },

    gradeText: {
        flex: 0.8,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Light',
        fontWeight: 'bold',
    },

    subHeaderText: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    content: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 6,
    },

    textContent: {
        flex: 0.2,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        marginLeft: 5,
        fontSize: 13,
    },

    markContent: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        fontWeight: '200',
        marginRight: 10,
    },

    iconContent: {
        color: '#FAFAFA',
    },

    /* MarkDetails */

    listContainerStyle: {
        flex: 0.6,
    },

    selfRow: {
        backgroundColor: '#233445',
        elevation: 10,
    },

    selectedMark: {
        backgroundColor: '#FFFFFF'
    },

    scoringContainerStyle: {
        backgroundColor: '#233445',
        flex: 0.3,
        padding: 10,
        borderTopWidth: 0.5,
        borderTopColor: 'white',
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

    selfContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        height: 30,
        backgroundColor: '#233445',
        borderRadius: 5,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    studentMarkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
    },

    studentMarkText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },

    name: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
        marginLeft: 5,
    },

    mark: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
        marginRight: 5,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#233445',
    },

    loadingText: {
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 14,
        color: "#FFFFFF",
        margin: 15,
    },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10,
    },

});

export default styles;