import { update } from 'lodash'
import React, { Component } from 'react'
import SingleForm from '../Profession/SingleForm'
import LevelAddGrade from "./LevelAddGrade"
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";

class SectionCreate extends Component{
    state = {
        crear: true,
        grades:  [],
        gradesNew: [],
        deletedGrades: [],
        initialIndex: "a"        
    }

    componentDidMount = () => {
        const {readLevel, match, gradesInLevel} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            readLevel(id)
            const data = {level: id}
            gradesInLevel(data)                       
        }        
    }

    componentDidUpdate(prevProps) {        
        if (this.props.gradesAdded !== prevProps.gradesAdded) {
          this.setState({grades: this.props.gradesAdded})
        }
    }

    addGrade = (data) => {
        const isValid = data.name
        if(isValid == undefined || isValid == ""){
            Swal.fire({
                type: 'info',
                title: 'Oye espera',
                text: 'Debes escribir el nombre de un nuevo grado'                
            })
        }
        else{
            let lastValue = this.state.initialIndex.charCodeAt(0)
            let nextValue = String.fromCharCode(lastValue+1)
            
            const isRepeated = this.state.grades.filter(grade => {
                return grade.name.toLowerCase() == data.name.toLowerCase()
            })

            if(isRepeated.length > 0){
                Swal.fire({
                    type: 'warning',
                    title: 'Ups...',
                    text: 'Al parecer, ya hay un grado con el mismo nombre'                
                })
            }
            else{
                this.setState({            
                    grades: [
                        ...this.state.grades,
                        {
                            id: nextValue,
                            name: data.name,
                            description: data.description || ""
                        }
                    ],
                    gradesNew: [
                        ...this.state.gradesNew,
                        {
                            id: nextValue,
                            name: data.name,
                            description: data.description || ""
                        }
                    ],
                    initialIndex: nextValue
                })
            }     
            this.clearMyForm()
        }        
    }

    deleteGrade = (id) => {
        console.log("id delete grade:", id)
        let itIsNumber = Number.isInteger(id)        

        const gradesFiltered = this.state.grades.filter(grade => {
            return grade.id !== id
        })      
        
        const gradesNewFiltered = this.state.gradesNew.filter(grade => {
            return grade.id !== id
        })

        let nextState = {
            grades: gradesFiltered,
            gradesNew: gradesNewFiltered
        }

        if(itIsNumber){
            const gradesDeleted = []

            this.state.grades.forEach(grade => {
                if(grade.id == id){
                    gradesDeleted.push(grade.id)
                }
            })

            nextState = {
                grades: nextState.grades,
                gradesNew: nextState.gradesNew,
                deletedGrades:[...this.state.deletedGrades, ...gradesDeleted]
            } 
        }   
        
        this.setState(nextState)        
    }

    createGrades = () => {
        console.log("holi holi")
        if(this.state.gradesNew.length > 0 || this.state.deletedGrades.length > 0){
            const { addGradesToLevel, oneData } = this.props
            const data = {
                delete: this.state.deletedGrades,
                add: this.state.gradesNew,
                level: oneData.id
            }
            addGradesToLevel(data)
            console.log("el estate jeje:", this.state)
        }
        else{
            Swal.fire({
                type: 'info',
                title: 'Oh!',
                text: 'Parece que aún no hay modificaciones'
            })
        }
    }

    clearMyForm = () => {
        const { clearSingleForm } = this.props
        clearSingleForm()
    }
 

    render(){
        console.log('props level create:', this.props)
        const editar = window.location.href.includes('editar')

        const { registerLevel, updateLevel, gradesAdded } = this.props
        const { crear } = this.state

        const actionLevel = crear ? registerLevel : updateLevel;
        

        if(gradesAdded == null && !this.state.crear){
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
                <h3>NIVELES</h3>
                <SingleForm
                    onSubmit={actionLevel}
                    crear={crear}
                    myRoute={'/#/level'}
                />
                <br/>
                {(!crear && !editar) &&
                    <LevelAddGrade
                        grades={this.state.grades}
                        onSubmit={this.addGrade}
                        deleteGrade={this.deleteGrade}
                        createGrades={this.createGrades}
                        clearMyForm={this.clearMyForm}
                    />
                }                
            </React.Fragment>
        )
    }
}

export default SectionCreate