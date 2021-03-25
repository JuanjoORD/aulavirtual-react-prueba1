import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class CycleList extends Component{
    componentDidMount = () => {
        const { listCycle } = this.props
        listCycle()
    }

    render(){            
        const {data, loader, deleteCycle} = this.props

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
                <center><h3>Listado de ciclos escolares</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/school_cycle/register"
                >
                    Crear ciclo escolar
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn
                        isKey
                        dataField="year"
                        dataSort
                    >
                        Ciclo
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "school_cycle", ver: "school_cycle", eliminar: deleteCycle })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default CycleList