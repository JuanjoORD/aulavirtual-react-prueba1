import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// maquetado base
import Navbar from "./common/components/Navbar/NavbarContainer";

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
                            <Navbar />
                            <div className="content-wrapper">
                                <Component {...props} />
                            </div>
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
