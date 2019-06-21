import React, { Component } from 'react';

class Navbar2 extends Component {
    render() {
        return (
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
                <form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="ml-3 input-group input-group-seamless">
                        <div className="input-group-prepend"><span className="input-group-text"><i
                            className="material-icons">search</i></span></div>
                        <input placeholder="Search for something..."
                               className="navbar-search form-control"/>
                    </div>
                </form>
                <ul className="border-left flex-row navbar-nav">
                    <li className="border-right dropdown notifications nav-item"><a
                        className="nav-link-icon text-center nav-link">
                        <div className="nav-link-icon__wrapper"><i
                            className="material-icons"></i><span
                            className="badge badge-danger badge-pill">2</span></div>
                    </a>
                        <div className="dropdown-menu dropdown-menu-small collapse">
                            <button tabIndex="0" className="dropdown-item">
                                <div className="notification__icon-wrapper">
                                    <div className="notification__icon"><i
                                        className="material-icons"></i></div>
                                </div>
                                <div className="notification__content"><span
                                    className="notification__category">Analytics</span>
                                    <p>Your website’s active users count increased by <span
                                        className="text-success text-semibold">28%</span> in the
                                        last week.
                                        Great job!</p></div>
                            </button>
                            <button tabIndex="0" className="dropdown-item">
                                <div className="notification__icon-wrapper">
                                    <div className="notification__icon"><i
                                        className="material-icons"></i></div>
                                </div>
                                <div className="notification__content"><span
                                    className="notification__category">Sales</span>
                                    <p>Last week your store’s sales count decreased by <span
                                        className="text-danger text-semibold">5.52%</span>. It
                                        could have
                                        been worse!</p></div>
                            </button>
                            <button tabIndex="0"
                                    className="notification__all text-center dropdown-item">View
                                all Notifications
                            </button>
                        </div>
                    </li>
                    <div className="nav-item dropdown"><a aria-haspopup="true"
                                                          className="text-nowrap px-3 dropdown-toggle nav-link"><img
                        className="user-avatar rounded-circle mr-2"
                        src="https://designrevision.com/demo/shards-dashboard-lite-react/static/media/0.73476783.jpg"
                        alt="User Avatar" /> <span
                        className="d-none d-md-inline-block">Sierra Brooks</span></a>
                        <div tabIndex="-1" role="menu"
                             className="collapse dropdown-menu dropdown-menu-small dropdown-menu-right">
                            <a
                                tabIndex="0" className="dropdown-item" href="/user-profile"><i
                                className="material-icons"></i> Profile</a><a tabIndex="0"
                                                                               className="dropdown-item"
                                                                               href="/edit-user-profile"><i
                            className="material-icons"></i> Edit Profile</a><a tabIndex="0"
                                                                                className="dropdown-item"
                                                                                href="/file-manager-list"><i
                            className="material-icons"></i> Files</a><a tabIndex="0"
                                                                         className="dropdown-item"
                                                                         href="/transaction-history"><i
                            className="material-icons"></i> Transactions</a>
                            <div tabIndex="-1" className="dropdown-divider"></div>
                            <a tabIndex="0" className="text-danger dropdown-item" href="/"><i
                                className="material-icons text-danger"></i> Logout</a></div>
                    </div>
                </ul>
                <nav className="nav"><a href="#"
                                        className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"><i
                    className="material-icons"></i></a></nav>
            </nav>
        )
    }
}

export default Navbar2;
