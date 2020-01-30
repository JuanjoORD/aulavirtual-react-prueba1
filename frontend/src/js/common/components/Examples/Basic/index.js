import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderFieldCheck, renderFieldRadio, renderSwitch } from '../../Utils/renderField/renderField';
import LoadMasks from "./LoadMasks";
import Buttons from "./Buttons";
import Inputs from "./Inputs";
import Selects from "./Selects";
import Date from "./Date";


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
                            <div className="p-0 px-3 pt-3">
                                <div className="row">
                                    <div className="mb-3 col-sm-12 col-md-4">
                                        <strong className="text-muted d-block mb-2">Checkboxes</strong>
                                        <fieldset>
                                            <Field
                                                name="default_checkbox"
                                                label="Default"
                                                component={renderFieldCheck}
                                            />
                                            <Field
                                                disabled
                                                name="disabled_default_checkbox"
                                                label="Disabled"
                                                component={renderFieldCheck}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-sm-12 col-md-4">
                                        <strong className="text-muted d-block mb-2">Radio butons</strong>
                                        <fieldset>
                                            <Field
                                                type="radio"
                                                name="default_radio"
                                                label="Default"
                                                value="default"
                                                component={renderFieldRadio}
                                            />
                                            <Field
                                                type="radio"
                                                name="default_radio"
                                                label="Default 2"
                                                value="default2"
                                                component={renderFieldRadio}
                                            />
                                            <Field
                                                disabled
                                                type="radio"
                                                name="default_radio"
                                                label="Disabled"
                                                value="disabled"
                                                component={renderFieldRadio}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-sm-12 col-md-4">
                                        <strong className="text-muted d-block mb-2">Toggle Switches</strong>
                                        <fieldset>
                                            <Field
                                                name="default_switch"
                                                label="Default"
                                                value="default"
                                                component={renderSwitch}
                                            />
                                            <Field
                                                disabled
                                                name="disabled_switch"
                                                label="Disabled"
                                                value="disabled"
                                                component={renderSwitch}
                                            />
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <Buttons />
                            <Inputs />
                        </div>
                        <LoadMasks />
                    </div>
                    <div className="mb-4 col-lg-4">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Select Form Inputs</h6></div>
                            <Selects />
                        </div>
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Date Type Form Inputs</h6></div>
                            <Date />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'example', // a unique identifier for this form
})(Examples);
