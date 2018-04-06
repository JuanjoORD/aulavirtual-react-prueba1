import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
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
    const { passError, nameError, submitError } = this.props;
    if (localStorage.getItem('token')) {
      return (<Redirect to="/page" />);
    }
    return (
      <div>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 offset-lg-1 offset-md-1 offset-sm-1 offset-sm-0">
            <h1>Bienvenido a CianStarter</h1>
            <p>Página de login</p>
          </div>
        </div>
        <br />
        <div className="row login-wrapper">
          <div className="col-lg-4 col-md-4 col-sm-11 offset-lg-4 offset-md-4 offset-sm-3 offset-sm-0">
            <div className="panel panel-flat">
              <div className="panel-body">
                <p className="text-center pv">INGRESE SU USUARIO Y CONTRASEÑA.</p>
                <form name="loginForm" className="form-validate mb-lg" onSubmit={(e) => {
                  e.preventDefault();
                  this.props.onSubmit({
                    UserName: this.userName.value,
                    Password: this.userPassword.value,
                  });
                }}
                >
                  <div className="form-group has-feedback">
                    <input id="inputUsername" type="text" name="account_username" placeholder="Usuario"
                           ref={node => {
                             this.userName = node;
                           }}
                           onChange={() => {
                             if (this.userName) {
                               this.props.hasNameError(this.userName.value.trim() === '');
                             }
                           }}
                           autoComplete="off" required="" className="form-control" />
                    <span className="fa fa-user form-control-feedback text-muted" />
                    { nameError && (<span className="text-danger">Este campo es obligatorio</span>) }
                  </div>
                  <div className="form-group has-feedback">
                    <input id="inputPassword" type="password" name="account_password" placeholder="Contraseña"
                           ref={node => {
                             this.userPassword = node;
                           }}
                           onChange={() => {
                             if (this.userPassword) {
                               this.props.hasPassError(this.userPassword.value.trim() === '');
                             }
                           }}
                           required="" className="form-control" />
                    <span className="fa fa-lock form-control-feedback text-muted" />
                    { passError && (<span className="text-danger">Este campo es obligatorio</span>) }
                  </div>
                  <div className="clearfix" />
                  {(this.props.loader) && (<div className="loader-container"><div className="loader" /></div>)}
                  {(!this.props.loader) && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onSubmit({
                          UserName: this.userName.value,
                          Password: this.userPassword.value,
                        });
                      }}
                      className="btn btn-block btn-primary mt-lg"
                      type={'submit'}
                    >
                      Login
                    </button>
                  )}
                </form>
                { submitError && (
                  <div className="alert alert-danger text-center">
                    Verifique que ha ingresado bien su nombre de usuario y contraseña.
                  </div>)}
                <br />
                <p>Regresar a <a href="/">Home</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
