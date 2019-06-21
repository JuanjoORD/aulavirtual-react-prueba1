import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Login from './common/components/Login/LoginContainer';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute path="/page" component={Demo} />
                <Route path="*" component={Login} />
            </Switch>
        </div>
    </div>
);
