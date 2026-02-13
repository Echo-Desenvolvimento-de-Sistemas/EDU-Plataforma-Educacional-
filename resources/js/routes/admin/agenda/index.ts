import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import users from './users'
/**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/agenda',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AgendaController::index
 * @see app/Http/Controllers/Admin/AgendaController.php:19
 * @route '/admin/agenda'
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
* @see \App\Http\Controllers\Admin\AgendaController::store
 * @see app/Http/Controllers/Admin/AgendaController.php:88
 * @route '/admin/agenda'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/agenda',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaController::store
 * @see app/Http/Controllers/Admin/AgendaController.php:88
 * @route '/admin/agenda'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaController::store
 * @see app/Http/Controllers/Admin/AgendaController.php:88
 * @route '/admin/agenda'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaController::store
 * @see app/Http/Controllers/Admin/AgendaController.php:88
 * @route '/admin/agenda'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaController::store
 * @see app/Http/Controllers/Admin/AgendaController.php:88
 * @route '/admin/agenda'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\AgendaController::send
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/admin/agenda/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaController::send
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaController::send
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaController::send
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaController::send
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
        sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(options),
            method: 'post',
        })
    
    send.form = sendForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/admin/agenda/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
    const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: settings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
        settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::settings
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
        settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    settings.form = settingsForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::update
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:75
 * @route '/admin/agenda/{channel}'
 */
export const update = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/agenda/{channel}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::update
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:75
 * @route '/admin/agenda/{channel}'
 */
update.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::update
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:75
 * @route '/admin/agenda/{channel}'
 */
update.put = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::update
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:75
 * @route '/admin/agenda/{channel}'
 */
    const updateForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::update
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:75
 * @route '/admin/agenda/{channel}'
 */
        updateForm.put = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:94
 * @route '/admin/agenda/{channel}'
 */
export const destroy = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/agenda/{channel}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:94
 * @route '/admin/agenda/{channel}'
 */
destroy.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:94
 * @route '/admin/agenda/{channel}'
 */
destroy.delete = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::destroy
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:94
 * @route '/admin/agenda/{channel}'
 */
    const destroyForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:94
 * @route '/admin/agenda/{channel}'
 */
        destroyForm.delete = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const agenda = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
send: Object.assign(send, send),
settings: Object.assign(settings, settings),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
users: Object.assign(users, users),
}

export default agenda