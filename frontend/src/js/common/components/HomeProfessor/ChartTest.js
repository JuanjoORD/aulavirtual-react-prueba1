import { element } from 'prop-types';
import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";
import { Bar, Doughnut } from "react-chartjs-2"


class PendingHomework extends Component{
    
    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
       
    render(){
        console.log('props UpcomingEvents Home Student:', this.props)
        //const { eventStudent } = this.props

        return(
            <div style={{backgroundColor: 'white', padding: '2px 3px 2px 3px'}} className="rounded mb-2">
                <center><h3 style={{color: 'white'}}>Eventos próximos</h3></center>
                <Bar                    
                    height={400}
                    width={600}
                    data={{
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                '#0000000',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}

                    options={{
                        tooltips: {
                            mode: 'index'
                        },
                        title:{
                            display: true,
                            text: 'shaka'
                        }                        
                    }}
                />
            </div>
        )
    }
}

export default PendingHomework