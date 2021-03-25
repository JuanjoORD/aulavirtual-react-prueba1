import React, { Component } from 'react'
import ProfessorForm from './ProfessorForm'
import ProfessorAssignmentSelect from "./ProfessorAssignmentSelect"
import ProfessorAssignmetTable from "./ProfessorAssignmentTable"

import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";

class ProfessorCreate extends Component{
    state = {
        crear: true,
        avatar: null,
        dataTable: [],
        dataNew: [],
        dataDelete: [],
        initialIndex: "a"
    }

    componentDidMount = () => {
        const {readProfessor, myAssignments, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readProfessor(id)
            myAssignments(id)
        }        
    }

    componentDidUpdate(prevProps) {        
        if (this.props.myAssignmentsData !== prevProps.myAssignmentsData) {
          this.setState({dataTable: this.props.myAssignmentsData})
        }
    }

    setAvatar = (avatar) => {
        this.setState({avatar});
        console.log('MI AVATAR BRO:', this.state.avatar)
    }

    create = (data) => {
        const { registerProfessor } = this.props;
        registerProfessor({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    };

    update = (data) => {
        const { updateProfessor } = this.props;
        updateProfessor({...data, avatar: null}, [{"file": this.state.avatar, "name": "avatar"}]);
    };

    //Functions to add assignments to professor
    addAssignmentTable = (data) => {        
        console.log("mi data broda 1:", data)

        const isValid = data.assignment
        if(isValid == undefined){
            Swal.fire({
                type: 'info',
                title: 'Oye espera',
                text: 'Debes seleccionar una asignatura para añadirla a la tabla'                
            })
        }
        else{
            let lastValue = this.state.initialIndex.charCodeAt(0)
            let nextValue = String.fromCharCode(lastValue+1)
            
            const isRepeated = this.state.dataTable.filter(e => {
                return e.label == data.assignment.label
            })

            if(isRepeated.length > 0){
                Swal.fire({
                    type: 'warning',
                    title: 'Ups...',
                    text: 'Al parecer, ya tiene esta asignatura'                
                })
            }
            else{
                const { existAssignProf, match } = this.props                

                const alreadyExist = existAssignProf(match.params.id, data.assignment.value)
                console.log({alreadyExist})
                if(alreadyExist){
                    Swal.fire({
                        type: 'warning',
                        title: 'Ups...',
                        text: 'Alguien más ya tiene esta asignatura'                
                    })
                }
                else{
                    this.setState({            
                        dataTable: [
                            ...this.state.dataTable,
                            {
                                id: nextValue,
                                value: data.assignment.value,
                                label: data.assignment.label
                            }
                        ],
                        dataNew: [
                            ...this.state.dataNew,
                            {
                                id: nextValue,
                                value: data.assignment.value,
                                label: data.assignment.label
                            }
                        ],
                        initialIndex: nextValue
                    })
                    this.clearMyForm()
                }
            }                        
        }
        console.log("mi data borda 2:", data)   
    }

    deleteAssignment = (id) => {
        console.log("id delete assign professor:", id)
        let itIsNumber = Number.isInteger(id)        

        const dataFiltered = this.state.dataTable.filter(e => {
            return e.id !== id
        })      
        
        const dataNewFiltered = this.state.dataNew.filter(e => {
            return e.id !== id
        })

        let nextState = {
            dataTable: dataFiltered,
            dataNew: dataNewFiltered
        }

        if(itIsNumber){
            const dataToDelete = []

            this.state.dataTable.forEach(e => {
                if(e.id == id){
                    dataToDelete.push(e.id)
                }
            })

            nextState = {
                dataTable: nextState.dataTable,
                dataNew: nextState.dataNew,
                dataDelete:[...this.state.dataDelete, ...dataToDelete]
            } 
        }   
        
        this.setState(nextState)        
    }

    saveChanges = () => {
        if(this.state.dataNew.length == 0 && this.state.dataDelete.length == 0){
            Swal.fire({
                type: 'info',
                title: 'Espera',
                text: 'Al parecer no hay cambios por realizar'
            })
        }
        else{
            const { registerAssignProfessor, match } = this.props
            registerAssignProfessor(this.state.dataNew, this.state.dataDelete, match.params.id)            
        }
    }

    clearMyForm = () => {
        const { clearForm } = this.props
        clearForm()
    }

    existAssign = (id) => {
        
    }

    render(){
        console.log('props ProfessorCreate:', this.props)
        const editar = window.location.href.includes('editar')

        const { professionGet, oneData, assignmentSelect, myAssignmentsData } = this.props
        const { crear } = this.state

        const actionProfessor = crear ? this.create : this.update;

        if(myAssignmentsData == null && !this.state.crear){
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
                <div>
                    <ProfessorForm
                        onSubmit={actionProfessor}
                        crear={crear}
                        professionGet={professionGet}
                        setAvatar={this.setAvatar}
                        oneData={oneData}
                    />
                </div>
                {(!crear && !editar) &&
                    <div className="row">
                        <ProfessorAssignmentSelect
                            onSubmit={this.addAssignmentTable}
                            assignmentSelect={assignmentSelect}
                            saveChanges={this.saveChanges}
                        />
                        <ProfessorAssignmetTable
                            toDelete={this.deleteAssignment}
                            data={this.state.dataTable}                            
                        />
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default ProfessorCreate