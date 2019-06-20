import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Estás en la página <b>Home</b></h1>
        <p>Si ves ésta página, todo corre bien.</p>
        <ul>
          <li>Estás listo para empezar tu aplicación con react-redux</li>
          <li>Ahora ve y empieza tu proyecto</li>
        </ul>
        <p>Finalmente, un demo a <a href="/#/login">Login</a> Pruébalo.</p>
      </div>
    );
  }
}

export default Home;