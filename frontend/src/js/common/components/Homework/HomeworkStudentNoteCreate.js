import React, { Component } from 'react'
import HomeworkStudentNote from './HomeworkStudentNote'
import Swal from 'sweetalert2';

class HomeworkStudentNoteCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {readHomeworkForNote, match} = this.props        
        const idhw = match.params.idhw
        const ids = match.params.ids
        if(idhw && ids){            
            readHomeworkForNote(idhw, ids)
        }     
    }

    createNote = (data) => {
        const points = data.points   
        if(points === undefined || points === "" || points === null){
            Swal.fire({
                type: 'warning',
                title: 'Espere',
                text: 'Debe ingresar una calificación primero'
            })
        }
        else{
            console.log("DATA OF createNote:", data)
            const { qualifyHomework, match, dataHomeworkStudentNote } = this.props
            const myvalue = dataHomeworkStudentNote.homework.myvalue
            if(Number(points) <= Number(myvalue)){
                const { id, idhw, ids } = match.params
                qualifyHomework(idhw, ids, points, id)
            }
            else{
                Swal.fire({
                    type: 'warning',
                    title: 'Lo siento',
                    text: 'La calificación no puede ser mayor al valor establecido de la tarea'
                })
            }
        }
    }

    render(){
        console.log('props:', this.props)

        const { dataHomeworkStudentNote } = this.props        

        return(
            <React.Fragment>                
                <HomeworkStudentNote
                    data={dataHomeworkStudentNote}
                    onSubmit={this.createNote}
                />
            </React.Fragment>
        )
    }
}

export default HomeworkStudentNoteCreate