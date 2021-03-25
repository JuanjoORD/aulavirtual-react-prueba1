import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom"

import DefaultPortrait from "../../../../assets/img/DefaultPortrait.svg"


class MyAssignments extends Component{
    state = {
        id: null,        
    }

    componentDidMount = () => {        
        //console.log("props CLASES DEL ESTUDIANTE:", this.props)
    }    
       
 
    render(){
        console.log('props MyAssignments Home Student:', this.props)
        const { data } = this.props        

        return(
            <React.Fragment>                
                {
                    data.map(assignment => {
                        return(
                            <div className="card col-lg-6 col-md-12 col-sm-12" key={assignment.id}>
                                <img className="card-img-top" src={(assignment && assignment.cover) ? assignment.cover : DefaultPortrait} alt="Portada del curso"/>
                                <div className="card-body">
                                    <h5 className="card-title">{`${assignment.course.name}, ${assignment.grade.name}, ${assignment.section.name}`}</h5>
                                    <p className="card-text">{assignment.description}</p>
                                    <Link className="text-warning mr-3" to={`${assignment.id}/material`} >
                                        <i className="material-icons">square_foot</i>
                                    </Link>
                                    <a className="px-2" style={{cursor: "pointer", color: "#145af1"}} href={`/#/assignment_student/${assignment.id}/homework`}>
                                        <i className="material-icons">home_work</i>
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default MyAssignments