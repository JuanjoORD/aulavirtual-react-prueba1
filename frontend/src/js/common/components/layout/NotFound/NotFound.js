import React, { Component } from 'react';
import { Link } from "react-router-dom";


class NotFound extends Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center pt-3">
                <div className="error-template">
                    <h1>Oops!</h1>
                    <h2>404 Pagina no encontrada</h2>
                    <div className="error-actions">
                        <Link to="/"> Regresar</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
