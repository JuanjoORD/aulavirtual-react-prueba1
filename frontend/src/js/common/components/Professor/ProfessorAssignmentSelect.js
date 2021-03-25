import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';

import {    
    AsyncSelectField,    
} from "../Utils/renderField/renderField";

class ProfessorAssignmentSelect extends Component{
    render(){
        const { handleSubmit, assignmentSelect, saveChanges } = this.props        

        return(
            <React.Fragment>                
                <form className="col-6 mb-2" onSubmit={handleSubmit} >                                  

                    <label>Asignaturas</label>
                    <Field
                        name="assignment"
                        loadOptions={assignmentSelect}
                        component={AsyncSelectField}
                        disabled={false}
                    />                    
                    
                    <br/>                    
                    <div className="d-flex justify-content-around">
                        <button
                            className="btn btn-sm btn-success"
                            type="submit"
                        >
                            Añadir
                        </button>

                        <button
                            className="btn btn-sm btn-info"
                            type="button"
                            onClick={() => saveChanges()}
                        >
                            Guardar cambios
                        </button>
                    </div>                    
                </form>
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'professor_assignment_form', // a unique identifier for this form    
})(ProfessorAssignmentSelect);
