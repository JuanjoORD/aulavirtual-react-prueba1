import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';

import {    
    renderField,
    SelectField,
    AsyncSelectField,    
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

class ProfessorForm extends Component{
    render(){
        const { handleSubmit, crear, professionGet } = this.props            

        const editar = window.location.href.includes('editar')
        let disabled = false
        let labelProfessor = 'Crear'

        if(crear == false && editar == false){
            disabled = true
            labelProfessor = 'Ver'            
        }

        if(editar)labelProfessor = 'Editar'

        return(
            <React.Fragment>
                <h3>{`${labelProfessor} profesor`}</h3>
                <form onSubmit={handleSubmit} >                
                    <label>Nombres</label>
                    <Field name="first_name" component={renderField} disabled={disabled} />

                    <label>Apellidos</label>
                    <Field name="last_name" component={renderField} disabled={disabled} />

                    <label>Teléfono</label>
                    <Field name="phone" component={renderField} disabled={disabled}  maxLength="8" />

                    <label>Dirección</label>
                    <Field name="address" component={renderField} disabled={disabled} />                

                    <label>Género</label>
                    <Field
                        name="gender"
                        loadOptions={loadOptions}
                        component={AsyncSelectField}
                        disabled={disabled}
                    />

                    <label>Profesión/Titulo</label>
                    <Field
                        name="profession"
                        loadOptions={professionGet}
                        component={AsyncSelectField}
                        disabled={disabled}
                    />

                    <label>Usuario</label>
                    <Field name="username" component={renderField} disabled={disabled} />

                    <label htmlFor="password">Contraseña</label>
                    <Field
                        name="password"
                        label="Contraseña"
                        component={renderField}
                        type="password"
                        className="form-control"
                        disabled={disabled}
                    />

                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <Field
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        component={renderField}
                        type="password"
                        className="form-control"
                        disabled={disabled}
                    />

                    <br/>
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
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            username: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(ProfessorForm);
