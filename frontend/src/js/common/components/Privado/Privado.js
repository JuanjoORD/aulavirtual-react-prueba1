import React, { Component } from 'react';
import Examples from '../Examples/Examples';
import './privado.css';

class Privado extends Component {
  render() {
    return (
      <div className="container">
        <h1>Sesión activa estás en la página <b>Privada</b></h1>
        <p>Si ves ésta página, todo corre bien. y ha funcionado la autenticación</p>
        <h3> Componentes de formulario</h3>
        <Examples/>
      </div>
    );
  }
}

export default Privado;
