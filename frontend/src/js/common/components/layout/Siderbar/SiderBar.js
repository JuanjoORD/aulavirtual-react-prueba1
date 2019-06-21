import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Siderbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                {/*<form className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
                >
                    <div className="ml-3 input-group input-group-seamless">
                        <div className="input-group-prepend"><span className="input-group-text"><i
                            className="material-icons">search</i></span><input
                            placeholder="Search for something..."
                            aria-label="Search"
                            className="navbar-search form-control"/></div>
                    </div>
                </form>*/}
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Blog Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/page2" className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Blog Posts</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default Siderbar;
