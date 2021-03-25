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

class AssignmentMaterialForm extends Component{
    render(){
        const { handleSubmit, setMyfile, currentFormMaterial, editarMaterial, changeCreateMaterial } = this.props            
        
        const editar = window.location.href.includes('editar')        

        return(
            <React.Fragment>                                
                <form onSubmit={handleSubmit} className="col-4" >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`Material de curso`}</h6></div>                                               

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">                                                                

                                <div className="form-group has-feedback">
                                    <label htmlFor="title">Título</label>
                                    <Field name="title" placeholder="Titulo del material..." component={renderField} 
                                        type="text" className="form-control" disabled={false} 
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="description">Descripción</label>
                                    <Field name="description" placeholder="Descripción..." component={renderField}
                                        type="text" className="form-control" disabled={false} 
                                    />
                                </div>

                                <div className="form-group has-feedback flex-1 mx-3">
                                    <label htmlFor="myfile">Archivo</label>
                                    <Field photo={(currentFormMaterial && currentFormMaterial.myfile) ? currentFormMaterial.myfile :  null} 
                                        setFile={setMyfile} name="myfile" disabled={false} component={renderFilePicker} 
                                    />
                                </div>
                            </div>                           
                        </div>

                        <div className="d-flex justify-content-center mb-3">                            
                            <button                                
                                className="btn btn-secondary btn-sm mr-2"                            
                                type="button"
                                onClick={() => changeCreateMaterial()}
                            >
                                Cancelar crear/editar
                            </button>
                            <button
                                type="submit"
                                className={`btn btn-sm ${editarMaterial ? 'btn-success' : 'btn-primary'}`}
                            >
                                {editarMaterial ? "Actualizar material" : "Crear material"}
                            </button>                                                
                        </div>
                    </div>
                </form>                                           
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'assign_material_form', // a unique identifier for this form 
    validate: (data) => {        
        return validate(data, {
            title: validators.exists()('Este campo es requerido'),       
            myfile: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
        }); 
    } 
})(AssignmentMaterialForm);
