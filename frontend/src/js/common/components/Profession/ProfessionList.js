import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class ProfessionList extends Component{
    componentDidMount = () => {
        const { listProfession } = this.props
        listProfession()
    }

    render(){            
        const {data, loader, deleteProfession} = this.props

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
                <center><h3>Listado de profesiones</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/profession/register"
                >
                    Crear profesión
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn
                        isKey
                        dataField="name"
                        dataSort
                    >
                        Profesión
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "profession", ver: "profession", eliminar: deleteProfession })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default ProfessionList