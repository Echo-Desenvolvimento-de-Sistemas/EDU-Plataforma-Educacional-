import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
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
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
export const show = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades/{classRoom}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
show.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classRoom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classRoom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classRoom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classRoom: typeof args.classRoom === 'object'
                ? args.classRoom.id
                : args.classRoom,
                }

    return show.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
show.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
show.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
    const showForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
        showForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
        showForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
export const reportCard = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCard.url(args, options),
    method: 'get',
})

reportCard.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades/student/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
reportCard.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return reportCard.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
reportCard.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
reportCard.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportCard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
    const reportCardForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reportCard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
        reportCardForm.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
        reportCardForm.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reportCard.form = reportCardForm
const GradeController = { index, show, reportCard }

export default GradeController