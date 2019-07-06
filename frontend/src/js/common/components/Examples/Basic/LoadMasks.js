import React, { Component } from 'react';
import LoadMask from "../../Utils/LoadMask/LoadMask";


class LoadMasks extends Component {
    render() {
        return (
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header"><h6 className="m-0">Loaders</h6></div>
                <div className="p-0 px-3 pt-3">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Audio"}>
                                <div style={{ height: "200px", width:"100%"}}>Audio</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Bars"}>
                                <div style={{ height: "200px", width:"100%"}}>Bars</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Circles"}>
                                <div style={{ height: "200px", width:"100%"}}>Circles</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Grid"}>
                                <div style={{ height: "200px", width:"100%"}}>Grid</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Hearts"}>
                                <div style={{ height: "200px", width:"100%"}}>Hearts</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Oval"}>
                                <div style={{ height: "200px", width:"100%"}}>Oval</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Puff"}>
                                <div style={{ height: "200px", width:"100%"}}>Puff</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Rings"}>
                                <div style={{ height: "200px", width:"100%"}}>Rings</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"TailSpin"}>
                                <div style={{ height: "200px", width:"100%"}}>TailSpin</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"ThreeDots"}>
                                <div style={{ height: "200px", width:"100%"}}>ThreeDots</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Watch"}>
                                <div style={{ height: "200px", width:"100%"}}>Watch</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"RevolvingDot"}>
                                <div style={{ height: "200px", width:"100%"}}>RevolvingDot</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"CradleLoader"}>
                                <div style={{ height: "200px", width:"100%"}}>CradleLoader</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Triangle"}>
                                <div style={{ height: "200px", width:"100%"}}>Triangle</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"Plane"}>
                                <div style={{ height: "200px", width:"100%"}}>Plane</div>
                            </LoadMask>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <LoadMask light loading={true} type={"MutatingDot"}>
                                <div style={{ height: "200px", width:"100%"}}>MutatingDot</div>
                            </LoadMask>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadMasks;
