import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import sectionsImg from "../../../../assets/img/sections.svg"


class Sections extends Component{
       
    render(){
        console.log('props Sections Home:', this.props)
        const { data } = this.props            

        return(
            <div style={{padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                
                <div className="card">
                    <div className="card-header text-center">
                        Secciones
                    </div>                    
                    <div className="card-body row">                        
                        <img src={sectionsImg} alt="Portada" className="col-lg-4" />
                        <div className="col-lg-8">
                            <h5 className="card-title">Total de secciones: <strong>{data}</strong></h5>
                            <p className="card-text">
                                Para ver el listado de secciones debe dar click sobre el botón de abajo.
                            </p>
                            <a href="/#/section" className="btn btn-primary">Ver secciones</a>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Sections