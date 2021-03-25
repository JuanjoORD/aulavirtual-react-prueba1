import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class AssignmentList extends Component{
    componentDidMount = () => {
        const { listAssignment } = this.props
        listAssignment()
    }

    render(){            
        const {data, loader, deleteAssignment} = this.props

        if(data == null){
            return(
                <div className="col-12">
                    <LoadMask light loading={true} type={"Grid"}>
                        <div style={{ height: "200px", width:"100%"}}>Grid</div>
                    </LoadMask>
                </div>
            )
        }

        return(
            <React.Fragment>
                <center><h3>Listado de asignaturas</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/assignment/register"
                >
                    Crear asignatura
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn                                                
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.section.name}`
                        }}
                    >
                        Sección
                    </TableHeaderColumn>

                    <TableHeaderColumn                                                
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.grade.name}`
                        }}
                    >
                        Grado
                    </TableHeaderColumn>

                    <TableHeaderColumn                                                
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.course.name}`
                        }}
                    >
                        Curso
                    </TableHeaderColumn>

                    <TableHeaderColumn                                                
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.schoolcycle.year}`
                        }}
                    >
                        Ciclo
                    </TableHeaderColumn>

                    <TableHeaderColumn                                                
                        dataSort
                        dataField="description"
                    >
                        Descripción
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "assignment", ver: "assignment", eliminar: deleteAssignment })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default AssignmentList