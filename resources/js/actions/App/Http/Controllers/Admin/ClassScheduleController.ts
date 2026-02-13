import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/class-schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::index
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:14
 * @route '/admin/class-schedules'
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
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
export const getByClass = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByClass.url(args, options),
    method: 'get',
})

getByClass.definition = {
    methods: ["get","head"],
    url: '/admin/class-schedules/{classRoom}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
getByClass.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getByClass.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
getByClass.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByClass.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
getByClass.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByClass.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
    const getByClassForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getByClass.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
        getByClassForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByClass.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::getByClass
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:32
 * @route '/admin/class-schedules/{classRoom}'
 */
        getByClassForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getByClass.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getByClass.form = getByClassForm
/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::store
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:43
 * @route '/admin/class-schedules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/class-schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::store
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:43
 * @route '/admin/class-schedules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::store
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:43
 * @route '/admin/class-schedules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::store
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:43
 * @route '/admin/class-schedules'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::store
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:43
 * @route '/admin/class-schedules'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::destroy
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:58
 * @route '/admin/class-schedules/{schedule}'
 */
export const destroy = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/class-schedules/{schedule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::destroy
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:58
 * @route '/admin/class-schedules/{schedule}'
 */
destroy.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return destroy.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassScheduleController::destroy
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:58
 * @route '/admin/class-schedules/{schedule}'
 */
destroy.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::destroy
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:58
 * @route '/admin/class-schedules/{schedule}'
 */
    const destroyForm = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassScheduleController::destroy
 * @see app/Http/Controllers/Admin/ClassScheduleController.php:58
 * @route '/admin/class-schedules/{schedule}'
 */
        destroyForm.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ClassScheduleController = { index, getByClass, store, destroy }

export default ClassScheduleController