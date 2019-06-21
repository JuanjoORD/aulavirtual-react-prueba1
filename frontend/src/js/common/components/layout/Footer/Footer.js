import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
                <div className="container">
                    <div className="row">
                        <ul className="nav">
                            <li className="nav-item"><a className="nav-link"
                                                        href="/blog-overview">Home</a></li>
                            <li className="nav-item"><a className="nav-link"
                                                        href="/blog-overview">Services</a></li>
                            <li className="nav-item"><a className="nav-link"
                                                        href="/blog-overview">About</a></li>
                            <li className="nav-item"><a className="nav-link"
                                                        href="/blog-overview">Products</a></li>
                            <li className="nav-item"><a className="nav-link"
                                                        href="/blog-overview">Blog</a></li>
                        </ul>
                        <span
                            className="copyright ml-auto my-auto mr-2">Copyright © 2018 DesignRevision</span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
