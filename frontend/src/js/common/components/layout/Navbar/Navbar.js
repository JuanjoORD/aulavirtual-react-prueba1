import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from "react-router-dom";

const defaultAvatar = require("assets/img/avatar-placeholder.png");


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };
    render() {
        const { navToggle, logOut, user } = this.props;

        return (
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
                <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="ml-3 input-group input-group-seamless" />
                </div>
                <ul className="border-left flex-row navbar-nav">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle color="light" caret className="nav-item-dropdown border-0">
                            <img className="user-avatar rounded-circle mr-3"
                                 src={(user.profile && user.profile.avatar) ? user.profile.avatar : defaultAvatar}
                                 alt="User Avatar" />
                            <span className="d-none d-md-inline-block">{user.first_name}</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem>
                                <Link tabIndex="0"
                                   to="/user-profile">
                                    <i className="material-icons"></i>
                                    Profile
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link tabIndex="0"
                                   to="/edit-user-profile">
                                    <i className="material-icons"></i>
                                    Edit Profile
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link tabIndex="0"
                                   to="/file-manager-list">
                                    <i className="material-icons"></i>
                                    Files
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link tabIndex="0"
                                   to="/transaction-history">
                                    <i className="material-icons"></i>
                                    Transactions
                                </Link>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                <a tabIndex="0" className="text-danger" onClick={logOut} href="/">
                                    <i className="material-icons text-danger"></i>
                                    Logout
                                </a>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
