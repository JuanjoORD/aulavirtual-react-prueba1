import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import { Bar, Doughnut } from "react-chartjs-2"


class TotalUsers extends Component{
       
    render(){
        console.log('props TotalUsers:', this.props)
        const { data } = this.props
        const u = data.total_users        

        return(
            <div style={{backgroundColor: 'white', padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                <center><h3 style={{color: 'black'}}>Usuarios</h3></center>
                <Bar                    
                    height={400}
                    width={600}
                    data={{
                        labels: ['Estudiantes', 'Profesores'],
                        datasets: [{
                            label: 'total',
                            data: [u.students, u.professors],
                            backgroundColor: [                                
                                'rgba(54, 162, 235, 0.2)',                                
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [                                
                                'rgba(54, 162, 235, 1)',                                
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}

                    options={{
                        title:{
                            display: true,
                            text: `Total: ${u.total}`
                        },
                        scales: {
                            yAxes:[
                                {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
                        }                   
                    }}
                />
            </div>
        )
    }
}

export default TotalUsers