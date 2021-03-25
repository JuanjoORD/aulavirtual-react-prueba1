import React, { Component } from 'react'
import SingleForm from '../Profession/SingleForm'

class RoleCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {readRole, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readRole(id)
        }        
    }

    render(){
        console.log('props roleCreate:', this.props)

        const { registerRole, updateRole } = this.props
        const { crear } = this.state

        const actionRole = crear ? registerRole : updateRole;

        return(
            <React.Fragment>
                <h3>ROL</h3>
                <SingleForm
                    onSubmit={actionRole}
                    crear={crear}
                    myRoute={'/#/role'}
                />
            </React.Fragment>
        )
    }
}

export default RoleCreate