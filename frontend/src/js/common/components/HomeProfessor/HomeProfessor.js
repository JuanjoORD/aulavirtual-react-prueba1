import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";

import UpcomingEvents from "../HomeStudent/UpcomingEvents"
import PendingHomework from "./PendingHomework"
import MyAssignments from "./MyAssignments"


class HomeProfessor extends Component{
    state = {
        idAssignment: null
    }

    componentDidMount = () => {
        const { listEventStudent, pendingHomework, assignmentsProfessorHome } = this.props                
        listEventStudent()
        pendingHomework()
        assignmentsProfessorHome()
    }    
       
 
    render(){
        console.log('props HomeProfessor:', this.props)        

        const { eventStudent, pendingHomeworkData, assignmenteProfHome } = this.props              
    
        
        if(eventStudent === null || pendingHomeworkData === null || assignmenteProfHome === null){
            return(
                <div className="col-12">
                    <LoadMask light loading={true} type={"Grid"}>
                        <div style={{ height: "200px", width:"100%"}}>Grid</div>
                    </LoadMask>
                </div>
            )
        }        

        return(
            <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 mt-2 mb-1">
                    <div className="d-flex flex-row justify-content-center">
                        <center><h3>Mis cursos</h3></center>
                    </div>
                    <div className="d-flex align-content-center flex-wrap" style={{marginLeft: "10px"}}>
                        <MyAssignments
                            data={assignmenteProfHome}
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 mt-2 mb-2">
                    <UpcomingEvents
                        eventStudent={eventStudent}
                    />
                    <PendingHomework
                        data={pendingHomeworkData}
                    />
                </div>
            </div>
        )
    }
}

export default HomeProfessor