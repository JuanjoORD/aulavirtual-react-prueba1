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

const genderOptions = [
    {'label': "Masculino", 'value': '0'},
    {'label': "Femenino", 'value': '1'},    
];

const filterOptions = (inputValue) => {
    return genderOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterOptions(inputValue));
    }, 1000);
};

let editar = false

class ProfessorForm extends Component{

    render(){
        const { handleSubmit, crear, professionGet, oneData, setAvatar } = this.props            

        editar = window.location.href.includes('editar')
        let disabled = false
        let labelProfessor = 'CREAR'

        if(crear == false && editar == false){
            disabled = true
            labelProfessor = 'VER'            
        }

        if(editar){
            labelProfessor = 'EDITAR'
        }

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
                <form onSubmit={handleSubmit} >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`${labelProfessor} PROFESOR`}</h6></div>
                        
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label htmlFor="avatar">Avatar</label>
                                <Field photo={(oneData && oneData.avatar) ? oneData.avatar : null} 
                                    setFile={setAvatar} name="avatar" disabled={disabled} component={renderFilePicker} />
                            </div>
                            <div className="d-flex flex-column flex-1 mx-3">                                                        
                                <div className="form-group has-feedback">
                                    <label htmlFor="first_name">Nombre</label>
                                    <Field name="first_name" placeholder="Nombre" component={renderField} type="text" className="form-control" disabled={disabled} />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="last_name">Apellido</label>
                                    <Field name="last_name" placeholder="Nombre" component={renderField} type="text" className="form-control" disabled={disabled} />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor='gender' >Género</label>
                                    <Field
                                        name="gender"
                                        loadOptions={loadOptions}
                                        component={AsyncSelectField}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <div className="form-group has-feedback">
                                    <label htmlFor="phone">Teléfono</label>
                                    <Field
                                        numberFormat={"+(502) ####-####"}
                                        name="phone"
                                        placeholder="Teléfono"
                                        component={renderNumber}
                                        className="form-control"
                                        disabled={disabled}
                                    />
                                </div>
                                
                                <div className="form-group has-feedback">
                                    <label htmlFor="address">Dirección</label>
                                    <Field name="address" placeholder="Dirección" component={renderField} type="text" className="form-control" disabled={disabled} />
                                </div>

                                <div className="form-group has-feedback">
                                    <label>Profesión/Titulo</label>
                                    <Field
                                        name="profession"
                                        loadOptions={professionGet}
                                        component={AsyncSelectField}
                                        disabled={disabled}
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <Field name="email" placeholder="ejemplo@gmail.com" component={renderField} 
                                        type="email" className="form-control" disabled={disabled} 
                                    />
                                </div>
                            </div>
                            <div className="form-group has-feedback flex-1 mx-3">
                                <div className="form-group has-feedback">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" placeholder="Username" component={renderField} type="text" className="form-control" disabled={disabled} />
                                </div>                                                                                        

                                <div className="form-group has-feedback">
                                    <label htmlFor="password">Contraseña</label>
                                    <Field
                                        name="password"
                                        label="Contraseña"
                                        component={renderField}
                                        type="password"
                                        className="form-control"
                                        disabled={disabled}
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
                                        disabled={disabled}
                                    />
                                </div>                    

                            </div>
                        </div>

                        <div className="d-flex justify-content-center mb-3">                        
                            <a                                                        
                                href="/#/professor"
                                className="btn btn-secondary btn-sm mr-2"                            
                            >
                                Cancelar
                            </a>
                            {disabled == false &&
                                <button
                                    className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                                    type="submit"
                                >
                                    {editar ? 'Actualizar' : 'Registrar'}
                                </button>                                
                            }                        
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'professor_form', // a unique identifier for this form
    validate: (data) => {        
        if(editar){
            return validate(data, {
                confirmPassword: combine(
                    matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
                ),
                username: validators.exists()('Este campo es requerido'),
                first_name: validators.exists()('Este campo es requerido'),
                last_name: validators.exists()('Este campo es requerido'),
                phone: validators.exists()('Este campo es requerido'),
                profession: validators.exists()('Este campo es requerido'),
                gender: validators.exists()('Este campo es requerido'),
                address: validators.exists()('Este campo es requerido'),
                email: validators.exists()('Este campo es requerido'),                
            });
        }
        else{
            return validate(data, {
                confirmPassword: combine(
                    validators.exists()('Este campo es requerido'),
                    matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
                ),
                username: validators.exists()('Este campo es requerido'),
                first_name: validators.exists()('Este campo es requerido'),
                last_name: validators.exists()('Este campo es requerido'),
                phone: validators.exists()('Este campo es requerido'),
                profession: validators.exists()('Este campo es requerido'),
                gender: validators.exists()('Este campo es requerido'),
                address: validators.exists()('Este campo es requerido'),
                email: validators.exists()('Este campo es requerido'),
                password: validators.exists()('Este campo es requerido'),
            });
        }
    },
})(ProfessorForm);
