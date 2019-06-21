import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';

class Login extends PureComponent {
    static propTypes = {
        nameError: PropTypes.bool.isRequired,
        passError: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        hasNameError: PropTypes.func.isRequired,
        hasPassError: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/page" />);
        }
        return (
            <div>
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Bienvenido a CianStarter</h1>
                    <p>Página de login</p>
                </div>
                <br />
                <div className="row login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">INGRESAR</h5>
                        <LoginForm onSubmit={onSubmit} />
                        <br />
                        <p>Regresar a <a href="/">Home</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
