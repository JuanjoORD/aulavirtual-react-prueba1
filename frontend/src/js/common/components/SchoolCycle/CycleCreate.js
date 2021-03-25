import React, { Component } from 'react'
import SingleForm from '../Profession/SingleForm'

class CycleCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const { readCycle, match } = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readCycle(id)
        }        
    }

    render(){
        console.log('props:', this.props)

        const { registerCycle, updateCycle } = this.props
        const { crear } = this.state

        const myAction = crear ? registerCycle : updateCycle;

        return(
            <React.Fragment>
                <h3>Ciclo escolar</h3>
                <SingleForm
                    onSubmit={myAction}
                    crear={crear}
                    myRoute={'/#/school_cycle'}
                    myFieldName={"year"}
                />
            </React.Fragment>
        )
    }
}

export default CycleCreate