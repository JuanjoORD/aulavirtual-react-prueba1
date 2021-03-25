import { update } from 'lodash'
import React, { Component } from 'react'
import SingleForm from '../Profession/SingleForm'

class CourseCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {readCourse, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readCourse(id)
        }        
    }

    render(){
        console.log('props CourseCreate:', this.props)

        const { registerCourse, updateCourse } = this.props
        const { crear } = this.state

        const actionCourse = crear ? registerCourse : updateCourse;

        return(
            <React.Fragment>
                <h3>CURSO</h3>
                <SingleForm
                    onSubmit={actionCourse}
                    crear={crear}
                    myRoute={'/#/course'}
                />
            </React.Fragment>
        )
    }
}

export default CourseCreate