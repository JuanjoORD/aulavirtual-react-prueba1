import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, getMe } from "./redux/modules/cuenta/login";

// maquetado base
import SiderBar from './common/components/layout/Siderbar/SiderBar';
import Footer from './common/components/layout/Footer/Footer';

import Navbar from "./common/components/layout/Navbar/Navbar";
// funciona para determinar si puede acceder a la vista
function isAuthenticated() {
    return localStorage.getItem("token");
}

class PrivateRouteBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }

    componentWillMount() {
        this.props.getMe();
    }

    navToggle = () => {
        this.setState({toggleOpen: !this.state.toggleOpen });
    };


    render() {
        const { component: Component, logOut, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated() ? (
                        <div>
                            <SiderBar toggleOpen={this.state.toggleOpen} navToggle={this.navToggle} logOut={logOut} />
                            <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2">
                                <div className="main-navbar bg-white sticky-top">
                                    <div className="p-0 container">
                                        <Navbar navToggle={this.navToggle} logOut={logOut} />
                                    </div>
                                </div>
                                <div className="main-content-container px-4 container-fluid">
                                    <Component {...props} />
                                </div>
                                <Footer />
                            </main>
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

const mstp = state => ({ ...state });

const mdtp = { logOut, getMe };

const ProtectedRoute = connect(
    mstp,
    mdtp
)(PrivateRouteBase);

export default ProtectedRoute;

