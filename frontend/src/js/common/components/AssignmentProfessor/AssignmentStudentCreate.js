import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";

import AssignmentStudentCard from './AssignmentStudentCard'
import AssignmentStudentTable from './AssignmentStudentTable'
import AssignmentMaterialForm from "./AssignmentMaterialForm"
import AssignmentMaterialTable from "./AssignmentMaterialTable"

import HomeworkForm from "../Homework/HomeworkForm"
import HomeworkTable from "../Homework/HomeworkTable"


class AssignmentStudentCreate extends Component{
    state = {
        crear: true,
        myfile: null,
        dataTable: [],
        dataNew: [],
        dataToDelete: [],
        initialIndex: "a",
        materialTable: [],
        materialNew: [],
        materialIndex: "a",
        materialToDelete: [],
        crearMaterial: false,
        editarMaterial: false,
        crearHomework: false,
        editarHomework: false
    }

    componentDidMount = () => {
        const {readNameCurrentAssign, listStudentCurrentAssing, listCurrentMaterial, listCurrentHomework, match} = this.props
        const id = match.params.id
        const material = window.location.href.includes('material')
        const student = window.location.href.includes('student')
        const homework = window.location.href.includes('homework')
        if(id){                        
            readNameCurrentAssign(id)

            if(student)listStudentCurrentAssing(id)
            
            if(material)listCurrentMaterial(id)            

            if(homework)listCurrentHomework(id)
        }        
    }
    
    componentDidUpdate(prevProps) {        
        if (this.props.currentStudents !== prevProps.currentStudents) {
          this.setState({dataTable: this.props.currentStudents})
        }
    }
    
    //INICIA lo necesario para el funcionamiento de agregar y eliminar estudiantes
    addStudent = (data) => {        
        let isValid = data.student
        if(isValid == undefined){
            Swal.fire({
                type: 'warning',
                title: 'Espere',
                text: 'Es necesario que seleccione un estudiante'
            })
        }
        else{
            let lastValue = this.state.initialIndex.charCodeAt(0)
            let nextValue = String.fromCharCode(lastValue+1)
            
            const isRepeated = this.state.dataTable.filter(d => {                
                if(d.student.value == isValid.value){
                    return d
                }
            })

            if(isRepeated.length > 0){
                Swal.fire({
                    type: 'warning',
                    title: 'Ups...',
                    text: 'Al parecer, este estudiante ya está agregado a esta clase'
                })
            }
            else{
                const existInDeleted = this.state.dataToDelete.filter(element => {
                    if(isValid.value === element.student.value){
                        return element
                    }
                })

                let filteredDelete = []
                let tempDataNew = []
                let tempDataTable = [
                    ...this.state.dataTable,
                    {
                        id: nextValue,
                        student: isValid

                    }
                ] 

                if(existInDeleted.length > 0){
                    tempDataTable = [
                        ...this.state.dataTable,
                        {
                            id: existInDeleted[0].id,
                            student: existInDeleted[0].student
    
                        }
                    ]                    

                    this.state.dataToDelete.forEach(element => {                    
                        if(element.student.value != isValid.value){
                            filteredDelete.push(element)
                        }                            
                    })
                    tempDataNew = this.state.dataNew
                }
                else{
                    filteredDelete = this.state.dataToDelete
                    tempDataNew = [
                        ...this.state.dataNew,
                        {
                            id: nextValue,
                            student: isValid
                        }
                    ]
                }

                const nextState = {
                    dataTable: tempDataTable,
                    dataNew: tempDataNew,
                    initialIndex: nextValue,
                    dataToDelete: filteredDelete
                }
                
                this.setState(nextState)
                this.clearMyForm()
            }     
            console.log("data to add Student:", data)            
        }        
    }

