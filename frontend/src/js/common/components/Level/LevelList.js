import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class LevelList extends Component{
    componentDidMount = () => {
        const { listLevel } = this.props
        listLevel()
    }

    render(){            
        const {data, loader, deleteLevel} = this.props

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
                    href="/#/level/register"
                >
                    Crear nivel
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn
                        isKey
                        dataField="name"
                        dataSort
                    >
                        Nivel escolar
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "level", ver: "level", eliminar: deleteLevel })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default LevelList