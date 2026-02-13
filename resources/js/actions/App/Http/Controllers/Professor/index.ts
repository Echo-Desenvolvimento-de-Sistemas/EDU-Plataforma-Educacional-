import DashboardController from './DashboardController'
import ClassRoomController from './ClassRoomController'
import AttendanceController from './AttendanceController'
import AssessmentController from './AssessmentController'
import GradeController from './GradeController'
import ReportController from './ReportController'
import ActivityController from './ActivityController'
import QuestionBankController from './QuestionBankController'
import QuestionController from './QuestionController'
import LessonPlanController from './LessonPlanController'
const Professor = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ClassRoomController: Object.assign(ClassRoomController, ClassRoomController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
AssessmentController: Object.assign(AssessmentController, AssessmentController),
GradeController: Object.assign(GradeController, GradeController),
ReportController: Object.assign(ReportController, ReportController),
ActivityController: Object.assign(ActivityController, ActivityController),
QuestionBankController: Object.assign(QuestionBankController, QuestionBankController),
QuestionController: Object.assign(QuestionController, QuestionController),
LessonPlanController: Object.assign(LessonPlanController, LessonPlanController),
}

export default Professor