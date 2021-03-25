import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';

const RestorePasswordForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
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
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Reestablecer contraseña</button>
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'restore_password', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(RestorePasswordForm);
