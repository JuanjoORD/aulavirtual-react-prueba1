import React, { Component } from 'react'
import GradeForm from './GradeForm'

class ProfessorCreate extends Component{
    state = {
        crear: true,      
    }

    componentDidMount = () => {
        const {readGrade, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readGrade(id)
        }        
    }
    

    render(){
        console.log('props GradeCreate:', this.props)

        const { listLevel, oneData, registerGrade, updateGrade } = this.props
        const { crear } = this.state

        const actionGrade = crear ? registerGrade : updateGrade;

        return(
            <React.Fragment>                
                <GradeForm
                    onSubmit={actionGrade}
                    crear={crear}
                    listLevel={listLevel}                    
                    oneData={oneData}
                />
            </React.Fragment>
        )
    }
}

export default ProfessorCreate