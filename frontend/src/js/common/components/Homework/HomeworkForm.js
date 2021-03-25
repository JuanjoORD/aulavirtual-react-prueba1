import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import LoadMask from "../Utils/LoadMask/LoadMask";

import {    
    renderField,
    renderDayPicker,
    renderSwitch,    
    renderNumber    
} from "../Utils/renderField/renderField";

class HomeworkForm extends Component{
    render(){
        const { handleSubmit = () => {}, 
                editarHomework, 
                changeCreateHomework, 
                isDisabled = false, 
                backToHomeworkStudent,
                countResHomework,
                actionDeliver = () => {},
                crear = false
            } = this.props
                      

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
                                    <label htmlFor="date_delivery">Fecha de entrega</label>
                                    <Field name="date_delivery" component={renderDayPicker} disabled={isDisabled}
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="myvalue">Nota</label>                                    
                                    <Field
                                        decimalScale={2}
                                        name="myvalue"
                                        placeholder="Nota..."
                                        component={renderNumber}
                                        disabled={isDisabled}
                                    />
                                </div>

                                <div className="form-group has-feedback">
                                    <label htmlFor="attached">Acepta archivo</label>
                                    <Field name="attached" placeholder="¿Acepta archivo?" component={renderSwitch}
                                        type="text" className="form-control" disabled={isDisabled} tag={["Si", "No"]}
                                    />
                                </div>                                
                            </div>                           
                        </div>

                        
                        <div className="d-flex justify-content-center mb-3">                            
                            {!isDisabled ?
                                <React.Fragment>
                                    <button                                
                                        className="btn btn-secondary btn-sm mr-2"                            
                                        type="button"
                                        onClick={() => changeCreateHomework()}
                                    >
                                        Cancelar crear/editar
                                    </button>
                                    <button
                                        type="submit"
                                        className={`btn btn-sm ${editarHomework ? 'btn-success' : 'btn-primary'}`}
                                    >
                                        {editarHomework ? "Actualizar tarea" : "Crear tarea"}
                                    </button>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <a
                                        href={backToHomeworkStudent}
                                        className="btn btn-sm btn-secondary mr-2"
                                    >
                                        <i className="material-icons">arrow_back</i>
                                    </a>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${crear ? "btn-secondary" : (countResHomework === 0 ? 'btn-primary' : 'btn-success')}`}
                                        onClick={actionDeliver}
                                    >
                                        {
                                            crear ? "Cancelar" 
                                            :
                                            (countResHomework === 0 ? "Agregar entrega" : "Editar entrega")
                                        }
                                    </button>
                                </React.Fragment>
                            }                                                
                        </div>                        
                    </div>
                </form>                                           
            </React.Fragment>
        )
    }
}


export default reduxForm({
    form: 'homework_form', // a unique identifier for this form    
})(HomeworkForm);
