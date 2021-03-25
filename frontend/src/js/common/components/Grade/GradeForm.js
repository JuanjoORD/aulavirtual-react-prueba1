import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import LoadMask from "../Utils/LoadMask/LoadMask";
import {    
    renderField,
    AsyncSelectField
} from "../Utils/renderField/renderField";

class GradeForm extends Component{
    render(){
        const { handleSubmit, crear, oneData, listLevel } = this.props

        const editar = window.location.href.includes('editar')
        let disabled = false
        let titleForm = 'Crear'

        if(crear == false && editar == false){
            disabled = true
            titleForm = "Ver"
        }

        if(editar)titleForm = 'Editar'

        if(oneData == undefined && !crear){
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
            <h3>{`${titleForm} grado`}</h3>
            <form onSubmit={handleSubmit} className="w-25" >  
                <label>Nivel</label>
                <Field
                    name="level"
                    loadOptions={listLevel}
                    component={AsyncSelectField}
                    disabled={disabled}
                />   
                <label>Grado</label>
                <Field name="name" component={renderField} disabled={disabled} />

                <label>Descripción</label>
                <Field name="description" component={renderField} disabled={disabled} />

                <br/>
                <div className="d-flex flex-row justify-content-end" >
                    <a
                        href="/#/grade"
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
            </React.Fragment>
        )
    }
}

export default reduxForm({
    form: 'grade_form'
})(GradeForm)