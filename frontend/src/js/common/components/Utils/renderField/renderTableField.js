import React from 'react';
import { icons } from 'icons';
import { RenderDateTime as DateTime, RenderCurrency } from './renderReadField';

export const RenderImage = ({ src, alt }) => {
  if (src !== null) {
    return (
      <img style={{ maxWidth: '50px', borderRadius: '50%' }} src={src} alt={alt} />
    );
  }
  return (
    <img style={{ maxWidth: '50px', borderRadius: '50%' }} src={icons.img_placeholder} alt={alt} />
  );
};

export const RenderDateTime = ({ fecha, className }) => {
  if (fecha) {
    return (
      <DateTime value={fecha} className={className} />
    );
  }
  return <span className={className}>Sin registro</span>;
};

export const RenderMoneda = ({ monto, className }) => {
  if (monto || monto === 0) {
    return (
      <RenderCurrency value={monto} className={className} />
    );
  }
  return <span className={className}>Sin registro</span>;
};