    deleteStudent = (id) => {
        console.log("id delete student of table:", id)
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
                if(data.id === id){
                    toDelete.push(data)
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
    

    saveChanges = () => {
        console.log("la datonga to create:",this.state)

        if(this.state.dataNew.length === 0 && this.state.dataToDelete.length === 0){
            Swal.fire({
                type: 'info',
                title: 'Lo siento',
                text: 'No hay cambios por realizar'
            })
        }
        else{
            const { updateStudentAssign, match } = this.props;
            updateStudentAssign(match.params.id, this.state.dataNew, this.state.dataToDelete);
        }                
    };  

    clearMyForm = () => {
        const { clearForm, oneData } = this.props
        clearForm(oneData.assignment)
    }
    //FINALIZA lo necesario para el funcioanmiento de agregar y eliminar estudiantes


    //INICIA funciones para agregar y eliminar MATERIAL DE CLASE
    clearFormMaterial = () => {
        const { clearFormMaterial } = this.props
        clearFormMaterial()
    }    

    setMyfile = (myfile) => {
        this.setState({myfile})
    }

    createMaterial = (data) => {
        const { registerMaterial, match } = this.props
        registerMaterial({...data, myfile: null, assignment: match.params.id}, [{"file": this.state.myfile, "name": "myfile"}])
        this.changeCreateMaterial()
    }
    
    editMaterial = (data) => {
        const { editMaterial } = this.props        
        this.setState({editarMaterial: true, myfile: null})
        editMaterial(data)
        console.log("DATA editMaterial:", data)
    }

    updateMaterial = (data) => {
        const { updateMaterial, match } = this.props
        updateMaterial({...data, myfile: null, assignment: match.params.id}, [{"file": this.state.myfile, "name": "myfile"}])
        this.changeCreateMaterial()
        console.log("DATA updateMaterial:", data)
    }

    deleteMaterial = (id) => {
        Swal.fire({
            title: '¿Eliminar?',
            text: '¡No podrá revertir esta acción!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, eliminar!',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                const { deleteMaterial, match } = this.props
                deleteMaterial(id, match.params.id)
                console.log("DATA deleteMaterial result.value:", {id})
            }
        });        
        console.log("DATA deleteMaterial:", {id})
    }

    changeCreateMaterial = () => {
        this.clearFormMaterial()
        this.setState({crearMaterial: !this.state.crearMaterial, myfile: null, editarMaterial: false})        
    }
    //FINALIZA funciones para agregar y eliminar MATERIAL DE CLASE

    /*
        INICIA lo necesario para TAREAS
        -------------------------------
    */
    clearFormHomework = () => {
        const { clearFormHomework } = this.props
        clearFormHomework()
    }

    changeCreateHomework = () => {
        this.clearFormHomework()
        this.setState({crearHomework: !this.state.crearHomework, editarHomework: false})        
    }

    createHomework = (data) => {
        const { registerHomework, match, dataTableHomework } = this.props
        if(dataTableHomework.length > 0){
            let totalValue = Number(data.myvalue)
            dataTableHomework.forEach(element => {
                totalValue += Number(element.myvalue)
            })

            if(totalValue <= 100){
                registerHomework({...data, assignment: match.params.id}).then(res => {
                    this.changeCreateHomework()
                })
            }
            else{
                const allowValue = 100 - (totalValue - data.myvalue)
                NotificationManager.error(`La suma de las notas eccede los 100 puntos, la nota actual debe ser igual o menor a ${allowValue}`, 'WARNING', 0);
            }
        }
        else{
            registerHomework({...data, assignment: match.params.id}).then(res => {
                this.changeCreateHomework()
            })
        }
    }
    
    editHomework = (data) => {
        const { editHomework } = this.props        
        this.setState({editarHomework: true})
        editHomework(data)
        console.log("DATA editHomework:", data)
    }

    updateHomework = (data) => {
        const { updateHomework, match, dataTableHomework } = this.props

        if(dataTableHomework.length > 0){
            let totalValue = 0
            dataTableHomework.forEach(element => {
                if(element.id != data.id)
                    totalValue += Number(element.myvalue)
                else
                    totalValue += Number(data.myvalue)
            })

            if(totalValue <= 100){
                updateHomework({...data, assignment: match.params.id}).then(data => {
                    this.changeCreateHomework()
                    console.log("AWAIT updateHomework XD:", data)
                })
            }
            else{
                const allowValue = 100 - (totalValue - data.myvalue)
                NotificationManager.error(`La suma de las notas eccede los 100 puntos, la nota actual debe ser igual o menor a ${allowValue}`, 'WARNING', 0);
            }
        }
        else{
            updateHomework({...data, assignment: match.params.id}).then(data => {
                this.changeCreateHomework()
                console.log("AWAIT updateHomework XD:", data)
            })
        }
    }

    deleteHomework = (id) => {
        Swal.fire({
            title: '¿Eliminar?',
            text: '¡No podrá revertir esta acción!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, eliminar!',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                const { deleteHomework, match } = this.props
                deleteHomework(id, match.params.id)
                console.log("DATA deleteHomework result.value:", {id})
            }
        });        
        console.log("DATA deleteHomework:", {id})
    }

