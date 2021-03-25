import React, { Component } from 'react'
import StudentForm from './StudentForm'

class StudentCreate extends Component{
    state = {
        crear: true,
        avatar: null
    }

    componentDidMount = () => {
        const {readStudent, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})            
            readStudent(id)
        }        
    }

    setAvatar = (avatar) => {
        this.setState({avatar});
        console.log('MI AVATAR BRO:', this.state.avatar)
    };

    create = (data) => {
        const { registerStudent } = this.props;
        registerStudent({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    };

    update = (data) => {
        const { updateStudent } = this.props;
        updateStudent({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    };

    render(){
        console.log('props student create:', this.props)
        
        const { crear } = this.state
        const { oneData, cancelEditStudent } = this.props        

        const actionStudent = crear ? this.create : this.update;

        return(
            <React.Fragment>                
                <StudentForm
                    onSubmit={actionStudent}
                    crear={crear}   
                    setAvatar={this.setAvatar}              
                    oneData={oneData}
                    cancelEditStudent={cancelEditStudent}
                />
            </React.Fragment>
        )
    }
}

export default StudentCreate