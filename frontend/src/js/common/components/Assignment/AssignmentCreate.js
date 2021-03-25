import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";

import AssignmentForm from './AssignmentForm'
import TableAssignment from "./TableAssignment"

class AssignmentCreate extends Component{
    state = {
        crear: true,
        avatar: null,
        dataTable: [],
        dataNew: [],
        dataToDelete: [],
        initialIndex: "a"
    }

    componentDidMount = () => {
        const {readAssignment, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readAssignment(id)
        }        
    }

    setAvatar = (avatar) => {
        this.setState({avatar});
        console.log('MI AVATAR BRO:', this.state.avatar)
    }

    addAssignment = (data) => {
        const sectionValid = data.section
        const gradeValid = data.grade
        const courseValid = data.course
        if(sectionValid == undefined || gradeValid == undefined || courseValid == undefined){
            Swal.fire({
                type: 'warning',
                title: 'Oye espera',
                text: 'La sección, grado y curso son obligatorios'
            })
        }
        else{
            let lastValue = this.state.initialIndex.charCodeAt(0)
            let nextValue = String.fromCharCode(lastValue+1)
            
            const isRepeated = this.state.dataTable.filter(d => {                
                if(d.section.value == data.section.value && d.grade.value == data.grade.value && d.course.value == data.course.value){
                    return d
                }
            })

            if(isRepeated.length > 0){
                Swal.fire({
                    type: 'warning',
                    title: 'Ups...',
                    text: 'Al parecer, ya hay una asignatura igual'
                })
            }
            else{
                this.setState({            
                    dataTable: [
                        ...this.state.dataTable,
                        {
                            id: nextValue,
                            cover: this.state.avatar,
                            grade: data.grade,
                            section: data.section,
                            course: data.course,
                            description: data.description || "",
                            schoolcycle: ""

                        }
                    ],
                    dataNew: [
                        ...this.state.dataNew,
                        {
                            id: nextValue,
                            cover: this.state.avatar,
                            grade: data.grade,
                            section: data.section,
                            course: data.course,
                            description: data.description || "",
                            schoolcycle: ""
                        }
                    ],
                    initialIndex: nextValue
                })
                this.clearMyForm()
            }     
            console.log("data to add:", data)            
        }        
    }

    deleteAssignment = (id) => {
        console.log("id delete assignment:", id)
        let itIsNumber = Number.isInteger(id)        

        const dataFiltered = this.state.dataTable.filter(data => {
            return data.id !== id
        })      
        
        const dataNewFiltered = this.state.dataNew.filter(data => {
            return data.id !== id
        })

        let nextState = {
            dataTable: dataFiltered,
            dataNew: dataNewFiltered
        }

        if(itIsNumber){
            const toDelete = []

            this.state.dataTable.forEach(data => {
                if(data.id == id){
                    toDelete.push(data.id)
                }
            })

            nextState = {
                dataTable: nextState.dataTable,
                dataNew: nextState.dataNew,
                dataToDelete:[...this.state.dataToDelete, ...toDelete]
            } 
        }   
        
        this.setState(nextState)        
    }

    update = (data) => {
        console.log("la datonga u:",data)
        const { updateAssignment } = this.props;
        updateAssignment({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);        
    };

    saveChanges = () => {
        console.log("la datonga to create:",this.state)

        if(this.state.dataTable.length === 0){
            Swal.fire({
                type: 'info',
                title: 'Lo siento',
                text: 'Aún no hay asignaturas nuevas para crear'
            })
        }
        else{
            const { registerAssignment } = this.props;
            registerAssignment(this.state.dataTable);
        }                
    };

    clearMyForm = () => {
        const { clearForm } = this.props
        clearForm()
        this.setState({avatar: null})
    }
 
    render(){
        console.log('props AssignmentCreate:', this.props)

        const { oneData, courseSelect, sectionSelect, gradeSelect } = this.props
        const { crear } = this.state

        const actionAssignment = crear ? this.addAssignment : this.update;

        return(
            <React.Fragment>                
                <div className="row">                
                    <AssignmentForm
                        onSubmit={actionAssignment}
                        crear={crear}                    
                        setAvatar={this.setAvatar}
                        oneData={oneData}
                        courseSelect={courseSelect}
                        sectionSelect={sectionSelect}
                        gradeSelect={gradeSelect}
                        data={this.state.dataTable}                    
                        saveChanges={this.saveChanges}             
                    />
                    {crear &&
                        <TableAssignment
                            data={this.state.dataTable}
                            toDelete={this.deleteAssignment}
                        />
                    }                    
                </div>
            </React.Fragment>
        )
    }
}

export default AssignmentCreate