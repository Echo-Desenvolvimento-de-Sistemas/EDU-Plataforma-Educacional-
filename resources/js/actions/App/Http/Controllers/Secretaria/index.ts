import DashboardController from './DashboardController'
import UserController from './UserController'
import PreRegistrationController from './PreRegistrationController'
import GradeController from './GradeController'
import BatchEnrollmentController from './BatchEnrollmentController'
const Secretaria = {
    DashboardController: Object.assign(DashboardController, DashboardController),
UserController: Object.assign(UserController, UserController),
PreRegistrationController: Object.assign(PreRegistrationController, PreRegistrationController),
GradeController: Object.assign(GradeController, GradeController),
BatchEnrollmentController: Object.assign(BatchEnrollmentController, BatchEnrollmentController),
}

export default Secretaria