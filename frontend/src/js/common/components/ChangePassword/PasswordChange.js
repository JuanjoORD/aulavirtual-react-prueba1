import React, { Component } from 'react'
import FormPassword from './FormPassword'

import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";

class PasswordChange extends Component{
    state = {
        crear: true,
    }

    componentDidMount = () => {
        const { verifyPasswordChanged } = this.props
        verifyPasswordChanged()
    }

    changePassword = (data) => {
        const isPassword = data.password
        if(isPassword==undefined || isPassword===""){
            Swal.fire({
                type: 'info',
                title: 'Espera',
                text: 'Debe ingresar una contraseña, para poder cambiar la actual'
            })
        }
        else{
            const { changeMyPassword, getMe } = this.props
            changeMyPassword().then(x => {
                getMe().then(j =>{
                    window.location.replace("http://0.0.0.0:8080/#/");
                })
            })
        }
    }
    

    render(){
        console.log('props PasswordChange:', this.props)

        return(
            <React.Fragment>
                <FormPassword
                    onSubmit={this.changePassword}
                />
            </React.Fragment>
        )
    }
}

export default PasswordChange