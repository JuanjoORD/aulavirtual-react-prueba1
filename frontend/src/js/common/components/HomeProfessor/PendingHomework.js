import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import { Bar, Doughnut } from "react-chartjs-2"


class PendingHomework extends Component{        
       
    render(){
        console.log('props PendingHomework Home Professor:', this.props)
        const { data } = this.props

        return(
            <div style={{backgroundColor: '#7aa0f1', padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                <center><h3 style={{color: 'white'}}>Pendientes de calificar</h3></center>
                <center><h4 style={{color: 'white'}}><strong>Total: </strong> {data.total}</h4></center>
                {
                    data.professor.map(pending => {
                        return(
                            <div className="alert alert-dark rounded" role="alert" key={pending.assign_id}>
                                <h5 className="alert-heading">{pending.assign_name}</h5>                                                        
                                <p className="mb-0"><strong>Pendientes: </strong>{pending.pending}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default PendingHomework