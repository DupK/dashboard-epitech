import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        paddingBottom: 40,
        backgroundColor: "#39516a"
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },

    loadingText: {
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 14,
        color: "#FFFFFF",
        margin: 15,
    },

    dataContainer: {
        margin: 1,
        padding: 10,
        backgroundColor: '#2c3e50',
        flexDirection: 'row',
        alignItems: 'center',
    },

    separator: {
        height: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: '#FFF'
    },

    gpaText: {
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'flex-end',
        color: "#FFFFFF",
    },

    mainText: {
        fontWeight: '300',
        fontSize: 12,
        flex: 1,
        alignItems: 'center',
        color: "#FFFFFF",
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
        marginRight: 10,
        color: "#FFFFFF",
    }

});

export default styles;
