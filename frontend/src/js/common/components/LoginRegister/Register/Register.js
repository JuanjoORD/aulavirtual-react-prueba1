import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';

class Registro extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div>
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Bienvenido a CianStarter</h1>
                    <p>Página de registro</p>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">REGISTRO</h5>
                        <RegisterForm onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Registro;
