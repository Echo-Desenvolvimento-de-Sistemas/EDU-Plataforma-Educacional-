import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/secret-data-import',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ImportController::create
 * @see app/Http/Controllers/Admin/ImportController.php:20
 * @route '/admin/secret-data-import'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\ImportController::store
 * @see app/Http/Controllers/Admin/ImportController.php:25
 * @route '/admin/secret-data-import'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/secret-data-import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ImportController::store
 * @see app/Http/Controllers/Admin/ImportController.php:25
 * @route '/admin/secret-data-import'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImportController::store
 * @see app/Http/Controllers/Admin/ImportController.php:25
 * @route '/admin/secret-data-import'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ImportController::store
 * @see app/Http/Controllers/Admin/ImportController.php:25
 * @route '/admin/secret-data-import'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ImportController::store
 * @see app/Http/Controllers/Admin/ImportController.php:25
 * @route '/admin/secret-data-import'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const importMethod = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default importMethod