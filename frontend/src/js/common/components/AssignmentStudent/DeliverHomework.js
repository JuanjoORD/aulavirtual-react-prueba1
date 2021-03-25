import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";
import file_available from "../../../../assets/img/file_available.svg"

import {    
    renderField,
    renderFilePicker
} from "../Utils/renderField/renderField";

class DeliverHomework extends Component{
    render(){
        console.log("PROPS Deliver Homework:", this.props)
        const { 
                handleSubmit = () => {},                
                countResHomework,
                aceptFile,
                setMyfile,
                dataDeliverHomework
            } = this.props
                      

        return(
            <React.Fragment>                                
                <form onSubmit={handleSubmit} className="col-4" >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{countResHomework===0 ? 'Agregar tarea' : 'Editar Tarea'}</h6></div>                                               

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">                                                                

                                <div className="form-group has-feedback">
                                    <label htmlFor="text">Respuesta</label>
                                    <Field name="text" placeholder="Respuesta..." component={renderField} 
                                        type="text" className="form-control" disabled={false} 
                                    />
                                </div>                                

                                {aceptFile &&
                                    <div className="form-group has-feedback">
                                        <label htmlFor="myfile">Archivo</label>
                                        <Field photo={(dataDeliverHomework && dataDeliverHomework.myfile) ? file_available : null} 
                                            setFile={setMyfile} name="myfile" disabled={false} component={renderFilePicker}
                                        />
                                    </div>
                                }        
                                {aceptFile &&
                                    (dataDeliverHomework && dataDeliverHomework.myfile) 
                                    ? <a target="_blank" href={dataDeliverHomework.myfile}>Descargar archivo</a> 
                                    : "No hay archivo"
                                }                                                  
                            </div>                           
                        </div>
                        
                        <div className="d-flex justify-content-center mb-3">                            
                            <button
                                className="btn btn-sm btn-primary"
                                type="submit"
                            >
                                Confirmar entrega
                            </button>                                                                                 
                        </div>                        
                    </div>
                </form>                                           
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'deliver_homework_form', // a unique identifier for this form    
})(DeliverHomework);
