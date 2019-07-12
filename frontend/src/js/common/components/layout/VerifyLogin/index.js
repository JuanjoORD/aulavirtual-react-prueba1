import React, { Component } from 'react';
import "./verify_login.css";


class VerifyLogin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="verify_login">
                <ul style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    margin: "0",
                    padding: "0",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                }}>
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#ac30e5",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: ".2s",
                        zIndex: "10",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#ff00d2",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: ".4s",
                        zIndex: "9",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#309fe5",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: ".6s",
                        zIndex: "8",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#30e54e",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: ".8s",
                        zIndex: "7",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#e5e330",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: "1s",
                        zIndex: "6",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#ac30e5",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: "1.2s",
                        zIndex: "5",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#ff00d2",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: "1.4s",
                        zIndex: "4",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#309fe5",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: "1.6s",
                        zIndex: "3",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#30e54e",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: "1.8s",
                        zIndex: "2",
                    }} />
                    <li style={{
                        listStyle: "none",
                        width: "10%",
                        height: "100%",
                        background: "#e5e330",
                        boxShadow: "5px 0 5px rgba(0, 0, 0, .2)",
                        animation: "bgColor infinite linear 5s",
                        animationDelay: "2s",
                        zIndex: "1",
                    }} />
                </ul>
                <p
                    style={{
                        position: "absolute",
                        marginLeft: "calc(50vw - 132px)",
                        marginTop: "calc(50vh - 72px)",
                        fontWeight: "bold",
                        fontSize: "3rem",
                        zIndex: "100",
                        color: "white",
                    }}
                >
                    Cargando...
                </p>
            </div>
        )
    }
}

export default VerifyLogin;
