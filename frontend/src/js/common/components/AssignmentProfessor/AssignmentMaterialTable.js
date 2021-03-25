import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";


class AssignmentMaterialTable extends Component{
    state = {
        crear: true
    }    

    render(){
        console.log('props AssignmentMaterialTable:', this.props)

        const { data, editMaterial, crearMaterial, deleteMaterial } = this.props
        
        

        return(
            <div className="col-8">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>      
                                <th scope="col">Título</th>
                                <th scope="col">Descripción</th>                            
                                <th scope="col">Archivo</th>
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
                                            <td> <a href={element.myfile} target="_blank">Descargar archivo</a> </td>
                                            <th>                                                
                                                {crearMaterial &&
                                                    <a className="px-2" 
                                                        style={{cursor: "pointer", color: "#f6db32"}} 
                                                        onClick={() => editMaterial(element)}
                                                    >
                                                        <i className="material-icons">edit</i>
                                                    </a>
                                                }
                                                <a className="px-2" 
                                                    style={{cursor: "pointer", color: "#c4183c"}} 
                                                    onClick={() => deleteMaterial(element.id)}
                                                >
                                                    <i className="material-icons">delete</i>
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
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default AssignmentMaterialTable