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
import { element } from 'prop-types';

class AssignmentStudentTable extends Component{
    state = {
        crear: true
    }    

    render(){
        console.log('props AssignmentStudentTable:', this.props)

        const { data, toDelete } = this.props                

        return(
            <div className="col-8">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>      
                                <th scope="col">Nombre</th>
                                <th scope="col">Carné</th>                            
                                <th scope="col">Acción</th>    
                            </tr>
                        </thead>
                        <tbody>                        
                            {data.length > 0 ?
                                data.map(element => {
                                    return (
                                        <tr key={element.id} >                                            
                                            <td>{element.student.label}</td>
                                            <td>{""}</td>
                                            <th>
                                                <a className="px-2" 
                                                    style={{cursor: "pointer", color: "#c4183c"}} 
                                                    onClick={() => toDelete(element.id)}
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
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default AssignmentStudentTable