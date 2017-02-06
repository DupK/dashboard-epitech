import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        paddingBottom: 40,
        backgroundColor: "#bdc3c7"
    },

    dataContainer: {
        margin: 1,
        padding: 10,
        backgroundColor: '#ecf0f1',
        flexDirection: 'row',
        alignItems: 'center',
    },

    selfDataContainer: {
        margin: 1,
        padding: 10,
        backgroundColor: '#9cb4c7',
        flexDirection: 'row',
        alignItems: 'center',
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
        borderWidth: 0,
        borderColor: "#F6BA37"
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
