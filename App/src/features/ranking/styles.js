import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        paddingBottom: 40,
        backgroundColor: "#bdc3c7"
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 14,
        marginTop: 5,
    },

    dataContainer: {
        margin: 1,
        padding: 10,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row',
        alignItems: 'center',
    },

    separator: {
        height: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: '#2c3e50'
    },

    gpaText: {
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'flex-end'
    },

    mainText: {
        fontWeight: '300',
        fontSize: 12,
        flex: 1,
        alignItems: 'center',
    },

    picture: {
        width: 35,
        height: 35,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10,
    },

    flag: {
        width: 25,
        height: 25,
        alignItems: 'center',
        marginRight: 10
    },

    rank: {
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 10
    }

});

export default styles;
