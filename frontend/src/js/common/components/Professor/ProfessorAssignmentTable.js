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

class ProfessorAssignmetTable extends Component{
    state = {
        crear: true
    }    

    render(){
        console.log('props level-grade create:', this.props)

        const { data, toDelete } = this.props                

        return(
            <div className="col-6 mb-2">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>      
                            <th scope="col">Asignatura</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {data.length > 0 ?
                            data.map(assignment => {
                                return (
                                    <tr key={assignment.id}>                                            
                                        <td>{assignment.label}</td>
                                        <th>
                                            <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={() => toDelete(assignment.id)}>
                                                <i className="material-icons">delete</i>
                                            </a>
                                        </th>                                        
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <th>No data</th>
                                <th>No data</th>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProfessorAssignmetTable