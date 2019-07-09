import 'moment/locale/es';
import "./date_picker.css";
import moment from "moment";
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';


class DayPicker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {open: false};
    }


    render() {
        const { value, onChange, maxDate, minDate, disabled } = this.props;
        return (
            <div style={{borderRadius: "1em"}}>
                <DayPickerInput
                    classNames={{overlay:"date-picker-custom-overlay"}}
                    formatDate={formatDate}
                    inputProps={{className: "form-control"}}
                    parseDate={parseDate}
                    value={new Date(moment(value, "YYYY-MM-DD"))}
                    disabled={disabled}
                    dayPickerProps={{
                        locale: 'es',
                        localeUtils: MomentLocaleUtils,
                        modifiers: {
                            disabled: { after: maxDate ? maxDate : null, before: minDate ? minDate : null }
                        }
                    }}
                    onDayChange={(val) => {
                        const date = moment(val).toDate();

                        onChange(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
                    }} />
            </div>
        )
    }
}

export default DayPicker;
