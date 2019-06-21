import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        const { navToggle } = this.props;
        return (
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
                <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="ml-3 input-group input-group-seamless" />
                </div>
                <ul className="border-left flex-row navbar-nav">
                    <div className="nav-item dropdown">
                        <a aria-haspopup="true"
                            className="text-nowrap px-3 dropdown-toggle nav-link">
                            <img className="user-avatar rounded-circle mr-2"
                                src="https://designrevision.com/demo/shards-dashboard-lite-react/static/media/0.73476783.jpg"
                                alt="User Avatar" />
                            <span className="d-none d-md-inline-block">User Cian</span>
                        </a>
                        <div tabIndex="-1" role="menu"
                             className="collapse dropdown-menu dropdown-menu-small dropdown-menu-right">
                            <a tabIndex="0" className="dropdown-item" href="/user-profile">
                                <i className="material-icons"></i>
                                Profile
                            </a>
                            <a tabIndex="0" className="dropdown-item"
                                href="/edit-user-profile">
                                <i className="material-icons"></i>
                                Edit Profile
                            </a>
                            <a tabIndex="0" className="dropdown-item"
                                href="/file-manager-list">
                                <i className="material-icons"></i>
                                Files
                            </a>
                            <a tabIndex="0" className="dropdown-item"
                                href="/transaction-history">
                                <i className="material-icons"></i>
                                Transactions
                            </a>
                            <div tabIndex="-1" className="dropdown-divider"></div>
                            <a tabIndex="0" className="text-danger dropdown-item" href="/">
                                <i className="material-icons text-danger"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </ul>
                <nav className="nav">
                    <a  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
                        onClick={ navToggle } >
                        <i className="material-icons"></i>
                    </a>
                </nav>
            </nav>
        );
    }
}

export default Navbar;
