import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import gradesImg from "../../../../assets/img/grades.svg"


class Grades extends Component{
       
    render(){
        console.log('props Grades Home:', this.props)
        const { data } = this.props            

        return(
            <div style={{padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                
                <div className="card">
                    <div className="card-header text-center">
                        Grados
                    </div>                    
                    <div className="card-body row">                                                
                        <div className="col-lg-8">
                            <h5 className="card-title">Total de grados registrados: <strong>{data}</strong></h5>
                            <p className="card-text">
                            Para ver los grados registrados debe ingresar a uno de los niveles y estando ahí podrá ver los grados de cada nivel.
                            </p>                            
                        </div>
                        <img src={gradesImg} alt="Portada" className="col-lg-4" height="200" />
                    </div>                    
                </div>
                
            </div>
        )
    }
}

export default Grades