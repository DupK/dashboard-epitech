/**
 * Created by desver_f on 27/03/17.
 */

import { NetInfo } from 'react-native';
import stores from '../stores';
import refreshApplicationData from './RefreshApplication';

export default function monitorInternetConnection() {
    NetInfo.isConnected.fetch().then((isConnected) => {
        if (!isConnected) {
            stores.ui.noInternet();
        }
    });

    NetInfo.isConnected.addEventListener('change', _handleConnectionChange);
}

async function _handleConnectionChange(isConnected) {
    const { ui, session } = stores;

    if (isConnected) {

        //Refresh application data if user enables his internet connection after being offline
        if (ui.currentState === ui.state.noInternet && session.loggedIn) {
            await refreshApplicationData({ withLogin: true });
            return;
        }

        ui.currentState = ui.state.default;
        return;
    }

    ui.noInternet();
}
