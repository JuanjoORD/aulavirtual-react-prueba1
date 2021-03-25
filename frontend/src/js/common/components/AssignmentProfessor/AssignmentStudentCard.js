import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";

import {    
    renderField,
    SelectField,
    AsyncSelectField,
    renderFilePicker,
    renderNumber    
} from "../Utils/renderField/renderField";

class AssignmentStudentCard extends Component{
    render(){
        const { handleSubmit, studentSelect, saveChanges } = this.props            

        let titleForm = 'Mi asignatura'
        const student = window.location.href.includes('student')        

        return(
            <React.Fragment>                                
                <form onSubmit={handleSubmit} className="col-4" >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`${titleForm}`}</h6></div>                                               

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">                                                                

                                <div className="form-group has-feedback">
                                    <label htmlFor="assignment">Asignatura</label>
                                    <Field name="assignment" placeholder="description" component={renderField} 
                                        type="text" className="form-control" disabled={true} 
                                    />
                                </div>  

                                {student &&
                                    <div className="form-group has-feedback">
                                        <label htmlFor='student' >Estudiante</label>
                                        <Field
                                            name="student"
                                            loadOptions={studentSelect}
                                            component={AsyncSelectField}
                                            disabled={false}
                                        />
                                    </div>
                                }

                            </div>                           
                        </div>

                        <div className="d-flex justify-content-center mb-3">                            
                            <a                                                        
                                href="/#/my_assignment_prof/home"
                                className="btn btn-secondary btn-sm mr-2"                            
                            >
                                Cancelar
                            </a>
                            {student &&
                                <div>
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-success mr-2"
                                >
                                    Agregar estudiante
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => saveChanges()}
                                >
                                    Guardar cambios
                                </button> 
                                </div>
                            }                     
                        </div>
                    </div>
                </form>                                           
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'assign_student_form', // a unique identifier for this form    
})(AssignmentStudentCard);
