import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { myQualifications } from '../../../redux/modules/assignment_student/assignment_for_student';


class MyQualifications extends Component{
    componentDidMount = () => {
        const { myQualifications } = this.props        
        myQualifications()
        //console.log('props MyQualifications Front:', this.props)
    }    

    render(){        
        const { myQualificationsData } = this.props

        console.log("CALIFICACIONES:", myQualificationsData)

        if(myQualificationsData == null){
            return(
                <div className="col-12">
                    <LoadMask light loading={true} type={"Grid"}>
                        <div style={{ height: "200px", width:"100%"}}>Grid</div>
                    </LoadMask>
                </div>
            )
        }

        const notes = myQualificationsData.allAssign
        
        

        return(            
            <React.Fragment>
                    <center><h3>CALIFICACIONES</h3></center>
                    <div className="d-flex flex-row justify-content-start mb-2 mt-2">
                        <a
                            type="button"
                            className="btn btn-sm btn-secondary"
                            href="/#/assignment_student/home"
                        >
                            Regresar MyQualifications
                        </a>
                    </div>                    
                    
                    {
                        notes.map(assignment => {
                            const answer = assignment.answers
                            return(
                                <div key={assignment.assignment.id} className="mb-4">
                                    <center><h3>{assignment.assignment.name}</h3></center>
                                    <center><h4>Total: {assignment.total}</h4></center>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>      
                                                <th scope="col">Título</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Tarea entregada</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Calificación</th>
                                            </tr>
                                        </thead>
                                        <tbody>                        
                                            {answer && answer.length > 0 ?
                                                answer.map(element => {
                                                    return (
                                                        <tr key={element.homework.id} >                                            
                                                            <td>{element.homework.title}</td>
                                                            <td>{element.homework.description}</td>
                                                            <td>{element.submitted ? "Si" : "No"}</td>
                                                            <td>{element.homework.myvalue}</td>
                                                            <td>{element.points ? element.points : "Sin calificar"}</td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <th>No data</th>
                                                    <td>No data</td>                                    
                                                    <td>No data</td>
                                                    <td>No data</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })
                    }
                </React.Fragment>
        )
    }
}

export default MyQualifications