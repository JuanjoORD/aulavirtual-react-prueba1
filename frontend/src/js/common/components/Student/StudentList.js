import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class StudentList extends Component{
    componentDidMount = () => {
        const { listStudent } = this.props
        listStudent()
    }

    render(){            
        const {data, loader, deleteStudent} = this.props

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
                <center><h3>Listado de estudiantes</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/student/register"
                >
                    Crear Estudiante
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn                                              
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.profile.user.first_name} ${row.profile.user.last_name}`
                        }}
                    >
                        Nombre
                    </TableHeaderColumn>

                    <TableHeaderColumn                                              
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.profile.phone}`
                        }}
                    >
                        Teléfono
                    </TableHeaderColumn>

                    <TableHeaderColumn                                              
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.contact_name}`
                        }}
                    >
                        Encargado/a
                    </TableHeaderColumn>              

                    <TableHeaderColumn                                              
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.contact_phone}`
                        }}
                    >
                        Télefono encargado/a
                    </TableHeaderColumn>              
                   
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "student", ver: "student", eliminar: deleteStudent })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default StudentList