import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Login from './common/components/Login/LoginContainer';
import Demo from './common/components/Demo/Demo';
import Demo2 from './common/components/Demo/Demo2';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Examples';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </div>
);
