import React from 'react';
import { AsyncCreatable, Async } from 'react-select';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import Switch from 'react-switch';


export const renderField = ({
                                input, label, type, meta: { touched, error },
                            }) => {
    const invalid = touched && error;
    return (
        <div>
            <input
                {...input}
                placeholder={label}
                type={type}
                className={classNames('form-control', { 'is-invalid': invalid })}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderTextArea = ({
                                   input, label, rows, meta: { touched, error },
                               }) => {
    const invalid = touched && error;
    return (
        <div>
      <textarea
          {...input}
          placeholder={label}
          style={{ resize: 'none' }}
          rows={rows || 3}
          className={classNames('form-control', { 'is-invalid': invalid })}
      />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderNumber = ({
                                 input, decimalScale, meta: { touched, error }, prefix="", suffix=""
                             }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={decimalScale || 0}
                fixedDecimalScale
                value={input.value}
                thousandSeparator
                prefix={prefix}
                suffix={suffix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderCurrency = ({
                                   input, meta: { touched, error }, prefix="Q "
                               }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={2}
                fixedDecimalScale
                value={input.value}
                thousandSeparator
                prefix={prefix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderSwitch = ({
                                 input, meta: { touched, error },
                             }) => {
    const invalid = touched && error;
    return (
        <div>
            <Switch
                onChange={(value) => {
                    input.onChange(value);
                }}
                checked={input.value ? input.value : false}
                id="normal-switch"
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderFieldCheck = ({ input, label, value, disabled, type, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <React.Fragment>
            <label className="custom-control custom-checkbox" >
                <input
                    type="checkbox"
                    className={classNames('custom-control-input', { 'is-invalid': invalid })}
                    {...input}
                    disabled={disabled}
                />
                <label
                    className="custom-control-label"
                    aria-hidden="true"
                    onClick={() => {
                        // if (!disabled)
                            input.onChange(!input.value)}
                    }
                />
                <span className="custom-control-description">{label}</span>
            </label>
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};

export const renderFieldRadio = ({ input, label, value, disabled, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <React.Fragment>
            <label className="custom-control custom-radio">
                <input
                    disabled={disabled}
                    type="radio"
                    {...input}
                    value={value}
                    className={classNames('custom-control-input', { 'is-invalid': invalid })}
                />
                <label
                    className="custom-control-label"
                    aria-hidden="true"
                    onClick={() => {
                        if (!disabled)
                            input.onChange(!input.value)}
                    }
                />
                <span className="custom-control-description">{label}</span>
            </label>
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};

export const RenderField = {
    renderField,
    renderTextArea,
    renderNumber,
    renderCurrency,
    renderSwitch,
    renderFieldCheck,
    renderFieldRadio,
};
