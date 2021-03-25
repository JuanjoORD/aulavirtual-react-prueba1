import React, { Component } from 'react'
import EventForm from './EventForm'

class EventCreate extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {editEvent, match} = this.props
        const id = match.params.id
        if(id){
            this.setState({crear: false})
            editEvent(id)
        }  
    }

    render(){
        console.log('props EventCreate:', this.props)
        const { oneData, registerEvent, updateEvent } = this.props
        const { crear } = this.state

        const actionEvent = crear ? registerEvent : updateEvent

        return(
            <React.Fragment>
                <h3>Evento</h3>
                <EventForm
                    oneData={oneData}
                    onSubmit={actionEvent}
                    crear={crear}
                />
            </React.Fragment>
        )
    }
}

export default EventCreate