import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderFieldCheck } from '../Utils/renderField/renderField';

class Examples extends Component {
    render() {
        return (
            <form action="">
                <div className="page-header py-4 no-gutters row">
                    <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-4">
                        Titulo
                    </div>
                </div>

                <div className="row">
                    <div className="mb-4 col-lg-8">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Form Inputs</h6></div>
                            <div className="row">
                                <div className="mb-3 col-sm-12 col-md-4">
                                    <strong className="text-muted d-block mb-2">Checkboxes</strong>
                                    <div className="listado d-flex flex-column">
                                        <label htmlFor="pago_completo">Pagado completamente</label>
                                        <Field
                                            name="pago_completo"
                                            component={renderFieldCheck}
                                            type="checkbox"
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
