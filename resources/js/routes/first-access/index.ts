import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/first-access',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FirstAccessController::index
 * @see app/Http/Controllers/FirstAccessController.php:13
 * @route '/first-access'
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
* @see \App\Http\Controllers\FirstAccessController::store
 * @see app/Http/Controllers/FirstAccessController.php:20
 * @route '/first-access'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/first-access',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FirstAccessController::store
 * @see app/Http/Controllers/FirstAccessController.php:20
 * @route '/first-access'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FirstAccessController::store
 * @see app/Http/Controllers/FirstAccessController.php:20
 * @route '/first-access'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FirstAccessController::store
 * @see app/Http/Controllers/FirstAccessController.php:20
 * @route '/first-access'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FirstAccessController::store
 * @see app/Http/Controllers/FirstAccessController.php:20
 * @route '/first-access'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const firstAccess = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default firstAccess