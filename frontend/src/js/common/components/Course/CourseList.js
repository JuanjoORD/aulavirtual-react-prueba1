import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class CourseList extends Component{
    componentDidMount = () => {
        const { listCourse } = this.props
        listCourse()        
    }

    render(){            
        const {data, loader, deleteCourse} = this.props

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
                    href="/#/course/register"
                >
                    Crear curso
                </a>
                <Grid hover striped data={data} loading={loader} >
                    <TableHeaderColumn
                        isKey
                        dataField="name"
                        dataSort
                    >
                        Curso
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "course", ver: "course", eliminar: deleteCourse })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default CourseList