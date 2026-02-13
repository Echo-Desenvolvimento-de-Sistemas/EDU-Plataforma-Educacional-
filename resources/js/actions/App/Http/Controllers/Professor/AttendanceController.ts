import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
export const create = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/professor/classes/{classRoom}/attendance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
create.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
create.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
create.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
    const createForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
        createForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\AttendanceController::create
 * @see app/Http/Controllers/Professor/AttendanceController.php:21
 * @route '/professor/classes/{classRoom}/attendance/create'
 */
        createForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Professor\AttendanceController::store
 * @see app/Http/Controllers/Professor/AttendanceController.php:107
 * @route '/professor/classes/{classRoom}/attendance'
 */
export const store = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/professor/classes/{classRoom}/attendance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\AttendanceController::store
 * @see app/Http/Controllers/Professor/AttendanceController.php:107
 * @route '/professor/classes/{classRoom}/attendance'
 */
store.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\AttendanceController::store
 * @see app/Http/Controllers/Professor/AttendanceController.php:107
 * @route '/professor/classes/{classRoom}/attendance'
 */
store.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\AttendanceController::store
 * @see app/Http/Controllers/Professor/AttendanceController.php:107
 * @route '/professor/classes/{classRoom}/attendance'
 */
    const storeForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\AttendanceController::store
 * @see app/Http/Controllers/Professor/AttendanceController.php:107
 * @route '/professor/classes/{classRoom}/attendance'
 */
        storeForm.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const AttendanceController = { create, store }

export default AttendanceController