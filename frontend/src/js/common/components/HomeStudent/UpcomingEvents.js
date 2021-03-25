import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";


class UpcomingEvents extends Component{       
       
 
    render(){
        console.log('props UpcomingEvents Home Student:', this.props)
        const { eventStudent } = this.props

        return(
            <div style={{backgroundColor: '#7aa0f1', padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                <center><h3 style={{color: 'white'}}>Eventos próximos</h3></center>
                {
                    eventStudent.event.map(event => {
                        return(
                            <div className="card mt-2" key={event.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">{event.description}.
                                        <br/>
                                        <u>Fecha: {event.date}</u>
                                    </p>                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default UpcomingEvents