import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {validate, validators} from 'validate-redux-form';
import {renderFieldRadio} from '../../Utils/renderField/renderField';


const NotificacionSweeForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form name="notificacioSweetForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-lg-6">
                    <h4>Tipo de notificacion</h4>
                    <div className="row">
                        <div className="col-lg-12">
                            <Field
                                type="radio"
                                name="typeNoti"
                                label="Exito"
                                value="success"
                                component={renderFieldRadio}
                            />
                            <Field
                                type="radio"
                                name="typeNoti"
                                label="Informacion"
                                value="info"
                                component={renderFieldRadio}
                            />
                            <Field
                                type="radio"
                                name="typeNoti"
                                label="Advertencia"
                                value="warning"
                                component={renderFieldRadio}
                            />
                            <Field
                                type="radio"
                                name="typeNoti"
                                label="Error"
                                value="error"
                                component={renderFieldRadio}
                            />
                        </div>
                    </div>
                    <div className="row mb-5 mt-4">
                        <div className="col-lg-12 d-flex justify-content-start">
                            <button
                                className="btn btn-primary">
                                VER SWEET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'notificacioSweetForm',
    initialValues: {
        typeNoti: 'success',
    },
    validate: (data) => {
        return validate(data, {
            typeNoti: validators.exists()('Este campo es requerido'),
        });
    },
})(NotificacionSweeForm);
