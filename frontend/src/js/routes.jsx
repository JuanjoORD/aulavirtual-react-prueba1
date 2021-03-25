import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro, VerifyEmailUserContainer, RestorePasswordContainer} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import ProfessionCreateContainer from './common/components/Profession/ProfessionCreateContainer'
import ProfessionListContainer from './common/components/Profession/ProfessionListContainer'

import RoleCreateContainer from './common/components/Role/RoleCreateContainer'
import RoleListContainer from './common/components/Role/RoleListContainer'

import ProfessorCreateContainer from './common/components/Professor/ProfessorCreateContainer'
import ProfessorListContainer from './common/components/Professor/ProfessorListContainer'

import StudentCreateContainer from './common/components/Student/StudentCreateContainer'
import StudentListContainer from './common/components/Student/StudentListContainer'

import SectionCreateContainer from './common/components/Section/SectionCreateContainer'
import SectionListContainer from './common/components/Section/SectionListContainer'

import LevelCreateContainer from './common/components/Level/LevelCreateContainer'
import LevelListContainer from './common/components/Level/LevelListContainer'

import GradeCreateContainer from './common/components/Grade/GradeCreateContainer'
import GradeListContainer from './common/components/Grade/GradeListContainer'

import CourseCreateContainer from './common/components/Course/CourseCreateContainer'
import CourseListContainer from './common/components/Course/CourseListContainer'

import AssignmentCreateContainer from './common/components/Assignment/AssignmentCreateContainer'
import AssignmentListContainer from './common/components/Assignment/AssignmentListContainer'

import CycleCreateContainer from './common/components/SchoolCycle/CycleCreateContainer'
import CycleListContainer from './common/components/SchoolCycle/CycleListContainer'

import MyAssignmentsListContainer from './common/components/AssignmentProfessor/MyAssignmentsListContainer';
import AssignmentStudentCreateContainer from './common/components/AssignmentProfessor/AssignmentStudentCreateContainer';
import HomeworkNoteContainer from './common/components/Homework/HomeworkNoteContainer';
import HomeworkStudentNoteContainer from './common/components/Homework/HomeworkStudentNoteContainer';
import HomeProfessorContainer from './common/components/HomeProfessor/HomeProfessorContainer';

import AssignmentStudentListContainer from './common/components/AssignmentStudent/AssignmentStudentListContainer';
import MaterialListContainer from './common/components/AssignmentStudent/MaterialListContainer';
import HomeworkListContainer from './common/components/AssignmentStudent/HomeworkListContainer';
import DetailHomeworkContainer from './common/components/AssignmentStudent/DetailHomeworkContainer';
import HomeStudentContainer from './common/components/HomeStudent/HomeStudentContainer';

import EventListContainer from './common/components/EventSchool/EventListContainer';
import EventCreateContainer from './common/components/EventSchool/EventCreateContainer';

