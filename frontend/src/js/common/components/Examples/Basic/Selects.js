import React, {Component} from 'react';
import { Field } from "redux-form";
import {
    SelectField,
    AsyncSelectField,
    CreatableSelectField,
} from "Utils/renderField/renderField";


const exampleOptions = [
    {"label": "Primary", "value": "Primary"},
    {"label": "Secondary", "value": "Secondary"},
    {"label": "Success", "value": "Success"},
    {"label": "Danger", "value": "Danger"},
    {"label": "Warning", "value": "Warning"},
];

const filterOptions = (inputValue) => {
    return exampleOptions.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        callback(filterOptions(inputValue));
    }, 1000);
};


class Inputs extends Component {
    render() {
        return (
            <div className="border-top p-0 px-3 pt-3">
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Select Inputs</strong>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="select_field">Select</label>
                            <Field
                                name="select_field"
                                options={exampleOptions}
                                component={SelectField}
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="multi_select_field">Multi Select</label>
                            <Field
                                name="multi_select_field"
                                isMulti
                                options={exampleOptions}
                                component={SelectField}
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="async_select_field">Async</label>
                            <Field
                                name="async_select_field"
                                loadOptions={loadOptions}
                                component={AsyncSelectField}
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="creatable_select_field">Creatable Select</label>
                            <Field
                                name="creatable_select_field"
                                options={exampleOptions}
                                component={CreatableSelectField}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inputs;
