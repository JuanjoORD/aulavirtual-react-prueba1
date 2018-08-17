import React from 'react';
import NumberFormat from 'react-number-format';

export const RenderNumber = ({value, decimalScale, className}) => {
    return (
        <NumberFormat className={className}
                      decimalScale={decimalScale ? decimalScale : 0} fixedDecimalScale={true}
                      value={value} thousandSeparator={true} prefix={''} displayType={"text"}
        />
    )
};

export const RenderCurrency = ({value, className}) => {
    return (
        <NumberFormat className={className}
                      decimalScale={2} fixedDecimalScale={true}
                      value={value} thousandSeparator={true} prefix={'Q '} displayType={"text"}
        />
    )
};

export const RenderDateTime = ({value, className}) => {
    if (value) {
        const fecha = new Date(value);
        return (
            <span className={className}>{fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}</span>
        );
    }
    return (<span className={className}>{value}</span>);
};

export const ReadFields = {
    renderCurrency : RenderCurrency,
    renderNumber: RenderNumber,
};
