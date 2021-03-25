import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";

import {    
    renderField,    
    renderFilePicker
} from "../Utils/renderField/renderField";

class TableAssignment extends Component{
    state = {
        crear: true
    }    

    render(){
        console.log('props TableAssignments:', this.props)

        const { data, toDelete } = this.props                

        return(
            <div className="col-8">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>      
                            <th scope="col">Portada</th>
                            <th scope="col">Sección</th>    
                            <th scope="col">Grado</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>                        
                            {data.length > 0 ?
                                data.map(assignment => {
                                    return (
                                        <tr key={assignment.id} >
                                            <th>
                                                <img src={assignment.cover}                                                     
                                                    
                                                />
                                            </th>
                                            <td>{assignment.section.label}</td>
                                            <td>{assignment.grade.label}</td>
                                            <td>{assignment.course.label}</td>
                                            <td>{assignment.description}</td>
                                            <th>
                                                <a className="px-2" 
                                                    style={{cursor: "pointer", color: "#c4183c"}} 
                                                    onClick={() => toDelete(assignment.id)}
                                                >
                                                    <i className="material-icons">delete</i>
                                                </a>
                                            </th>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <th>No data</th>
                                    <td>No data</td>
                                    <td>No data</td>
                                    <td>No data</td>
                                    <td>No data</td>
                                    <td>No data</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default TableAssignment