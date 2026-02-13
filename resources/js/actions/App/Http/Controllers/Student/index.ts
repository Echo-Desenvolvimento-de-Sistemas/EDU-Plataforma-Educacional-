import DashboardController from './DashboardController'
import DocumentController from './DocumentController'
import GradeController from './GradeController'
import AttendanceController from './AttendanceController'
import ClassScheduleController from './ClassScheduleController'
import PlayerController from './PlayerController'
const Student = {
    DashboardController: Object.assign(DashboardController, DashboardController),
DocumentController: Object.assign(DocumentController, DocumentController),
GradeController: Object.assign(GradeController, GradeController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
ClassScheduleController: Object.assign(ClassScheduleController, ClassScheduleController),
PlayerController: Object.assign(PlayerController, PlayerController),
}

export default Student