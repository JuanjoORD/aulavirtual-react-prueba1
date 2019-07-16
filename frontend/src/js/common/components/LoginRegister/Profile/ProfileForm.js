import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {renderField, renderFilePicker} from '../../Utils/renderField/renderField';

const ProfileForm = (props) => {
    const { handleSubmit, me, setAvatar } = props;
    return (
            <form action="" onSubmit={handleSubmit} className="py-4">
                <h2>PERFIL</h2>
                <div className="mb-4 card card-small">
                    <div className="border-bottom card-header"><h6 className="m-0">{me.first_name} {me.last_name}</h6></div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                            <label htmlFor="avatar">Avatar</label>
                            <Field photo={me.profile && me.profile.avatar ? me.profile.avatar : null} setFile={setAvatar} name="avatar" component={renderFilePicker} />
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="username">Username</label>
                                <Field name="username" label="Username" component={renderField} type="text" className="form-control" />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="first_name">Nombre</label>
                                <Field name="first_name" label="Nombre" component={renderField} type="text" className="form-control" />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="last_name">Apellido</label>
                                <Field name="last_name" label="Nombre" component={renderField} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex">
                        <button className="btn btn-primary mx-auto mb-3">Guardar</button>
                    </div>
                </div>
            </form>
        );
};

export default reduxForm({
    form: 'profile', // a unique identifier for this form
})(ProfileForm);
