import React, {Component} from 'react';


class Buttons extends Component {
    render() {
        return (
            <div className="border-top p-0 px-3 pt-3">
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Small Buttons</strong>
                    <div className="d-flex">
                        <button className="btn btn-primary btn-sm mr-1">Primary</button>
                        <button className="btn btn-secondary btn-sm mr-1">Secondary</button>
                        <button className="btn btn-success btn-sm mr-1">Success</button>
                        <button className="btn btn-danger btn-sm mr-1">Danger</button>
                        <button className="btn btn-warning btn-sm mr-1">Warning</button>
                        <button className="btn btn-info btn-sm mr-1">Info</button>
                        <button className="btn btn-dark btn-sm mr-1">Dark</button>
                        <button className="btn btn-light btn-sm mr-1">Light</button>
                    </div>
                </div>
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Small Outline Buttons</strong>
                    <div className="d-flex">
                        <button className="btn btn-outline-primary btn-sm mr-1">Primary</button>
                        <button className="btn btn-outline-secondary btn-sm mr-1">Secondary</button>
                        <button className="btn btn-outline-success btn-sm mr-1">Success</button>
                        <button className="btn btn-outline-danger btn-sm mr-1">Danger</button>
                        <button className="btn btn-outline-warning btn-sm mr-1">Warning</button>
                        <button className="btn btn-outline-info btn-sm mr-1">Info</button>
                        <button className="btn btn-outline-dark btn-sm mr-1">Dark</button>
                        <button className="btn btn-outline-light btn-sm mr-1">Light</button>
                    </div>
                </div>
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Buttons</strong>
                    <div className="d-flex">
                        <button className="btn btn-primary mr-1">Primary</button>
                        <button className="btn btn-secondary mr-1">Secondary</button>
                        <button className="btn btn-success mr-1">Success</button>
                        <button className="btn btn-danger mr-1">Danger</button>
                        <button className="btn btn-warning mr-1">Warning</button>
                        <button className="btn btn-info mr-1">Info</button>
                        <button className="btn btn-dark mr-1">Dark</button>
                        <button className="btn btn-light mr-1">Light</button>
                    </div>
                </div>
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Outline Buttons</strong>
                    <div className="d-flex">
                        <button className="btn btn-outline-primary mr-1">Primary</button>
                        <button className="btn btn-outline-secondary mr-1">Secondary</button>
                        <button className="btn btn-outline-success mr-1">Success</button>
                        <button className="btn btn-outline-danger mr-1">Danger</button>
                        <button className="btn btn-outline-warning mr-1">Warning</button>
                        <button className="btn btn-outline-info mr-1">Info</button>
                        <button className="btn btn-outline-dark mr-1">Dark</button>
                        <button className="btn btn-outline-light mr-1">Light</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Buttons;
