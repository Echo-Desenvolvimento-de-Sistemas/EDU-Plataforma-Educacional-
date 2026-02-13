import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
export const connect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connect.url(options),
    method: 'post',
})

connect.definition = {
    methods: ["post"],
    url: '/admin/settings/whatsapp/connect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
connect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connect.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
    const connectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: connect.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::connect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:149
 * @route '/admin/settings/whatsapp/connect'
 */
        connectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: connect.url(options),
            method: 'post',
        })
    
    connect.form = connectForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/admin/settings/whatsapp/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
    const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
        statusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::status
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:163
 * @route '/admin/settings/whatsapp/status'
 */
        statusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
export const disconnect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disconnect.url(options),
    method: 'post',
})

disconnect.definition = {
    methods: ["post"],
    url: '/admin/settings/whatsapp/disconnect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
disconnect.url = (options?: RouteQueryOptions) => {
    return disconnect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
disconnect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disconnect.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
    const disconnectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disconnect.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaSettingController::disconnect
 * @see app/Http/Controllers/Admin/AgendaSettingController.php:175
 * @route '/admin/settings/whatsapp/disconnect'
 */
        disconnectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disconnect.url(options),
            method: 'post',
        })
    
    disconnect.form = disconnectForm
const whatsapp = {
    connect: Object.assign(connect, connect),
status: Object.assign(status, status),
disconnect: Object.assign(disconnect, disconnect),
}

export default whatsapp