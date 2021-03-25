import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

import profession from './modules/profession/profession'
import role from './modules/role/role'
import section from './modules/section/section'
import level from './modules/level/level'
import cycle from "./modules/school_cycle/school_cycle"

import professor from './modules/professor/professor'
import student from './modules/student/student'

import grade from "./modules/grade/grade"
import assignment from "./modules/assignment/assignment"
import assignment_professor from "./modules/assignment_professor/assignment_professor"
import assignment_for_professor from "./modules/assignment_professor/assignment_for_professor"

import assignment_student from "./modules/assignment_student/assignment_student"
import assignment_for_student from "./modules/assignment_student/assignment_for_student"
import event from "./modules/event_school/event"
import home_admin from "./modules/home_admin/home_admin"
import course from "./modules/course/course"
import change_password from "./modules/change_password/change_password"
import restore_password from "./modules/cuenta/restore_password"

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    profession,
    role,
    professor,
    assignment_for_professor,
    student,
    section,
    level,
    grade,
    assignment,
    cycle,
    assignment_professor,
    assignment_student,
    assignment_for_student,
    event,
    home_admin,
    course,
    change_password,
    restore_password
});
