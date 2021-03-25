import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class SectionList extends Component{
    componentDidMount = () => {
        const { listSection } = this.props
        listSection()        
    }

    render(){            
        const {data, loader, deleteSection} = this.props

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
                <center><h3>Listado de secciones</h3></center>
                <a 
                    className="btn btn-primary mb-2"
                    href="/#/section/register"
                >
                    Crear sección
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn
                        isKey
                        dataField="name"
                        dataSort
                    >
                        Sección
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "section", ver: "section", eliminar: deleteSection })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default SectionList