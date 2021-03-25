import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";

import {    
    renderField,
    renderDayPicker,    
} from "../Utils/renderField/renderField";

class EventForm extends Component{
    render(){
        const { handleSubmit = () => {},                
                crear,
                oneData
            } = this.props

        const editar = window.location.href.includes('editar')
        let isDisabled = false
    
        if(crear == false && editar == false){
            isDisabled = true
        }

        if(oneData === null && editar){
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
                <form onSubmit={handleSubmit} className="col-4" >                
                    <div className="mb-4 card card-small">
                        <div className="border-bottom card-header"><h6 className="m-0">{`Tarea`}</h6></div>                                               

                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="form-group has-feedback flex-1 mx-3">                                                                

                                <div className="form-group has-feedback">
                                    <label htmlFor="title">Título</label>
                                    <Field name="title" placeholder="Titulo del material..." component={renderField} 
                                        type="text" className="form-control" disabled={isDisabled} 
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="description">Descripción</label>
                                    <Field name="description" placeholder="Descripción..." component={renderField}
                                        type="text" className="form-control" disabled={isDisabled} 
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="date">Fecha del evento</label>
                                    <Field name="date" component={renderDayPicker} disabled={isDisabled}
                                    />
                                </div>                                                               
                            </div>                           
                        </div>

                        
                        <div className="d-flex justify-content-center mb-3">
                            <a
                                className="btn btn-sm btn-secondary mr-2"
                                href="/#/event"
                                data-toggle="tooltip" data-placement="bottom" title="Regresar al listado"
                            >
                                <i className="material-icons" >arrow_back</i>
                            </a>
                           
                            {isDisabled == false &&
                                <button
                                    className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                                    type="submit"
                                >
                                    {editar ? 'Actualizar' : 'Registrar'}
                                </button>
                            }                                
                        </div>                        
                    </div>
                </form>                                           
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'event_form', // a unique identifier for this form
    validate: (data) => {        
        return validate(data, {
            title: validators.exists()('Este campo es requerido'),
            description: validators.exists()('Este campo es requerido'),
            date: validators.exists()('Este campo es requerido'),            
        });
    },
})(EventForm);
