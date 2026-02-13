import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/subject-performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
export const show = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secretaria/subject-performance/{subject}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
show.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subject: typeof args.subject === 'object'
                ? args.subject.id
                : args.subject,
                }

    return show.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
show.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
show.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
    const showForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
        showForm.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
        showForm.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const subjectPerformance = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default subjectPerformance