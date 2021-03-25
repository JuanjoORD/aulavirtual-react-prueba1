import { update } from 'lodash'
import React, { Component } from 'react'
import SingleForm from '../Profession/SingleForm'

class SectionCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {readSection, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readSection(id)
        }        
    }

    render(){
        console.log('props section create:', this.props)

        const { registerSection, updateSection } = this.props
        const { crear } = this.state

        const actionSection = crear ? registerSection : updateSection;

        return(
            <React.Fragment>
                <h3>SECCIÓN</h3>
                <SingleForm
                    onSubmit={actionSection}
                    crear={crear}
                    myRoute={'/#/section'}
                />
            </React.Fragment>
        )
    }
}

export default SectionCreate