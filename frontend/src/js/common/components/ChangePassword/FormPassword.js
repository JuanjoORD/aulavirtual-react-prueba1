import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";

import {    
    renderField,
} from "../Utils/renderField/renderField";

class FormPassword extends Component{
    render(){
        const { handleSubmit } = this.props        

        if(1===0){
            return(
                <div className="col-12">
                    <LoadMask light loading={true} type={"Grid"}>
                        <div style={{ height: "200px", width:"100%"}}>Grid</div>
                    </LoadMask>
                </div>
            )
        }

        return(
            <div className="d-flex justify-content-center mt-2">                
                <form onSubmit={handleSubmit} className="w-50" >
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`Cambio de contraseña`}</h6></div>

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">

                                <div className="form-group has-feedback">
                                    <label htmlFor="password">Contraseña</label>
                                    <Field
                                        name="password"
                                        label="Contraseña"
                                        component={renderField}
                                        type="password"
                                        className="form-control"                                        
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <Field
                                        name="confirmPassword"
                                        label="Confirmar Contraseña"
                                        component={renderField}
                                        type="password"
                                        className="form-control"                                        
                                    />
                                </div>                    

                            </div>
                        </div>

                        <div className="d-flex justify-content-center mb-3">                        
                            <a                                                        
                                href="/#/"
                                className="btn btn-secondary btn-sm mr-2"                            
                            >
                                Cancelar
                            </a>
                            <button
                                    className={`btn btn-sm btn-primary`}
                                    type="submit"
                                >
                                    Actualizar
                            </button>                     
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'form_password', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {            
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            password: validators.exists()('Este campo es requerido'),            
        });
    },
})(FormPassword);