    //FINALIZA lo necesario para TAREAS
 
    render(){
        console.log('props AssignmentStudentCreate:', this.props)
        const student = window.location.href.includes('student')
        const material = window.location.href.includes('material')
        const homework = window.location.href.includes('homework')

        const { currentStudents, oneData, studentSelect, currentFormMaterial, dataTableMaterial, dataFormHomework, dataTableHomework } = this.props
        const { editarMaterial, editarHomework } = this.state

        const actionMaterial = editarMaterial ? this.updateMaterial : this.createMaterial
        const actionHomework = editarHomework ? this.updateHomework : this.createHomework
        
        if(oneData == null){
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
                <div className="row mt-3">
                    <AssignmentStudentCard
                        onSubmit={this.addStudent}
                        oneData={oneData}
                        studentSelect={studentSelect}
                        saveChanges={this.saveChanges}
                    />
                    {student &&
                        <AssignmentStudentTable
                            data={this.state.dataTable}
                            toDelete={this.deleteStudent}
                        />
                    }                                        
                </div>
                
                {material &&
                    <div className="row">
                        <div className="d-flex justify-content-end col-8 mb-2">                
                            <button
                                type="button"
                                onClick={this.changeCreateMaterial}
                                className={`btn btn-sm ${!this.state.crearMaterial ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {!this.state.crearMaterial ? "Crear/editar material" : "Cerrar formulario material"}
                            </button>
                        </div>                    
                        <AssignmentMaterialTable
                            data={dataTableMaterial}
                            editMaterial={this.editMaterial}
                            crearMaterial={this.state.crearMaterial}
                            deleteMaterial={this.deleteMaterial}
                        />
                        {
                            (this.state.crearMaterial) &&
                            <AssignmentMaterialForm
                                onSubmit={actionMaterial}
                                setMyfile={this.setMyfile}
                                currentFormMaterial={currentFormMaterial}                                                        
                                updateMaterial={this.updateMaterial}
                                editarMaterial={this.state.editarMaterial}
                                changeCreateMaterial={this.changeCreateMaterial}
                            />
                        }
                    </div>
                }

                {homework &&
                    <div className="row">
                        <div className="d-flex justify-content-end col-8 mb-2">                
                            <button
                                type="button"
                                onClick={this.changeCreateHomework}
                                className={`btn btn-sm ${!this.state.crearHomework ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {!this.state.crearHomework ? "Crear/editar tarea" : "Cerrar formulario tarea"}
                            </button>
                        </div>
                        <HomeworkTable
                            data={dataTableHomework}
                            editHomework={this.editHomework}
                            crearHomework={this.state.crearHomework}
                            deleteHomework={this.deleteHomework}
                        />
                        {this.state.crearHomework &&
                            <HomeworkForm
                                onSubmit={actionHomework}
                                currentFormHomework={dataFormHomework}
                                updateHomework={this.updateHomework}
                                editarHomework={this.state.editarHomework}
                                changeCreateHomework={this.changeCreateHomework}
                            />
                        }
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default AssignmentStudentCreate