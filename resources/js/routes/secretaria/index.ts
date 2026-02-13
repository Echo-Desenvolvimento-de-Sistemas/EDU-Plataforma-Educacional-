import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import users from './users'
import preRegistrations from './pre-registrations'
import grades from './grades'
import attendance from './attendance'
import batchEnrollment from './batch-enrollment'
import subjectPerformance from './subject-performance'
import planning from './planning'
/**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/secretaria/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\DashboardController::dashboard
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
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
const secretaria = {
    dashboard: Object.assign(dashboard, dashboard),
users: Object.assign(users, users),
preRegistrations: Object.assign(preRegistrations, preRegistrations),
grades: Object.assign(grades, grades),
attendance: Object.assign(attendance, attendance),
batchEnrollment: Object.assign(batchEnrollment, batchEnrollment),
subjectPerformance: Object.assign(subjectPerformance, subjectPerformance),
planning: Object.assign(planning, planning),
}

export default secretaria