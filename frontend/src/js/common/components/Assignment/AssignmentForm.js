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

class AssignmentForm extends Component{
    render(){
        const { handleSubmit, crear, oneData, setAvatar, courseSelect, sectionSelect, gradeSelect, saveChanges } = this.props            

        const editar = window.location.href.includes('editar')
        let disabled = false
        let disabledImg = false
        let titleForm = 'Crear'

        if(crear == false && editar == false){
            disabled = true
            titleForm = 'Ver'            
        }

        if(crear || !editar)disabledImg=true

        if(editar)titleForm = 'Editar'

        if(oneData == undefined && !crear){
            return(
                <div className="col-12">
                    <LoadMask light loading={true} type={"Grid"}>
                        <div style={{ height: "200px", width:"100%"}}>Grid</div>
                    </LoadMask>
                </div>
            )
        }

        return(
            <React.Fragment>                                
                <form onSubmit={handleSubmit} className="col-4" >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`${titleForm} asignatura`}</h6></div>
                        
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label htmlFor="cover">Portada</label>
                                <Field photo={(oneData && oneData.cover) ? oneData.cover : null} 
                                    setFile={setAvatar} name="cover" disabled={disabledImg} component={renderFilePicker} />
                            </div>                           
                        </div>

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <div className="form-group has-feedback">
                                    <label htmlFor='section' >Sección</label>
                                    <Field
                                        name="section"
                                        loadOptions={sectionSelect}
                                        component={AsyncSelectField}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor='grade' >Grado</label>
                                    <Field
                                        name="grade"
                                        loadOptions={gradeSelect}
                                        component={AsyncSelectField}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor='course' >Curso</label>
                                    <Field
                                        name="course"
                                        loadOptions={courseSelect}
                                        component={AsyncSelectField}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="description">Descripción</label>
                                    <Field name="description" placeholder="description" component={renderField} 
                                        type="text" className="form-control" disabled={disabled} 
                                    />
                                </div>  
                            </div>                           
                        </div>

                        <div className="d-flex justify-content-center mb-3">                        
                            {crear &&
                                <button                                                                                        
                                    className="btn btn-info btn-sm mr-4"
                                    type="button"
                                    onClick={() => saveChanges()} 
                                >
                                    Crear asignaturas
                                </button>
                            }
                            <a                                                        
                                href="/#/assignment"
                                className="btn btn-secondary btn-sm mr-2"                            
                            >
                                Cancelar
                            </a>                            
                            {disabled == false &&
                                <button
                                    className={`btn btn-sm btn-success`}
                                    type="submit"                                    
                                >
                                    {editar ? 'Actualizar' : 'Agregar a la lista'}
                                </button>
                            }                        
                        </div>
                    </div>
                </form>                                           
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'assignment_form', // a unique identifier for this form
    /*validate: (data) => {        
        return validate(data, {                        
            section: validators.exists()('Este campo es requerido'),
            grade: validators.exists()('Este campo es requerido'),
            course: validators.exists()('Este campo es requerido'),            
        });
    },*/
})(AssignmentForm);
