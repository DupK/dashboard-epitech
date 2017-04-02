/**
 * Created by jules on 12/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    monthSelectorAndroid: {
        flex: 10,
        backgroundColor: '#233445',
        elevation: 20,
    },

    monthSelectorIOS: {
        flex: 10,
        zIndex: 10,
        backgroundColor: '#233445',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2
            },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
    },

});

export default styles;