import React, { Component } from 'react'
import SingleForm from './SingleForm'

class ProfessionCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {readProfession, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readProfession(id)
        }        
    }

    render(){
        console.log('props:', this.props)

        const { registerProfession, updateProfession } = this.props
        const { crear } = this.state

        const actionProfession = crear ? registerProfession : updateProfession;

        return(
            <React.Fragment>
                <h3>PROFESIÓN</h3>
                <SingleForm
                    onSubmit={actionProfession}
                    crear={crear}
                    myRoute={'/#/profession'}
                />
            </React.Fragment>
        )
    }
}

export default ProfessionCreate