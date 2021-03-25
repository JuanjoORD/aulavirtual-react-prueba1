import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class ProfessorList extends Component{
    componentDidMount = () => {
        const { listProfessor } = this.props
        listProfessor()
    }

    render(){            
        const {data, loader, deleteProfessor} = this.props

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
                <center><h3>Listado de profesores</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/professor/register"
                >
                    Crear Profesor
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
                            return `${row.profession.name}`
                        }}
                    >
                        Titulo
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "professor", ver: "professor", eliminar: deleteProfessor })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default ProfessorList