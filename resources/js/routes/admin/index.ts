import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import subjectPerformance from './subject-performance'
import academicYears from './academic-years'
import gradingPeriods from './grading-periods'
import educationLevels from './education-levels'
import grades from './grades'
import subjects from './subjects'
import classRooms from './class-rooms'
import guardians from './guardians'
import students from './students'
import preRegistrations from './pre-registrations'
import users from './users'
import api from './api'
import settings from './settings'
import gamification from './gamification'
import documentTemplates from './document-templates'
import documents from './documents'
import agenda from './agenda'
import ensalamento from './ensalamento'
import studentGrades from './student-grades'
import attendance from './attendance'
import classSchedules from './class-schedules'
import kanban from './kanban'
import planning from './planning'
import importMethod from './import'
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:16
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
subjectPerformance: Object.assign(subjectPerformance, subjectPerformance),
academicYears: Object.assign(academicYears, academicYears),
gradingPeriods: Object.assign(gradingPeriods, gradingPeriods),
educationLevels: Object.assign(educationLevels, educationLevels),
grades: Object.assign(grades, grades),
subjects: Object.assign(subjects, subjects),
classRooms: Object.assign(classRooms, classRooms),
guardians: Object.assign(guardians, guardians),
students: Object.assign(students, students),
preRegistrations: Object.assign(preRegistrations, preRegistrations),
users: Object.assign(users, users),
api: Object.assign(api, api),
settings: Object.assign(settings, settings),
gamification: Object.assign(gamification, gamification),
documentTemplates: Object.assign(documentTemplates, documentTemplates),
documents: Object.assign(documents, documents),
agenda: Object.assign(agenda, agenda),
ensalamento: Object.assign(ensalamento, ensalamento),
studentGrades: Object.assign(studentGrades, studentGrades),
attendance: Object.assign(attendance, attendance),
classSchedules: Object.assign(classSchedules, classSchedules),
kanban: Object.assign(kanban, kanban),
planning: Object.assign(planning, planning),
import: Object.assign(importMethod, importMethod),
}

export default admin