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
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)'
    },

    headerArrow: {
        alignSelf: 'center',
        padding: 20,
    },

    headerIcon: {
        color: '#FFFFFF',
    },

    bodyContainer: {
        marginTop: 5,
        marginBottom: 5,
        flex: 0.9,
    },

    headerAndroid: {
        backgroundColor: '#233445',
        elevation: 3,
        margin: 6,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 2,
    },

    headerIOS: {
        backgroundColor: '#233445',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
        margin: 6,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 2,
    },

    moduleText: {
        flex: 10,
        color: '#FFFFFF',
        marginLeft: 10,
    },

    gradeText: {
        flex: 0.8,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    subHeaderText: {
        borderBottomWidth: 0,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    contentAndroid: {
        backgroundColor: '#203040',
        elevation: 2,
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'row',
        margin: 6,
        height: 35,
    },

    contentIOS: {
        backgroundColor: '#203040',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1,
        shadowOpacity: 0.5,
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'row',
        margin: 6,
        height: 35,
    },

    textContent: {
        flex: 0.2,
        color: '#FFFFFF',
        marginLeft: 5,
        fontSize: 13,
    },

    markContent: {
        color: '#FFFFFF',
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

    selfRowAndroid: {
        backgroundColor: '#233445',
        elevation: 10,
    },

    selfRowIOS: {
        backgroundColor: '#233445',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
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
        alignSelf: 'center',
        marginLeft: 5,
    },

    mark: {
        color: '#FFFFFF',
        alignSelf: 'center',
        marginRight: 5,
    },

    loadingText: {
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