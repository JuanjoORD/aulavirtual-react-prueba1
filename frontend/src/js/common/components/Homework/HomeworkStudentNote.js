import React, { Component } from 'react'
import LoadMask from "../Utils/LoadMask/LoadMask";
import avatarPic from "../../../../assets/img/avatar-placeholder.png"
import { Field, reduxForm } from 'redux-form'

import {    
    renderField,
    renderNumber
} from "../Utils/renderField/renderField";

class HomeworkStudentNote extends Component{       

    render(){
        console.log('props HomeworkStudentNote:', this.props)
        const currentRoute = '/'+window.location.hash        
        const lenRoute = currentRoute.lastIndexOf("student") - 1
        const backRoute = currentRoute.slice(0, lenRoute)
        //console.log("windows location HomeworkStudentNote:", backRoute)        
                
        const { data, handleSubmit } = this.props        

        if(data === null){
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
                <center><h3>Calificar tarea</h3></center>
                <div className="card mb-2 mt-2 row">                    
                    <div className="card-body">
                        <h5 className="card-title">{data ? data.homework.title : ""}</h5>
                        <p className="card-text">{ data ? data.homework.description : ""}</p>                        
                            <h2>
                                <a
                                    className="btn btn-sm btn-secondary mr-2"
                                    data-bs-toggle="tooltip" title="Regresar"
                                    href={backRoute}
                                >
                                    <i className="material-icons">arrow_back</i>
                                </a>
                                <span className="badge rounded-pill bg-primary">
                                    Valor: {data ? data.homework.myvalue : ""}
                                </span>                            
                            </h2>                                                    
                    </div>
                </div>

                <div className="row">
                    <div className="card col-4">
                        <img src={data.student.profile.avatar ? data.student.profile.avatar : avatarPic} className="card-img-top w-25 mt-2" alt="Foto de estudiante"/>
                        <div className="card-body">
                            <h5 className="card-title">
                                <u><strong>Estudiante: </strong></u>
                                {`${data.student.profile.user.first_name} ${data.student.profile.user.last_name}`}
                            </h5>
                            <p className="card-text">
                                <u><strong>Respuesta: </strong></u>
                                {data.text}
                            </p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <a href={data.myfile ? data.myfile : null} target="_blank" >
                                    {data.myfile ? 'Descargar archivo de respuesta' : 'No subio archivo de respuesta'}
                                </a>
                            </li>                            
                        </ul>                        
                    </div>

                    <form onSubmit={handleSubmit} className="col-4" >                
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header"><h6 className="m-0">{`Calificación`}</h6></div>                                               

                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="form-group has-feedback flex-1 mx-3">                                                                

                                    <div className="form-group has-feedback">
                                        <label htmlFor="points">Nota</label>                                        
                                        <Field
                                            decimalScale={2}
                                            name="points"
                                            placeholder="Nota de la tarea"
                                            component={renderNumber}
                                        />
                                    </div>                                                               
                                </div>                           
                            </div>

                            
                            <div className="d-flex justify-content-center mb-3">
                                <button
                                    className="btn btn-sm btn-primary"
                                    type="submit"
                                >
                                    Dar Calificación
                                </button>
                            </div>                        
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default reduxForm({
    form: 'homework_note_form', // a unique identifier for this form    
})(HomeworkStudentNote);