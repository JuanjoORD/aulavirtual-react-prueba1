import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";

import UpcomingEvents from "./UpcomingEvents"
import UpcomingHomework from "./UpcomingHomework"
import MyAssignments from "./MyAssignments"


class HomeStudent extends Component{
    state = {
        idAssignment: null
    }

    componentDidMount = () => {
        const { assignmentsStudentHome, listEventStudent, upcomingHomework, match } = this.props        
        assignmentsStudentHome()
        listEventStudent()
        upcomingHomework()        
    }    
       
 
    render(){
        console.log('props HomeStudent:', this.props)        

        const { assignmentHome, eventStudent, upcomingHomeworkData } = this.props              
    
        
        if(assignmentHome === null || eventStudent === null || upcomingHomeworkData === null){
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
                    <div className="card-deck">
                        <MyAssignments
                            data={assignmentHome}
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 mt-2 mb-2">
                    <UpcomingEvents
                        eventStudent={eventStudent}
                    />
                    <UpcomingHomework                        
                        upcomingHomeworkData={upcomingHomeworkData}
                    />
                </div>
            </div>
        )
    }
}

export default HomeStudent