import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../../Utils/Grid";
import {standardActions} from "../../Utils/Grid/StandardActions";


export default class Grids extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        loader: PropTypes.bool.isRequired,
        onPageChange: PropTypes.func,
        onSortChange: PropTypes.func,
    };

    static defaultProps = {
        loading: false
    };

    componentWillMount() {
        const { listar, page } = this.props;
        listar(page);
    }

    render() {
        const { data, loader, listar: onPageChange, onSortChange } = this.props;

        return (
            <div className="py-4">
                <h2>GRIDS</h2>
                <div className="row">
                    <div className="mb-4 col-lg-6">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Estándar</h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid data={data} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="username"
                                        dataSort
                                    >
                                        Usuario
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="first_name"
                                        dataSort
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="last_name"
                                        dataSort
                                    >
                                        Apellidos
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-lg-6">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Hover</h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid hover data={data} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="username"
                                        dataSort
                                    >
                                        Usuario
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="first_name"
                                        dataSort
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="last_name"
                                        dataSort
                                    >
                                        Apellidos
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-lg-6">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Stripped</h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid striped data={data} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="username"
                                        dataSort
                                    >
                                        Usuario
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="first_name"
                                        dataSort
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="last_name"
                                        dataSort
                                    >
                                        Apellidos
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-lg-6">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">Stripped Hover</h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid hover striped data={data} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="username"
                                        dataSort
                                    >
                                        Usuario
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="first_name"
                                        dataSort
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="last_name"
                                        dataSort
                                    >
                                        Apellidos
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">With Actions</h6></div>
                            <div className="p-0 px-3 pt-3">
                                <Grid hover striped data={data} loading={loader} onPageChange={onPageChange} onSortChange={onSortChange} >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="username"
                                        dataSort
                                    >
                                        Usuario
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="first_name"
                                        dataSort
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="last_name"
                                        dataSort
                                    >
                                        Apellidos
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="id"
                                        dataAlign="center"
                                        dataSort
                                        dataFormat={standardActions({ editar: "grids", ver: "grids", eliminar: () => {} })}
                                    >
                                        Acciones
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
