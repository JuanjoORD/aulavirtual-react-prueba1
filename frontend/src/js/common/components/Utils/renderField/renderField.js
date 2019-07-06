import React from 'react';
import { AsyncCreatable, Async } from 'react-select';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import Switch from 'react-switch';


export const renderField = ({
                                input, placeholder, type, meta: { touched, error },
                            }) => {
    const invalid = touched && error;
    return (
        <div>
            <input
                {...input}
                placeholder={placeholder}
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
                                   input, placeholder, rows, meta: { touched, error },
                               }) => {
    const invalid = touched && error;
    return (
        <div>
      <textarea
          {...input}
          placeholder={placeholder}
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
                                 input, decimalScale, placeholder, meta: { touched, error }, prefix="", suffix="", numberFormat,
                             }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                placeholder={placeholder}
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={decimalScale || 0}
                format={numberFormat}
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
                                   input, meta: { touched, error }, prefix="Q ", placeholder,
                               }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={2}
                fixedDecimalScale
                placeholder={placeholder}
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
                                 input, meta: { touched, error }, label, disabled,
                             }) => {
    const invalid = touched && error;
    return (
        <div className="d-flex align-items-center">
            <Switch
                onColor="#007bff"
                height={18}
                width={36}
                disabled={disabled}
                onChange={(value) => {
                    input.onChange(value);
                }}
                checked={input.value ? input.value : false}
                // id="normal-switch"
            />
            &nbsp;{label}
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
            <div className="checkbox c-checkbox">
                <label className="needsclick">
                    <input
                        type="checkbox"
                        disabled={disabled}
                        {...input}
                        className={classNames('', { 'is-invalid': invalid })}
                    />
                    <span className="fa fa-check" />
                &nbsp;{label}
                </label>
            </div>
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
            <div className="radio c-radio c-radio-nofont d-flex">
                <label className="negro font-weight-normal">
                    <input
                        type="radio"
                        disabled={disabled}
                        {...input}
                        className={classNames('', { 'is-invalid': invalid })}
                    />
                    <span />
                    &nbsp;{label}
                </label>
            </div>
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
