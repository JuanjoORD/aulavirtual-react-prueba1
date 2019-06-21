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

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute path="/" component={Demo} />
                <ProtectedRoute path="/page2" component={Demo2} />
                <Route>
                    <div>
                        <h1>Pagina no encontrada</h1>
                    </div>
                </Route>
            </Switch>
        </div>
    </div>
);
