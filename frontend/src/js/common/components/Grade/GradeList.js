import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class GradeList extends Component{
    componentDidMount = () => {
        const { listGrade } = this.props
        listGrade()
    }

    render(){            
        const {data, loader, deleteGrade} = this.props

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
                <center><h3>Listado de niveles</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/grade/register"
                >
                    Crear grado
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn                        
                        dataField="name"
                        dataSort
                    >
                        Grado
                    </TableHeaderColumn>

                    <TableHeaderColumn                        
                        dataField="description"
                        dataSort
                    >
                        Descripción
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "grade", ver: "grade", eliminar: deleteGrade })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default GradeList