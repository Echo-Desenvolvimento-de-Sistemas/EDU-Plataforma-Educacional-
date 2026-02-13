import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import documents from './documents'
import grades from './grades'
import attendance from './attendance'
import schedules from './schedules'
import activities from './activities'
/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/aluno/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
 * @see app/Http/Controllers/Student/DashboardController.php:12
 * @route '/aluno/dashboard'
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
const aluno = {
    dashboard: Object.assign(dashboard, dashboard),
documents: Object.assign(documents, documents),
grades: Object.assign(grades, grades),
attendance: Object.assign(attendance, attendance),
schedules: Object.assign(schedules, schedules),
activities: Object.assign(activities, activities),
}

export default aluno