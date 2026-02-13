import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
export const show = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/professor/classes/{classRoom}/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
show.url = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    classRoom: args[0],
                    student: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classRoom: typeof args.classRoom === 'object'
                ? args.classRoom.id
                : args.classRoom,
                                student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return show.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
show.get = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
show.head = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
    const showForm = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
        showForm.get = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:150
 * @route '/professor/classes/{classRoom}/students/{student}'
 */
        showForm.head = (args: { classRoom: number | { id: number }, student: number | { id: number } } | [classRoom: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const student = {
    show: Object.assign(show, show),
}

export default student