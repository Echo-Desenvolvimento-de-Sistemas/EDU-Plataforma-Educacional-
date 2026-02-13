import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/ensalamento',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::index
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:15
 * @route '/admin/ensalamento'
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
* @see \App\Http\Controllers\Admin\EnsalamentoController::store
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:55
 * @route '/admin/ensalamento'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/ensalamento',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::store
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:55
 * @route '/admin/ensalamento'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::store
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:55
 * @route '/admin/ensalamento'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::store
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:55
 * @route '/admin/ensalamento'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::store
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:55
 * @route '/admin/ensalamento'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::destroy
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:70
 * @route '/admin/ensalamento'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/ensalamento',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::destroy
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:70
 * @route '/admin/ensalamento'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EnsalamentoController::destroy
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:70
 * @route '/admin/ensalamento'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::destroy
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:70
 * @route '/admin/ensalamento'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EnsalamentoController::destroy
 * @see app/Http/Controllers/Admin/EnsalamentoController.php:70
 * @route '/admin/ensalamento'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ensalamento = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default ensalamento