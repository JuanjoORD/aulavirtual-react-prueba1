import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";


class HomeworkList extends Component{
    state = {
        idAssignment: null
    }

    componentDidMount = () => {
        const { listCurrentHomework, match } = this.props        
        const idAssignment = match.params.id
        listCurrentHomework(idAssignment)
        this.setState({idAssignment})
    }
       

    render(){
        //console.log('props HomeworkList:', this.props)

        const { homeworkList } = this.props
        const { idAssignment } = this.state

        if(homeworkList === null){
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
                    <center><h3>Tareas</h3></center>
                    <div className="d-flex flex-row justify-content-start mb-2 mt-2">                        
                        <a 
                            className="btn btn-sm btn-secondary"
                            type="button"                            
                            href="/#/assignment_student/home"
                        >
                            <i className="material-icons left">arrow_back</i>                            
                        </a>
                    </div>

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>      
                                <th scope="col">Título</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Fecha entrega</th>
                                <th scope="col">Nota</th>
                                <th scope="col">Acepta archivo</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>                        
                            {homeworkList && homeworkList.length > 0 ?
                                homeworkList.map(element => {
                                    return (
                                        <tr key={element.id} >                                            
                                            <td>{element.title}</td>
                                            <td>{element.description}</td>
                                            <td>{element.date_delivery}</td>
                                            <td>{element.myvalue}</td>
                                            <td>{element.attached ? "Si" : "No"}</td>
                                            <th>                                                                                                
                                                <a className="px-2" 
                                                    style={{cursor: "pointer", color: "#17f114"}}                                                    
                                                    href={`/#/assignment_student/${idAssignment}/homework/${element.id}`}
                                                >
                                                    <i className="material-icons">remove_red_eye</i>
                                                </a>
                                            </th>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <th>No data</th>
                                    <td>No data</td>                                    
                                    <td>No data</td>
                                    <td>No data</td>
                                    <td>No data</td>
                                    <td>No data</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </React.Fragment>
        )
    }
}

export default HomeworkList