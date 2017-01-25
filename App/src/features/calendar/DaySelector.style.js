import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    //CALENDAR DAY
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
    },
    dateName: {
        fontSize: 10,
        textAlign: 'center'
    },
    dateNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    weekendDateName: {
        fontSize: 10,
        color: '#A7A7A7',
        textAlign: 'center'
    },
    weekendDateNumber: {
        fontSize: 18,
        color: '#A7A7A7',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
