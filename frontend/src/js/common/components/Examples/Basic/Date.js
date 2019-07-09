import React, {Component} from 'react';
import { Field } from "redux-form";
import {
    renderDayPicker,
    renderDatePicker,
} from "Utils/renderField/renderField";


class Inputs extends Component {
    render() {
        return (
            <div className="border-top p-0 px-3 pt-3">
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Date Inputs</strong>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="day_picker_field">Day Picker</label>
                            <Field
                                name="day_picker_field"
                                component={renderDayPicker}
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="date_picker_field">Date Picker</label>
                            <Field
                                name="date_picker_field"
                                component={renderDatePicker}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inputs;
