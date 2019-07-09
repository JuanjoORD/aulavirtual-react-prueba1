import React, {Component} from 'react';
import { Field } from "redux-form";
import {
    renderCurrency,
    renderNumber,
    renderField,
    renderFilePicker,
    renderTextArea,
} from "Utils/renderField/renderField";


class Inputs extends Component {
    render() {
        return (
            <div className="border-top p-0 px-3 pt-3">
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Inputs</strong>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="normal_field">Normal Field</label>
                            <Field
                                name="normal_field"
                                placeholder="Normal Field"
                                component={renderField}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="normal_field">Password Field</label>
                            <Field
                                name="password_field"
                                type="password"
                                placeholder="Password Field"
                                component={renderField}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Number Field</label>
                            <Field
                                name="number_field"
                                placeholder="Number Field"
                                component={renderNumber}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Number Field decimal scale</label>
                            <Field
                                decimalScale={2}
                                name="number_field_fixed_decimals"
                                placeholder="Number Field Decimal Scale"
                                component={renderNumber}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Number Field with suffix</label>
                            <Field
                                name="number_field_suffix"
                                decimalScale={2}
                                suffix="%"
                                placeholder="Number Field With Suffix"
                                component={renderNumber}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Number Field with prefix</label>
                            <Field
                                name="number_field_prefix"
                                decimalScale={2}
                                prefix="E "
                                placeholder="Number Field With Prefix"
                                component={renderNumber}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Currency Field</label>
                            <Field
                                name="currency_field"
                                placeholder="Currency Field"
                                component={renderCurrency}
                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="number_field">Number Field specific format</label>
                            <Field
                                name="number_field_prefix_format"
                                decimalScale={2}
                                numberFormat="#### #### #### ####"
                                prefix="Q "
                                placeholder="#### #### #### ####"
                                component={renderNumber}
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="file_field">File Field</label>
                            <Field
                                name="file_field"
                                component={renderFilePicker}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inputs;
