import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";

import {    
    renderField,    
} from "../Utils/renderField/renderField";

class LevelAddGrade extends Component{
    state = {
        crear: true
    }    

    render(){
        console.log('props level-grade create:', this.props)

        const { handleSubmit, grades, deleteGrade, createGrades, clearMyForm } = this.props                

        return(
            <div className="row">                
                <form onSubmit={handleSubmit} className="w-50" >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`Grados`}</h6></div>
                        
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">                           
                            <div className="d-flex flex-column flex-1 mx-3">                                                        
                                <div className="form-group has-feedback">
                                    <label htmlFor="name">Grado</label>
                                    <Field name="name" placeholder="Nombre del grado" id="name_level_add_grade" 
                                        component={renderField} className="form-control" disabled={false} 
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="description">Descripción</label>
                                    <Field name="description" placeholder="Descripción" 
                                        component={renderField} className="form-control" disabled={false} 
                                    />
                                </div>
                                
                            </div>
                        </div>                       

                        <div className="d-flex justify-content-around mb-3">
                            <button
                                className={`btn btn-sm btn-success`}
                                type="submit"
                            >
                                {'Agregar'}
                            </button>

                            <button
                                className={`btn btn-sm btn-dark`}
                                type="button"
                                onClick={() => clearMyForm()}
                            >
                                {'Limpiar cajas de texto'}
                            </button>

                            <button
                                className={`btn btn-sm btn-primary`}
                                type="button"
                                onClick={() => createGrades()}
                            >
                                {'Guardar grados'}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="w-50">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>      
                        <th scope="col">Grado</th>
                        <th scope="col">Descripción</th>    
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {grades.length > 0 ?
                            grades.map(grade => {
                                return (
                                    <tr key={grade.id} >
                                        <th scope="row">{grade.name}</th>
                                        <td>{grade.description}</td>
                                        <th>
                                            <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={() => deleteGrade(grade.id)}>
                                                <i className="material-icons">delete</i>
                                            </a>
                                        </th>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <th scope="row">No data</th>
                                <td>No data</td>
                                <td>No data</td>
                            </tr>
                        }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'level_add_grade', // a unique identifier for this form
    validate: (data) => {        
        return validate(data, {
            name: validators.exists()('Este campo es requerido'),                       
        }); 
    },
})(LevelAddGrade);