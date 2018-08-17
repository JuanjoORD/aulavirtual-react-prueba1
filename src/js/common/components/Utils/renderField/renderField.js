import React from 'react';
import { AsyncCreatable, Async } from 'react-select';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import Switch from "react-switch";


export const renderField = ({ input, label, type, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <input {...input} placeholder={label} type={type}
                className={classNames('form-control', { 'is-invalid': invalid })} />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const renderTextArea = ({ input, label, rows, type, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <textarea {...input} placeholder={label} style={{ resize: "none" }} rows={rows ? rows : 3}
                className={classNames('form-control', { 'is-invalid': invalid })} />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};
export const renderSearchSelect = ({ input, disabled, loadOptions, valueKey, labelKey, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <Async disabled={disabled} value={input.value} className={classNames('form-control', { 'is-invalid': invalid })}
                onChange={(e) => { input.onChange(e[valueKey]); }}
                searchPromptText="Escriba para buscar" valueKey={valueKey} labelKey={labelKey}
                loadOptions={loadOptions} />
            {invalid && <div className="invalid-feedback">
                {error}
                {input.value}
            </div>}
        </div>
    )
};

export const renderSearchCreateSelect = ({ input, disabled, loadOptions, valueKey, labelKey, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <AsyncCreatable disabled={disabled} value={input.value} className={classNames('form-control', { 'is-invalid': invalid })}
                onChange={(e) => { input.onChange(e[valueKey]); }}
                searchPromptText="Escriba para buscar" valueKey={valueKey} labelKey={labelKey}
                loadOptions={loadOptions} promptTextCreator={(label) => { return `Crear opción ${label}` }} />
            {invalid && <div className="invalid-feedback">
                {error}
                {input.value}
            </div>}
        </div>
    )
};

export const renderSelectField = ({ input, disabled, options, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <select {...input} disabled={disabled} className={classNames('form-control', { 'is-invalid': invalid })}>
                {options.map((opcion) => {
                    return (<option
                        key={typeof (opcion) === "string" ? opcion : opcion.id}
                        value={typeof (opcion) === "string" ? opcion : opcion.value}>
                        {typeof (opcion) === "string" ? opcion : opcion.label}
                    </option>);
                })}
            </select>
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const renderNumber = ({ input, label, type, decimalScale, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={decimalScale ? decimalScale : 0} fixedDecimalScale={true}
                value={input.value} thousandSeparator={true} prefix={''}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const renderCurrency = ({ input, label, type, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={2} fixedDecimalScale={true}
                value={input.value} thousandSeparator={true} prefix={'Q '}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const renderSwitch = ({ input, label, type, meta: { touched, error } }) => {
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
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const RenderField = {
    renderField,
    renderTextArea,
    renderSearchSelect,
    renderSearchCreateSelect,
    renderSelectField,
    renderNumber,
    renderCurrency,
    renderSwitch
};
