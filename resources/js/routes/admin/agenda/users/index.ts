import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
export const store = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/agenda/{channel}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
store.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
store.post = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
    const storeForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::store
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
        storeForm.post = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
export const destroy = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/agenda/{channel}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
destroy.url = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: typeof args.channel === 'object'
                ? args.channel.id
                : args.channel,
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return destroy.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
destroy.delete = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
    const destroyForm = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
        destroyForm.delete = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const users = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default users