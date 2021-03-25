import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";


class MaterialList extends Component{
    componentDidMount = () => {
        const { listCurrentMaterial, match } = this.props        
        listCurrentMaterial(match.params.id)
        //console.log('props Material list student:', this.props)
    }    

    render(){        
        const { materialList } = this.props

        if(materialList == null){
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
                    <center><h3>Materiales</h3></center>
                    <div className="d-flex flex-row justify-content-start mb-2 mt-2">
                        <a
                            type="button"
                            className="btn btn-sm btn-secondary"
                            href="/#/assignment_student/home"
                        >
                            Regresar
                        </a>
                    </div>                    
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>      
                                <th scope="col">Título</th>
                                <th scope="col">Descripción</th>                            
                                <th scope="col">Archivo</th>                                
                            </tr>
                        </thead>
                        <tbody>                        
                            {materialList && materialList.length > 0 ?
                                materialList.map(element => {
                                    return (
                                        <tr key={element.id} >                                            
                                            <td>{element.title}</td>
                                            <td>{element.description}</td>
                                            <td> <a href={element.myfile} target="_blank">Descargar archivo</a> </td>                                           
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <th>No data</th>
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

export default MaterialList