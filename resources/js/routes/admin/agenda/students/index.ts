import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:121
 * @route '/admin/agenda/{channel}/students'
 */
export const store = (args: { channel: string | { id: string } } | [channel: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/agenda/{channel}/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:121
 * @route '/admin/agenda/{channel}/students'
 */
store.url = (args: { channel: string | { id: string } } | [channel: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channel: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { channel: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: typeof args.channel === 'object'
                ? args.channel.id
                : args.channel,
                }

    return store.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:121
 * @route '/admin/agenda/{channel}/students'
 */
store.post = (args: { channel: string | { id: string } } | [channel: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:121
 * @route '/admin/agenda/{channel}/students'
 */
    const storeForm = (args: { channel: string | { id: string } } | [channel: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:121
 * @route '/admin/agenda/{channel}/students'
 */
        storeForm.post = (args: { channel: string | { id: string } } | [channel: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:137
 * @route '/admin/agenda/{channel}/students/{student}'
 */
export const destroy = (args: { channel: string | { id: string }, student: number | { id: number } } | [channel: string | { id: string }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/agenda/{channel}/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:137
 * @route '/admin/agenda/{channel}/students/{student}'
 */
destroy.url = (args: { channel: string | { id: string }, student: number | { id: number } } | [channel: string | { id: string }, student: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                    student: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: typeof args.channel === 'object'
                ? args.channel.id
                : args.channel,
                                student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return destroy.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:137
 * @route '/admin/agenda/{channel}/students/{student}'
 */
destroy.delete = (args: { channel: string | { id: string }, student: number | { id: number } } | [channel: string | { id: string }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:137
 * @route '/admin/agenda/{channel}/students/{student}'
 */
    const destroyForm = (args: { channel: string | { id: string }, student: number | { id: number } } | [channel: string | { id: string }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:137
 * @route '/admin/agenda/{channel}/students/{student}'
 */
        destroyForm.delete = (args: { channel: string | { id: string }, student: number | { id: number } } | [channel: string | { id: string }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const students = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default students