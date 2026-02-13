import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
const sendMessage90427c6af76e0706293c214cdecab40e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage90427c6af76e0706293c214cdecab40e.url(options),
    method: 'post',
})

sendMessage90427c6af76e0706293c214cdecab40e.definition = {
    methods: ["post"],
    url: '/professor/agenda/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
sendMessage90427c6af76e0706293c214cdecab40e.url = (options?: RouteQueryOptions) => {
    return sendMessage90427c6af76e0706293c214cdecab40e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
sendMessage90427c6af76e0706293c214cdecab40e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage90427c6af76e0706293c214cdecab40e.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
    const sendMessage90427c6af76e0706293c214cdecab40eForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendMessage90427c6af76e0706293c214cdecab40e.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
        sendMessage90427c6af76e0706293c214cdecab40eForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendMessage90427c6af76e0706293c214cdecab40e.url(options),
            method: 'post',
        })
    
    sendMessage90427c6af76e0706293c214cdecab40e.form = sendMessage90427c6af76e0706293c214cdecab40eForm
    /**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
const sendMessagee4bb6630adeed86f298781d2f14f6051 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessagee4bb6630adeed86f298781d2f14f6051.url(options),
    method: 'post',
})

sendMessagee4bb6630adeed86f298781d2f14f6051.definition = {
    methods: ["post"],
    url: '/admin/agenda/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
sendMessagee4bb6630adeed86f298781d2f14f6051.url = (options?: RouteQueryOptions) => {
    return sendMessagee4bb6630adeed86f298781d2f14f6051.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
sendMessagee4bb6630adeed86f298781d2f14f6051.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessagee4bb6630adeed86f298781d2f14f6051.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
    const sendMessagee4bb6630adeed86f298781d2f14f6051Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendMessagee4bb6630adeed86f298781d2f14f6051.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaController::sendMessage
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/admin/agenda/message'
 */
        sendMessagee4bb6630adeed86f298781d2f14f6051Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendMessagee4bb6630adeed86f298781d2f14f6051.url(options),
            method: 'post',
        })
    
    sendMessagee4bb6630adeed86f298781d2f14f6051.form = sendMessagee4bb6630adeed86f298781d2f14f6051Form

export const sendMessage = {
    '/professor/agenda/message': sendMessage90427c6af76e0706293c214cdecab40e,
    '/admin/agenda/message': sendMessagee4bb6630adeed86f298781d2f14f6051,
}

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
const AgendaController = { sendMessage, index, store }

export default AgendaController