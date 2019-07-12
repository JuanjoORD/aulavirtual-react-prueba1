import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {validate, validators} from 'validate-redux-form';
import {renderField, renderFieldRadio, renderTextArea} from '../../Utils/renderField/renderField';


const NotificacionForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form name="notificacioForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
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
                </div>
                <div className="col-lg-6">
                    <h4>Escribe el mensaje</h4>
                    <div className="row">
                        <div className="col-lg-12">
                            <label htmlFor="">Titulo </label>
                            <Field
                                name="titulo"
                                label="Titulo"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <label htmlFor="">Mensaje</label>
                            <Field
                                name="mensaje"
                                label="Titulo"
                                component={renderTextArea}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row mb-5 mt-4">
                        <div className="col-lg-12 d-flex justify-content-end">
                            <button
                                className="btn btn-primary">
                                ENVIAR NOTIFICACION
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'notificacioForm',
    initialValues: {
        typeNoti: 'error',
    },
    validate: (data) => {
        return validate(data, {
            typeNoti: validators.exists()('Este campo es requerido'),
            titulo: validators.exists()('Este campo es requerido'),
            mensaje: validators.exists()('Este campo es requerido'),
        });
    },
})(NotificacionForm);
