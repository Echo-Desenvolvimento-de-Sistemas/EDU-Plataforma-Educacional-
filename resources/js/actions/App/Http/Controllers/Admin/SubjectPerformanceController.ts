import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
const indexe668a273243b9a3c807637bbe08dbaf0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe668a273243b9a3c807637bbe08dbaf0.url(options),
    method: 'get',
})

indexe668a273243b9a3c807637bbe08dbaf0.definition = {
    methods: ["get","head"],
    url: '/secretaria/subject-performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
indexe668a273243b9a3c807637bbe08dbaf0.url = (options?: RouteQueryOptions) => {
    return indexe668a273243b9a3c807637bbe08dbaf0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
indexe668a273243b9a3c807637bbe08dbaf0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe668a273243b9a3c807637bbe08dbaf0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
indexe668a273243b9a3c807637bbe08dbaf0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexe668a273243b9a3c807637bbe08dbaf0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
    const indexe668a273243b9a3c807637bbe08dbaf0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexe668a273243b9a3c807637bbe08dbaf0.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
        indexe668a273243b9a3c807637bbe08dbaf0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe668a273243b9a3c807637bbe08dbaf0.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/secretaria/subject-performance'
 */
        indexe668a273243b9a3c807637bbe08dbaf0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe668a273243b9a3c807637bbe08dbaf0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexe668a273243b9a3c807637bbe08dbaf0.form = indexe668a273243b9a3c807637bbe08dbaf0Form
    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
const index606222596ffe0ea05c0b7c59e7bd3beb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index606222596ffe0ea05c0b7c59e7bd3beb.url(options),
    method: 'get',
})

index606222596ffe0ea05c0b7c59e7bd3beb.definition = {
    methods: ["get","head"],
    url: '/admin/subject-performance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
index606222596ffe0ea05c0b7c59e7bd3beb.url = (options?: RouteQueryOptions) => {
    return index606222596ffe0ea05c0b7c59e7bd3beb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
index606222596ffe0ea05c0b7c59e7bd3beb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index606222596ffe0ea05c0b7c59e7bd3beb.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
index606222596ffe0ea05c0b7c59e7bd3beb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index606222596ffe0ea05c0b7c59e7bd3beb.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
    const index606222596ffe0ea05c0b7c59e7bd3bebForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index606222596ffe0ea05c0b7c59e7bd3beb.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
        index606222596ffe0ea05c0b7c59e7bd3bebForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index606222596ffe0ea05c0b7c59e7bd3beb.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::index
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:14
 * @route '/admin/subject-performance'
 */
        index606222596ffe0ea05c0b7c59e7bd3bebForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index606222596ffe0ea05c0b7c59e7bd3beb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index606222596ffe0ea05c0b7c59e7bd3beb.form = index606222596ffe0ea05c0b7c59e7bd3bebForm

export const index = {
    '/secretaria/subject-performance': indexe668a273243b9a3c807637bbe08dbaf0,
    '/admin/subject-performance': index606222596ffe0ea05c0b7c59e7bd3beb,
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
const show09dda5aa10303b629041ec7b7463c3af = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show09dda5aa10303b629041ec7b7463c3af.url(args, options),
    method: 'get',
})

show09dda5aa10303b629041ec7b7463c3af.definition = {
    methods: ["get","head"],
    url: '/secretaria/subject-performance/{subject}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
show09dda5aa10303b629041ec7b7463c3af.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show09dda5aa10303b629041ec7b7463c3af.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
show09dda5aa10303b629041ec7b7463c3af.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show09dda5aa10303b629041ec7b7463c3af.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
show09dda5aa10303b629041ec7b7463c3af.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show09dda5aa10303b629041ec7b7463c3af.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
    const show09dda5aa10303b629041ec7b7463c3afForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show09dda5aa10303b629041ec7b7463c3af.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
        show09dda5aa10303b629041ec7b7463c3afForm.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show09dda5aa10303b629041ec7b7463c3af.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/secretaria/subject-performance/{subject}'
 */
        show09dda5aa10303b629041ec7b7463c3afForm.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show09dda5aa10303b629041ec7b7463c3af.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show09dda5aa10303b629041ec7b7463c3af.form = show09dda5aa10303b629041ec7b7463c3afForm
    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
const showfd995f1ab3c48f55848936707eed1045 = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfd995f1ab3c48f55848936707eed1045.url(args, options),
    method: 'get',
})

showfd995f1ab3c48f55848936707eed1045.definition = {
    methods: ["get","head"],
    url: '/admin/subject-performance/{subject}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
showfd995f1ab3c48f55848936707eed1045.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showfd995f1ab3c48f55848936707eed1045.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
showfd995f1ab3c48f55848936707eed1045.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfd995f1ab3c48f55848936707eed1045.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
showfd995f1ab3c48f55848936707eed1045.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showfd995f1ab3c48f55848936707eed1045.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
    const showfd995f1ab3c48f55848936707eed1045Form = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showfd995f1ab3c48f55848936707eed1045.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
        showfd995f1ab3c48f55848936707eed1045Form.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showfd995f1ab3c48f55848936707eed1045.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SubjectPerformanceController::show
 * @see app/Http/Controllers/Admin/SubjectPerformanceController.php:50
 * @route '/admin/subject-performance/{subject}'
 */
        showfd995f1ab3c48f55848936707eed1045Form.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showfd995f1ab3c48f55848936707eed1045.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showfd995f1ab3c48f55848936707eed1045.form = showfd995f1ab3c48f55848936707eed1045Form

export const show = {
    '/secretaria/subject-performance/{subject}': show09dda5aa10303b629041ec7b7463c3af,
    '/admin/subject-performance/{subject}': showfd995f1ab3c48f55848936707eed1045,
}

const SubjectPerformanceController = { index, show }

export default SubjectPerformanceController