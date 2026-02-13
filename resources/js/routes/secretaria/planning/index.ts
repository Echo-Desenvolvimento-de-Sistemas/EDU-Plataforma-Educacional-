import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/planning',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
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
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
export const show = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secretaria/planning/{lessonPlan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
show.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return show.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
show.get = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
show.head = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
    const showForm = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
        showForm.get = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
        showForm.head = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
export const approve = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/secretaria/planning/{lessonPlan}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
approve.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return approve.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
approve.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
    const approveForm = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
        approveForm.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
export const requestChanges = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestChanges.url(args, options),
    method: 'post',
})

requestChanges.definition = {
    methods: ["post"],
    url: '/secretaria/planning/{lessonPlan}/request-changes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
requestChanges.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return requestChanges.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
requestChanges.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestChanges.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
    const requestChangesForm = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: requestChanges.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
        requestChangesForm.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: requestChanges.url(args, options),
            method: 'post',
        })
    
    requestChanges.form = requestChangesForm
const planning = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
approve: Object.assign(approve, approve),
requestChanges: Object.assign(requestChanges, requestChanges),
}

export default planning