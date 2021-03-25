import React, { Component } from 'react'
import LoadMask from "../Utils/LoadMask/LoadMask";

class HomeworkNote extends Component{
    state = {
        crear: true
    }

    componentDidMount = () => {
        const {listHomeworkForNote, match} = this.props        
        const id = match.params.idhw
        if(id){            
            listHomeworkForNote(id)
        }     
    }

    render(){
        console.log('props HomeworkNote:', this.props)
        const currentRoute = '/'+window.location.hash        
        const lenRoute = currentRoute.lastIndexOf("homework") + 8
        const backRoute = currentRoute.slice(0, lenRoute)
        //console.log("windows location HomeworkNote:", backRoute)        
        
        const { crear } = this.state
        const { dataHomeworkNote } = this.props

        if(dataHomeworkNote == null){
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
                <center><h3>Calificar notas</h3></center>
                <div className="card mb-2 mt-2">                    
                    <div className="card-body">
                        <h5 className="card-title">{dataHomeworkNote && dataHomeworkNote.length > 0 ? dataHomeworkNote[0].homework.title : ""}</h5>
                        <p className="card-text">{ dataHomeworkNote && dataHomeworkNote.length > 0 ? dataHomeworkNote[0].homework.description : ""}</p>                        
                            <h2>
                                <a
                                    className="btn btn-sm btn-secondary mr-2"
                                    data-bs-toggle="tooltip" title="Regresar"
                                    href={backRoute}
                                >
                                    <i className="material-icons">arrow_back</i>
                                </a>
                                <span className="badge rounded-pill bg-primary">
                                    Valor: {dataHomeworkNote && dataHomeworkNote.length > 0 ? dataHomeworkNote[0].homework.myvalue : ""}
                                </span>                            
                            </h2>                                                    
                    </div>
                </div>

                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr className="table-primary">
                                <th>Estudiante</th>
                                <th>Nota</th>
                                <th>Archivo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataHomeworkNote && dataHomeworkNote.length > 0 ?
                                dataHomeworkNote.map(element => {
                                    return (
                                        <tr key={element.id} >      
                                            <td>{`${element.student.profile.user.first_name} ${element.student.profile.user.last_name}`}</td>                                      
                                            <td>{element.points}</td>
                                            <td>{element.homework.attached ? <a href={element.myfile} target="_blank">Descargar archivo</a> : "No hay archivo"}</td>
                                            <th>                                                
                                                <a className="px-2"
                                                    style={{cursor: "pointer", color: "#14b5f1", overflow: "hidden"}} 
                                                    href={`${currentRoute}/student/${element.student.id}`}
                                                >
                                                    <i className="material-icons">note</i>
                                                </a>
                                            </th>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <th>No data</th>
                                    <td>No data</td>                                    
                                    <td>No data</td>
                                    <td>No data</td>
                                </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default HomeworkNote