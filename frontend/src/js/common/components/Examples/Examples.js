import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderFieldCheck } from '../Utils/renderField/renderField';

class Examples extends Component {
    render() {
        return (
            <form action="">

                <div className="row">
                    <div className="mb-4 col-lg-8">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Form Inputs</h6></div>
                            <div className="row">
                                <div className="mb-3 col-sm-12 col-md-4">
                                    <strong className="text-muted d-block mb-2">Checkboxes</strong>
                                    <div className="listado d-flex flex-column">
                                        <Field
                                            name="pago_completo"
                                            component={renderFieldCheck}
                                            type="checkbox"
                                            disabled
                                            className="form-control"
                                            placeholder="Correo"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 col-sm-12 col-md-4">
                                    <strong className="text-muted d-block mb-2">Radio butons</strong>

                                </div>
                                <div className="mb-3 col-sm-12 col-md-4">
                                    <strong className="text-muted d-block mb-2">Checkboxes</strong>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-lg-4">
                        df
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'example', // a unique identifier for this form
})(Examples);
