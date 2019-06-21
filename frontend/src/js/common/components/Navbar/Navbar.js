import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';
import './navbar.css';
import './burger-sidebar.css';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { verMenu: false };
  }
  componentWillMount() {
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({ verMenu: false });
    }
  }

  toggleMenu() {
    return (e) => {
      e.preventDefault();
      this.setState({ verMenu: !this.state.verMenu });
    };
  }
  logOut(event) {
    this.props.logOut();
  }

  render() {
    return (
      <div>
        <header className="topnavbar-wrapper">
          <nav className="navbar topnavbar">
            <div className="nav-wrapper">
              <ul className="nav navbar-nav">
                <li><a href="#/" style={{ padding: 0 }}><img className="img-responsive" src={require('../../../../assets/img/logo.png')} alt="Logo" /></a></li>
                <li><a title="Lock screen" onClick={this.props.cerrarSesion}><em className="icon-lock" /></a></li>
              </ul>
            </div>
          </nav>
        </header>
        <Menu>
          <a id="home" className="menu-item" href="/#/">Home</a>
          <a onClick={ this.logOut } className="menu-item--small" href="/#/">Log Out</a>
        </Menu>
      </div>
    );
  }
}
Navbar.propTypes = {
};

export default Navbar;
