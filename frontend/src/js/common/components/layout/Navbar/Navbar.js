import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };
    render() {
        const { navToggle, logOut } = this.props;

        return (
            <nav className="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
                <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="ml-3 input-group input-group-seamless" />
                </div>
                <ul className="border-left flex-row navbar-nav">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle color="light" caret className="nav-item-dropdown border-0">
                            <img className="user-avatar rounded-circle mr-2"
                                 src="https://designrevision.com/demo/shards-dashboard-lite-react/static/media/0.73476783.jpg"
                                 alt="User Avatar" />
                            <span className="d-none d-md-inline-block">User Cian</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem>
                                <a tabIndex="0"
                                   href="/user-profile">
                                    <i className="material-icons"></i>
                                    Profile
                                </a>
                            </DropdownItem>
                            <DropdownItem>
                                <a tabIndex="0"
                                   href="/edit-user-profile">
                                    <i className="material-icons"></i>
                                    Edit Profile
                                </a>
                            </DropdownItem>
                            <DropdownItem>
                                <a tabIndex="0"
                                   href="/file-manager-list">
                                    <i className="material-icons"></i>
                                    Files
                                </a>
                            </DropdownItem>
                            <DropdownItem>
                                <a tabIndex="0"
                                   href="/transaction-history">
                                    <i className="material-icons"></i>
                                    Transactions
                                </a>
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
