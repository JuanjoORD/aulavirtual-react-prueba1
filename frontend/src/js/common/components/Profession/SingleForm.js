import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validators } from 'validate-redux-form';
import {
    renderCurrency,
    renderNumber,
    renderField,
    renderFilePicker,
    renderTextArea,
} from "../Utils/renderField/renderField";

let customField = undefined
class SingleForm extends Component{
    render(){
        const { handleSubmit, crear, myRoute, myFieldName } = this.props

        const editar = window.location.href.includes('editar')
        let disabled = false

        if(crear == false && editar == false){
            disabled = true
        }

        if(myFieldName){
            customField = myFieldName
        }

        return(
            <form onSubmit={handleSubmit} className="w-25" >                                
                <Field name={this.props.myFieldName || "name"} component={renderField} disabled={disabled} />

                <br/>
                <div className="d-flex flex-row justify-content-end" >
                    <a
                        href={myRoute}
                        className="btn btn-secondary btn-sm mr-2"
                    >
                        Cancelar
                    </a>
                    {disabled == false &&
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type="submit"
                        >
                            {editar ? 'Actualizar' : 'Registrar'}
                        </button>
                    }
                </div>                
            </form>
        )
    }
}

export default reduxForm({
    form: 'single_form',
    validate: (data) => {
        if(customField!==undefined){
            return validate(data, {
                year: validators.exists()('Este campo es requerido'),            
            }); 
        }
        else{
            return validate(data, {
                name: validators.exists()('Este campo es requerido'),                
            }); 
        } 
    }
})(SingleForm)