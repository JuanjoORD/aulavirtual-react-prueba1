import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import { upcomingHomework } from '../../../redux/modules/assignment_student/assignment_for_student';


class UpcomingHomework extends Component{       
       
 
    render(){
        console.log('props UpcomingHomework Home Student:', this.props)
        const { upcomingHomeworkData } = this.props

        return(
            <div style={{backgroundColor: '#7aa0f1', padding: '2px 3px 2px 3px'}} className="rounded">
                <center><h3 style={{color: 'white'}}>Tareas próximas</h3></center>
                {
                    upcomingHomeworkData.map(homework => {
                        return(
                            <div className="card mt-2" key={homework.hw.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{homework.hw.title}</h5>
                                    <p className="card-text">{homework.hw.description}.
                                        <br/>
                                        <u>Fecha de entrega: {homework.hw.date_delivery}</u>
                                    </p>
                                    <a href={`/#/assignment_student/${homework.assignmentId}/homework/${homework.hw.id}`} className="btn btn-primary">
                                        Ver tarea
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default UpcomingHomework