import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// maquetado base
import SiderBar from './common/components/layout/Siderbar/SiderBar';
import Footer from './common/components/layout/Footer/Footer';

import Navbar2 from "./common/components/layout/Navbar/Navbar2";
// funciona para determinar si puede acceder a la vista
function isAuthenticated() {
    return localStorage.getItem("token");
}

class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated() ? (
                        <div>
                            <SiderBar />
                            <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-navbar bg-white sticky-top">
                                    <div className="p-0 container">
                                        <Navbar2 />
                                    </div>
                                </div>
                                <div className="main-content-container px-4 container-fluid">
                                    <div className="page-header py-4 no-gutters row">
                                        <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-4">
                                            <Component {...props} />
                                        </div>
                                    </div>
                                </div>
                            </main>
                            {/*<Body />*/}
                            {/*<div className="content-wrapper">*/}
                            {/*    <Component {...props} />*/}
                            {/*</div>*/}
                            <Footer />
                        </div>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

export default ProtectedRoute;
