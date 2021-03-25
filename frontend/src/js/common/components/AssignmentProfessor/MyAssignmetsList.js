import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import LoadMask from "../Utils/LoadMask/LoadMask";

class MyAssignmentsList extends Component{
    componentDidMount = () => {
        const { myAssignmentsProf, me } = this.props
        console.log("ME ME MEME:", me)
        myAssignmentsProf()
    }

    render(){            
        const {data, loader, assignmentsProf} = this.props

        if(assignmentsProf == null){
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
                <center><h3 className="mb-3">Clases asignadas</h3></center>
                
                <Grid hover striped data={{...assignmentsProf}} loading={loader} >
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
                        dataFormat={standardActions({ student: "my_assignment_prof", material: "my_assignment_prof", homework: "my_assignment_prof" })}
                    >
                    Acciones
                    </TableHeaderColumn>
                </Grid>                
            </React.Fragment>
        )
    }
}

export default MyAssignmentsList