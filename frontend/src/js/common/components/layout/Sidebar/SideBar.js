import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut, user } = this.props;
        const myRole = user.profile ? user.profile.role : null
        //console.log("CURRENT USER:", user)
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">                        
                        {
                            user.is_superuser && 
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">home</i>
                                        </div>
                                        <span>Home</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/professor" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">supervisor_account</i>
                                        </div>
                                        <span>Profesores</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/student" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">assignment_ind</i>
                                        </div>
                                        <span>Estudiantes</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/profession" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">work</i>
                                        </div>
                                        <span>Profesiones</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/section" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">leak_remove</i>
                                        </div>
                                        <span>Secciones</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/level" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">view_stream</i>
                                        </div>
                                        <span>Niveles</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/course" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">account_tree</i>
                                        </div>
                                        <span>Cursos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/school_cycle" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">settings</i>
                                        </div>
                                        <span>Ciclo escolar</span>
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item">
                                    <NavLink to="/assignment" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">school</i>
                                        </div>
                                        <span>Asignaturas</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/event" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">sms_failed</i>
                                        </div>
                                        <span>Eventos</span>
                                    </NavLink>
                                </li>                        
                                <li className="nav-item">
                                    <NavLink to="/role" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">supervised_user_circle</i>
                                        </div>
                                        <span>**Roles**</span>
                                    </NavLink>
                                </li>
                            </React.Fragment>
                        }
                        {
                            (myRole === 2) &&
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink to="/my_assignment_prof/home" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">home</i>
                                        </div>
                                        <span>Home</span>
                                    </NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink to="/my_assignment_prof" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">next_week</i>
                                        </div>
                                        <span>Asignaturas Profesor</span>
                                    </NavLink>
                                </li> */}
                            </React.Fragment>                            
                        }                        
                        {
                            (myRole === 3) &&
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink to="/assignment_student/home" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">home</i>
                                        </div>
                                        <span>Home</span>
                                    </NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink to="/assignment_student" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">next_week</i>
                                        </div>
                                        <span>Asignaturas Estudiantes</span>
                                    </NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink to="/assignment_student/my_qualifications" exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">list_alt</i>
                                        </div>
                                        <span>Mis notas</span>
                                    </NavLink>
                                </li>
                            </React.Fragment>                            
                        }                        
                        {/* <li className="nav-item">
                            <NavLink to="/page2" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Basic components</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/grids" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Grids</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/notifications" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Notificaciones</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tabs" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Tabs</span>
                            </NavLink>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
