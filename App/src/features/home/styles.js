/**
 * Created by jules on 12/02/17.
 */

import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';
const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 54;
const AVATAR_SIZE = 70;

const scrollStyle = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: '#233445',
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#233445',
        overflow: 'visible',
    },
    headerContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        marginTop: 10,
    },
    bar: {
        height: HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 16,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT + 12,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureAndGaugesContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    pictureAndGauges: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    leftGauge: {
        position: 'absolute',
        top: (HEADER_MAX_HEIGHT / 3) - (100 / 2) + 8,
        left: Dimensions.get('window').width / 4,
    },
    rightGauge: {
        position: 'absolute',
        top: (HEADER_MAX_HEIGHT / 3) - (100 / 2) + 8,
        right: Dimensions.get('window').width / 4
    },
    gaugeValue: {
        color: '#FFFFFF',
        fontSize: 17,
        alignSelf: 'center',
    },
    gaugeDescription: {
        color: '#c4c4c4',
        fontSize: 10,
        alignSelf: 'center',
    },
    picture: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        resizeMode: 'contain',
        zIndex: 10,
    },
    username: {
        color: 'white',
        fontSize: 17,
        marginBottom: 20,
        alignSelf: 'center',
    },
    blockInfoContainer: {
        flex: 2,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#617487',
        justifyContent: 'space-around',
        elevation: 30,
        backgroundColor: 'black',
    }
});

export default scrollStyle;