import { StyleSheet, Dimensions} from 'react-native';

const modalHeight = Dimensions.get('window').height / 4;
const styles = StyleSheet.create({

    container: {
        paddingBottom: 40,
        backgroundColor: "#39516a"
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#233445',
    },

    loadingText: {
        fontSize: 14,
        color: "#FFFFFF",
        margin: 15,
    },

    list: {
        marginTop: 5,
        marginBottom: 5
    },

    dataContainerAndroid: {
        margin: 5,
        padding: 8,
        elevation: 2,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
    },

    dataContainerIOS: {
        margin: 5,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
    },

    selfDataContainerAndroid: {
        elevation: 5,
        padding: 10,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
    },

    selfDataContainerIOS: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
        padding: 10,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: '100',
        fontSize: 15,
        marginRight: 10,
        color: "#FFFFFF",
    },

    input : {
        flex: 0.8,
        color: '#FAFAFA',
        height: 50,
        fontSize: 13,
        paddingLeft: 5,
    },

    inputContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        margin: 5,
    },

    inputIcon: {
        flex: 0.05,
        paddingRight: 10,
        color: 'rgba(255, 255, 255, 0.5)',
        alignSelf: 'center',
    },

    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: modalHeight,
    },

    modalSubContainer: {
        flex: 1,
        backgroundColor: '#203040',
        margin: 5,
    },

    swiper: {
        justifyContent: 'center',
    },

    spiderContainer: {
        alignItems: 'center',
    },

    linesContainer: {
        justifyContent: 'center',
    }

});

export default styles;