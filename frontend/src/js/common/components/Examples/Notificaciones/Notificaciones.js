import React, { Component } from 'react';
import NotificacionForm from './NotificacionForm';


class Notificaciones extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="py-4">
                <h2>Notificaciones</h2>
                <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h3 className="m-0">Notificaciones de tostadora</h3>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <NotificacionForm
                                    onSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notificaciones;
