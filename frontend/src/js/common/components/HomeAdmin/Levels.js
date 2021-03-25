import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import DefaultPortrait from "../../../../assets/img/DefaultPortrait.svg"


class Levels extends Component{
       
    render(){
        console.log('props Lvels Home:', this.props)
        //const { data } = this.props            

        return(
            <div style={{padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                
                <div className="card">
                    <div className="card-header text-center">
                        Niveles
                    </div>                    
                    <div className="card-body row">                        
                        <img src={DefaultPortrait} alt="Portada" className="col-lg-4" />
                        <div className="col-lg-8">
                            <h5 className="card-title">Niveles registrados en el sistema</h5>
                            <p className="card-text">Para ver al listado de niveles puede dar click sobre el botón de abajo.</p>
                            <a href="/#/level" className="btn btn-primary">Ver niveles</a>
                        </div>
                    </div>                    
                </div>
                
            </div>
        )
    }
}

export default Levels