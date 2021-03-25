import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class MyAssignmentsList extends Component{
    componentDidMount = () => {
        const { myAssignmentsStudent } = this.props        
        myAssignmentsStudent()
        //console.log("props CLASES DEL ESTUDIANTE:", this.props)
    }

    render(){            
        const {data, loader} = this.props

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
                <center><h3 className="mb-3">Mis clases asignadas</h3></center>
                
                <Grid hover striped data={{...data}} loading={loader} >
                    <TableHeaderColumn                                                
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${row.course.name}, ${row.grade.name}, ${row.section.name}`
                        }}
                    >
                        Clase/Asignatura
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ material: "assignment_student", homework: "assignment_student" })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default MyAssignmentsList