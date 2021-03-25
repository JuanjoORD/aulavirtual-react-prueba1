import React, { Component } from 'react'
import { NotificationManager } from "react-notifications";


class CurrentSchoolCycle extends Component{
       
    render(){
        console.log('props CurrentSchoolCycle:', this.props)
        const { data } = this.props         

        return(
            <div style={{backgroundColor: 'white', padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                <center><h3 style={{color: 'black'}}>Ciclo escolar</h3></center>
                <div className="alert alert-success rounded" style={{marginLeft: '10px', marginRight: '10px'}}>
                    <span className="badge badge-pill badge-light">Ciclo escolar actual:</span>
                    <span className="badge badge-pill badge-light">{data.year}</span>
                </div>
            </div>
        )
    }
}

export default CurrentSchoolCycle