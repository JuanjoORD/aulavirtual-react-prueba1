import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class EventList extends Component{
    componentDidMount = () => {
        const { listEvent } = this.props
        listEvent()        
    }

    render(){            
        const { data, loader, deleteEvent } = this.props

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
                <center><h3>Listado de eventos</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/event/register"
                >
                    Crear evento
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn                        
                        dataField="title"
                        dataSort
                    >
                        Titulo
                    </TableHeaderColumn>

                    <TableHeaderColumn                        
                        dataField="description"
                        dataSort
                    >
                        Descripción
                    </TableHeaderColumn>

                    <TableHeaderColumn                        
                        dataField="date"
                        dataSort
                    >
                        Fecha del evento
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "event", ver: "event", eliminar: deleteEvent })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default EventList