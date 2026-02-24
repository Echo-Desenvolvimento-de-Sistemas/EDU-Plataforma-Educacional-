import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import classes from './classes'
import assessments from './assessments'
import grades from './grades'
import agenda from './agenda'
import activities from './activities'
import questionBanks from './question-banks'
import questions from './questions'
import planning from './planning'
import schedules from './schedules'
/**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/professor/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\DashboardController::dashboard
 * @see app/Http/Controllers/Professor/DashboardController.php:12
 * @route '/professor/dashboard'
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
/**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/professor/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ReportController::reports
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
/**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
export const manual = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manual.url(options),
    method: 'get',
})

manual.definition = {
    methods: ["get","head"],
    url: '/professor/manual',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
manual.url = (options?: RouteQueryOptions) => {
    return manual.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
manual.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manual.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
manual.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manual.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
    const manualForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manual.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
        manualForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manual.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:131
 * @route '/professor/manual'
 */
        manualForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manual.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manual.form = manualForm
const professor = {
    dashboard: Object.assign(dashboard, dashboard),
classes: Object.assign(classes, classes),
assessments: Object.assign(assessments, assessments),
grades: Object.assign(grades, grades),
reports: Object.assign(reports, reports),
manual: Object.assign(manual, manual),
agenda: Object.assign(agenda, agenda),
activities: Object.assign(activities, activities),
questionBanks: Object.assign(questionBanks, questionBanks),
questions: Object.assign(questions, questions),
planning: Object.assign(planning, planning),
schedules: Object.assign(schedules, schedules),
}

export default professor