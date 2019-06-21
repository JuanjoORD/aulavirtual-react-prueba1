import React, { Component } from 'react';

class Siderbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="main-sidebar px-0 col-12 col-md-3 col-lg-2">
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a
                            href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto"><img id="main-logo"
                                                                 className="d-inline-block align-top mr-1"
                                                                 src="https://designrevision.com/demo/shards-dashboard-lite-react/static/media/shards-dashboards-logo.60a85991.svg"
                                                                 alt="Shards Dashboard"
                            /><span
                                className="d-none d-md-inline ml-1">Ciancoders</span></div>
                        </a><a className="toggle-sidebar d-sm-inline d-md-none d-lg-none"><i
                        className="material-icons"></i></a>
                    </nav>
                </div>
                <form className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
                >
                    <div className="ml-3 input-group input-group-seamless">
                        <div className="input-group-prepend"><span className="input-group-text"><i
                            className="material-icons">search</i></span><input
                            placeholder="Search for something..."
                            aria-label="Search"
                            className="navbar-search form-control"/></div>
                    </div>
                </form>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item"><a className="nav-link active" aria-current="page"
                                                    href="/blog-overview">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">edit</i></div>
                            <span>Blog Dashboard</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/blog-posts">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">vertical_split</i>
                            </div>
                            <span>Blog Posts</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/add-new-post">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">note_add</i></div>
                            <span>Add New Post</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/components-overview">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">view_module</i>
                            </div>
                            <span>Forms &amp; Components</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/tables">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">table_chart</i>
                            </div>
                            <span>Tables</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/user-profile-lite">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">person</i></div>
                            <span>User Profile</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/errors">
                            <div className="d-inline-block item-icon-wrapper"><i
                                className="material-icons">error</i></div>
                            <span>Errors</span></a></li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default Siderbar;
