import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";


class HomeworkTable extends Component{
    state = {
        crear: true
    }    

    render(){
        console.log('props HomeworkTable:', this.props)

        const { data = [], crearHomework, editHomework, deleteHomework, match } = this.props
        const currentRoute = '/'+window.location.hash
        console.log("windows location HomeworkTable:", currentRoute)
        
        

        return(
            <div className="col-8">
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
                            {data && data.length > 0 ?
                                data.map(element => {
                                    return (
                                        <tr key={element.id} >                                            
                                            <td>{element.title}</td>
                                            <td>{element.description}</td>
                                            <td>{element.date_delivery}</td>
                                            <td>{element.myvalue}</td>
                                            <td>{element.attached ? "Si" : "No"}</td>
                                            <th>                                                
                                                {crearHomework &&
                                                    <a  className="px-2"
                                                        style={{cursor: "pointer", color: "#f6db32"}} 
                                                        onClick={() => editHomework(element)}
                                                    >
                                                        <i className="material-icons">edit</i>
                                                    </a>
                                                }
                                                <a  className="px-2"
                                                    style={{cursor: "pointer", color: "#c4183c"}} 
                                                    onClick={() => deleteHomework(element.id)}
                                                >
                                                    <i className="material-icons">delete</i>
                                                </a>
                                                <a className="px-2"
                                                    style={{cursor: "pointer", color: "#14b5f1", overflow: "hidden"}} 
                                                    href={`${currentRoute}/${element.id}`}
                                                >
                                                    <i className="material-icons">note</i>
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
                </div>
        )
    }
}

export default HomeworkTable