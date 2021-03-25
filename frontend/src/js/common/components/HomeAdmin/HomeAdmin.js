import React, { Component } from 'react'
import Swal from 'sweetalert2';
import LoadMask from "../Utils/LoadMask/LoadMask";
import { NotificationManager } from "react-notifications";

import TotalUsers from "./TotalUsers"
import Levels from "./Levels"
import Grades from "./Grades"
import Sections from "./Sections"
import CurrentSchoolCycle from "./CurrentSchoolCycle"


class HomeAdmin extends Component{

    componentDidMount = () => {
        const { totalUsers, totalGradesSections, currentSchoolCycle } = this.props
        totalUsers()
        totalGradesSections()
        currentSchoolCycle()
    }    
       
 
    render(){
        console.log('props HomeAdmin:', this.props)        

        const { totalUsersData, totalGradesData, totalSectionsData, schoolCycleData } = this.props              
    
        
        if(totalUsersData===null || totalGradesData===null || totalSectionsData===null || schoolCycleData===null){
            return(
                <div className="col-12">
                    <LoadMask light loading={true} type={"Grid"}>
                        <div style={{ height: "200px", width:"100%"}}>Grid</div>
                    </LoadMask>
                </div>
            )
        }        

        return(
            <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 mt-2 mb-1">
                    <div className="d-flex flex-row justify-content-center">
                        <center><h3>Patalla principal</h3></center>
                    </div>
                    <div className="">
                        <Levels/>
                        <Grades
                            data={totalGradesData}
                        />
                        <Sections
                            data={totalSectionsData}
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 mt-2 mb-2">
                    <CurrentSchoolCycle
                        data={schoolCycleData}
                    />
                    <TotalUsers
                            data={totalUsersData}
                    />
                </div>
            </div>
        )
    }
}

export default HomeAdmin