import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import student from './student'
import attendance from './attendance'
/**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/classes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ClassRoomController::index
 * @see app/Http/Controllers/Professor/ClassRoomController.php:18
 * @route '/professor/classes'
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
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
 */
export const show = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/professor/classes/{classRoom}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
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
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
 */
show.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
 */
show.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
 */
    const showForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
 */
        showForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ClassRoomController::show
 * @see app/Http/Controllers/Professor/ClassRoomController.php:71
 * @route '/professor/classes/{classRoom}'
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
const classes = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
student: Object.assign(student, student),
attendance: Object.assign(attendance, attendance),
}

export default classes