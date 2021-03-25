import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';

const VerifyEmailUserForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>

            <div className="form-group has-feedback">
                <label htmlFor="email">Correo electrónico</label>
                <Field name="email" label="Usuario" component={renderField} type="email" className="form-control" />
            </div>
            
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Recuperar contraseña</button>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'verify_email', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {            
            email: validators.exists()('Este campo es requerido'),
        });
    },
})(VerifyEmailUserForm);
