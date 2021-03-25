import React from 'react'

import "../../../../style/ProfessorCard.css"

class ProfessorCard extends React.Component{    
    render(){                             

        return(
            <div className="card-container" >
                <div className="upper-container" >
                    <div className="image-container" >
                        <img src={''} alt="User avatar" />
                    </div>
                </div>

                <div className="lower-container" >
                    <div className="username" >
                        <h3>{'juanjo'}</h3>
                        <h4>@{'jjrekenar'}</h4>
                    </div>
                    <div>
                        <div className="tweets" >
                            <h3>TWEETS</h3>
                            <h4>{'10'}</h4>
                        </div>
                        <div className="following" >
                            <h3>FOLLOWING</h3>
                            <h4>{'11'}</h4>
                        </div>
                        <div className="followers" >
                            <h3>FOLLOWERS</h3>
                            <h4>{'12'}</h4>
                        </div>
                    </div>                    
                </div>
            </div>          
        )
    }
}

export default ProfessorCard