/**
 * Created by jules on 22/02/17.
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    documentText: {
        alignSelf: 'center',
        color: '#FAFAFA',
        fontSize: 12,
        margin: 5,
    },

    documentIcon: {
        marginTop: 5,
        alignSelf: 'center',
        color: '#FAFAFA',
    },

    documentSubContainer: {
        marginTop: 0,
        margin: 10,
        width: 100,
        elevation: 3,
        backgroundColor: '#233445'
    },

    documentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        margin: 10,
    },

    teamMemberImage: {
        borderWidth: 1,
        borderRadius: 3,
        margin: 5,
    },

    teamMasterImage: {
        borderWidth: 1,
        borderRadius: 3,
        margin: 5
    },

    teamImageContainer: {
        flex: 0.94,
    },

    teamContainer: {
        margin: 10,
        marginBottom: 3,
        backgroundColor: '#233445',
        elevation: 1
    },

    teamSubContainer: {
        marginTop: 3,
        flexDirection: 'row',
        flex: 1
    },

    detailsText: {
        fontWeight: "bold",
        fontSize: 12,
        color: "#FAFAFA",
    },

    detailsSubContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 12,
    },

    detailsContainer: {
        backgroundColor: "#233445",
        elevation: 10,
        paddingBottom: 15,
    },

    descriptionDetailsText: {
        color: "#FAFAFA",
        fontSize: 12,
        marginLeft: 10,
        marginTop: 5,
    },

    bannerDetailsText: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 12,
        alignSelf: 'center'
    },

    bannerDetailsIcon: {
        color: "#FAFAFA",
    },

    headerDetailsText: {
        color: "#FAFAFA",
        flex: 0.6,
    },

    headerDetailsIcon: {
        color: "#FAFAFA",
        fontSize: 24,
        flex: 0.1,
    },

    headerDetailsSubContainer: {
        flex: 0.05,
    },

    headerDetailsContainer: {
        margin: 10,
        marginBottom: 0,
        elevation: 4,
        height: 70,
        backgroundColor: "#233445",
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#16212C',
        alignItems: 'center',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#233445',
    },

    loadingText: {
        fontSize: 14,
        color: "#FAFAFA",
        margin: 15,
    },
});

export default styles;