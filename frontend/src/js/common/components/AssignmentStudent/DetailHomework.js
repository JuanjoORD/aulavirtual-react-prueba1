import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";

import HomeworkForm from "../Homework/HomeworkForm"
import DeliverHomework from "./DeliverHomework"


class DetailHomework extends Component{
    state = {
        id: null,
        idhw: null,
        crear: false,
        myfile: null
    }

    componentDidMount = () => {
        const { match, detailHomework } = this.props
        const id = match.params.id
        const idhw = match.params.idhw        
        if(id && idhw){                        
            detailHomework(idhw, id)
            this.setState({idhw, id})
        }        
    }        

    setMyfile = (myfile) => {
        this.setState({myfile})
    }

    createDeliver = () => {
        this.setState({crear: !this.state.crear})
    }

    editDeliver = () => {
        const { dataDeliverHomework, editHomeworkStudent } = this.props
        editHomeworkStudent()
        this.createDeliver()
    }

    saveDeliver = (data) => {
        console.log("Save Deliver:", data)
        const { registerHomeworkStudent, match } = this.props
        const { idhw } = this.state
        registerHomeworkStudent({text: data.text || "", myfile: null, homework: idhw}, [{"file": this.state.myfile, "name": "myfile"}])
        .then(res => {
            if(res){
                this.createDeliver()
            }
        })
    }

    updateDeliver = (data) => {
        console.log("Update Deliver:", data)
        const { updateHomeworkStudent } = this.props
        const { idhw } = this.state
        updateHomeworkStudent({text: data.text || "", myfile: null, homework: idhw}, [{"file": this.state.myfile, "name": "myfile"}])
        .then(res => {
            if(res){
                this.createDeliver()
            }
        })
    }
       
 
    render(){
        console.log('props Detail Homework:', this.props)        

        const { homeworkForm, countResHomework, dataDeliverHomework } = this.props
        const { id, crear } = this.state

        const actionDeliver = countResHomework === 0 ? this.createDeliver : this.editDeliver
        const submitDeliver = countResHomework === 0 ? this.saveDeliver : this.updateDeliver
    
        
        if(homeworkForm === null){
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
                    {
                        (dataDeliverHomework && dataDeliverHomework.points) ?
                        <h3><strong>Calificación: </strong>{dataDeliverHomework.points}</h3>
                        :
                        <h3><strong>Calificación: </strong>Sin calificar</h3>
                    }
                </div>          
                <div className="row mt-3">
                    <HomeworkForm
                        isDisabled={true}
                        backToHomeworkStudent={`/#/assignment_student/${id}/homework`}
                        countResHomework={countResHomework}
                        actionDeliver={actionDeliver}
                        crear={crear}
                    />
                    {crear &&
                        <DeliverHomework
                            countResHomework={countResHomework}
                            aceptFile={homeworkForm.attached}
                            onSubmit={submitDeliver}
                            setMyfile={this.setMyfile}
                            dataDeliverHomework={dataDeliverHomework}
                        />
                    }
                </div>                                                
            </React.Fragment>
        )
    }
}

export default DetailHomework