import HomeAdminContainer from "./common/components/HomeAdmin/HomeAdminContainer"
import PasswordChangeContainer from "./common/components/ChangePassword/PasswordChangeContainer"
import MyQualificationsContainer from "./common/components/AssignmentStudent/MyQualificationsContainer"

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/verify_email_user" component={VerifyEmailUserContainer} />
                <Route exact path="/restore_password/:token" component={RestorePasswordContainer} />
                {/* <Route exact path="/registro" component={Registro} /> */}
                <ProtectedRoute exact path="/" component={HomeAdminContainer} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/profession/register" component={ProfessionCreateContainer} />
                <ProtectedRoute exact path="/profession/:id" component={ProfessionCreateContainer} />
                <ProtectedRoute exact path="/profession/:id/editar" component={ProfessionCreateContainer} />
                <ProtectedRoute exact path="/profession" component={ProfessionListContainer} />
                
                <ProtectedRoute exact path="/role/:id" component={RoleCreateContainer} />               
                <ProtectedRoute exact path="/role" component={RoleListContainer} />

                <ProtectedRoute exact path="/professor/register" component={ProfessorCreateContainer} />
                <ProtectedRoute exact path="/professor/:id" component={ProfessorCreateContainer} />
                <ProtectedRoute exact path="/professor/:id/editar" component={ProfessorCreateContainer} />
                <ProtectedRoute exact path="/professor" component={ProfessorListContainer} />

                <ProtectedRoute exact path="/student/register" component={StudentCreateContainer} />
                <ProtectedRoute exact path="/student/:id" component={StudentCreateContainer} />
                <ProtectedRoute exact path="/student/:id/editar" component={StudentCreateContainer} />
                <ProtectedRoute exact path="/student" component={StudentListContainer} />

                <ProtectedRoute exact path="/section/register" component={SectionCreateContainer} />
                <ProtectedRoute exact path="/section/:id" component={SectionCreateContainer} />
                <ProtectedRoute exact path="/section/:id/editar" component={SectionCreateContainer} />
                <ProtectedRoute exact path="/section" component={SectionListContainer} />

                <ProtectedRoute exact path="/level/register" component={LevelCreateContainer} />
                <ProtectedRoute exact path="/level/:id" component={LevelCreateContainer} />
                <ProtectedRoute exact path="/level/:id/editar" component={LevelCreateContainer} />
                <ProtectedRoute exact path="/level" component={LevelListContainer} />

                <ProtectedRoute exact path="/grade/register" component={GradeCreateContainer} />
                <ProtectedRoute exact path="/grade/:id" component={GradeCreateContainer} />
                <ProtectedRoute exact path="/grade/:id/editar" component={GradeCreateContainer} />
                <ProtectedRoute exact path="/grade" component={GradeListContainer} />

                <ProtectedRoute exact path="/course/register" component={CourseCreateContainer} />
                <ProtectedRoute exact path="/course/:id" component={CourseCreateContainer} />
                <ProtectedRoute exact path="/course/:id/editar" component={CourseCreateContainer} />
                <ProtectedRoute exact path="/course" component={CourseListContainer} />

                <ProtectedRoute exact path="/assignment/register" component={AssignmentCreateContainer} />
                <ProtectedRoute exact path="/assignment/:id" component={AssignmentCreateContainer} />
                <ProtectedRoute exact path="/assignment/:id/editar" component={AssignmentCreateContainer} />
                <ProtectedRoute exact path="/assignment" component={AssignmentListContainer} />

                <ProtectedRoute exact path="/school_cycle/register" component={CycleCreateContainer} />
                <ProtectedRoute exact path="/school_cycle/:id" component={CycleCreateContainer} />
                <ProtectedRoute exact path="/school_cycle/:id/editar" component={CycleCreateContainer} />
                <ProtectedRoute exact path="/school_cycle" component={CycleListContainer} />

                <ProtectedRoute exact path="/my_assignment_prof/:id/student" component={AssignmentStudentCreateContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/:id/material" component={AssignmentStudentCreateContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/:id/homework" component={AssignmentStudentCreateContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/:id/homework/:idhw" component={HomeworkNoteContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/:id/homework/:idhw/student/:ids" component={HomeworkStudentNoteContainer} />
                <ProtectedRoute exact path="/my_assignment_prof" component={MyAssignmentsListContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/home" component={HomeProfessorContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/change_password" component={PasswordChangeContainer} />
                <ProtectedRoute exact path="/my_assignment_prof/user-profile" component={Profile} />

                <ProtectedRoute exact path="/assignment_student" component={AssignmentStudentListContainer} />
                <ProtectedRoute exact path="/assignment_student/:id/material" component={MaterialListContainer} />
                <ProtectedRoute exact path="/assignment_student/:id/homework" component={HomeworkListContainer} />
                <ProtectedRoute exact path="/assignment_student/:id/homework/:idhw" component={DetailHomeworkContainer} />
                <ProtectedRoute exact path="/assignment_student/home" component={HomeStudentContainer} />
                <ProtectedRoute exact path="/assignment_student/my_qualifications" component={MyQualificationsContainer} />
                <ProtectedRoute exact path="/assignment_student/change_password" component={PasswordChangeContainer} />
                <ProtectedRoute exact path="/assignment_student/user-profile" component={Profile} />

                <ProtectedRoute exact path="/user/change_password" component={PasswordChangeContainer} />

                <ProtectedRoute exact path="/event" component={EventListContainer} />
                <ProtectedRoute exact path="/event/register" component={EventCreateContainer} />
                <ProtectedRoute exact path="/event/:id" component={EventCreateContainer} />
                <ProtectedRoute exact path="/event/:id/editar" component={EventCreateContainer} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
