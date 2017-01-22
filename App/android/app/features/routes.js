/**
 * Created by jules on 20/01/17.
 */

import React from 'react';
import Login from './login/login';
import Header from './header/header_dark';

const routes = {
    login: (navigator) => <Login navigator={navigator}/>,
    home: (navigator) => <Header navigator={navigator}/>,
};

export default routes;