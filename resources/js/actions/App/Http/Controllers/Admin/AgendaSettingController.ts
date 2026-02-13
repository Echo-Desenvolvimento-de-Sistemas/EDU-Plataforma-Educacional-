import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
export const connectWhatsapp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connectWhatsapp.url(options),
    method: 'post',
})

connectWhatsapp.definition = {
    methods: ["post"],
    url: '/admin/settings/whatsapp/connect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
connectWhatsapp.url = (options?: RouteQueryOptions) => {
    return connectWhatsapp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
connectWhatsapp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connectWhatsapp.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
    const connectWhatsappForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: connectWhatsapp.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
        connectWhatsappForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: connectWhatsapp.url(options),
            method: 'post',
        })
    
    connectWhatsapp.form = connectWhatsappForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
export const checkWhatsappStatus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkWhatsappStatus.url(options),
    method: 'get',
})

checkWhatsappStatus.definition = {
    methods: ["get","head"],
    url: '/admin/settings/whatsapp/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
checkWhatsappStatus.url = (options?: RouteQueryOptions) => {
    return checkWhatsappStatus.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
checkWhatsappStatus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkWhatsappStatus.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
checkWhatsappStatus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkWhatsappStatus.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
    const checkWhatsappStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkWhatsappStatus.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
        checkWhatsappStatusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkWhatsappStatus.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::checkWhatsappStatus
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
        checkWhatsappStatusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkWhatsappStatus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkWhatsappStatus.form = checkWhatsappStatusForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
export const disconnectWhatsapp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disconnectWhatsapp.url(options),
    method: 'post',
})

disconnectWhatsapp.definition = {
    methods: ["post"],
    url: '/admin/settings/whatsapp/disconnect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
disconnectWhatsapp.url = (options?: RouteQueryOptions) => {
    return disconnectWhatsapp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
disconnectWhatsapp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disconnectWhatsapp.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
    const disconnectWhatsappForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disconnectWhatsapp.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnectWhatsapp
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
        disconnectWhatsappForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disconnectWhatsapp.url(options),
            method: 'post',
        })
    
    disconnectWhatsapp.form = disconnectWhatsappForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/agenda/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::index
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:14
 * @route '/admin/agenda/settings'
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
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::attachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
export const attachUser = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachUser.url(args, options),
    method: 'post',
})

attachUser.definition = {
    methods: ["post"],
    url: '/admin/agenda/{channel}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::attachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
attachUser.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attachUser.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::attachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
attachUser.post = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachUser.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::attachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
    const attachUserForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: attachUser.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::attachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:101
 * @route '/admin/agenda/{channel}/users'
 */
        attachUserForm.post = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: attachUser.url(args, options),
            method: 'post',
        })
    
    attachUser.form = attachUserForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::detachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
export const detachUser = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachUser.url(args, options),
    method: 'delete',
})

detachUser.definition = {
    methods: ["delete"],
    url: '/admin/agenda/{channel}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::detachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
detachUser.url = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return detachUser.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::detachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
detachUser.delete = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachUser.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::detachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
    const detachUserForm = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: detachUser.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::detachUser
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:113
 * @route '/admin/agenda/{channel}/users/{user}'
 */
        detachUserForm.delete = (args: { channel: number | { id: number }, user: number | { id: number } } | [channel: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: detachUser.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    detachUser.form = detachUserForm
const AgendaSettingController = { connectWhatsapp, checkWhatsappStatus, disconnectWhatsapp, index, update, destroy, attachUser, detachUser }

export default AgendaSettingController