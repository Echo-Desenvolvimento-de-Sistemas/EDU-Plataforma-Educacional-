import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentController::index
 * @see app/Http/Controllers/Admin/DocumentController.php:25
 * @route '/admin/documents'
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
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/documents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentController::create
 * @see app/Http/Controllers/Admin/DocumentController.php:48
 * @route '/admin/documents/create'
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
* @see \App\Http\Controllers\Admin\DocumentController::store
 * @see app/Http/Controllers/Admin/DocumentController.php:66
 * @route '/admin/documents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DocumentController::store
 * @see app/Http/Controllers/Admin/DocumentController.php:66
 * @route '/admin/documents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentController::store
 * @see app/Http/Controllers/Admin/DocumentController.php:66
 * @route '/admin/documents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentController::store
 * @see app/Http/Controllers/Admin/DocumentController.php:66
 * @route '/admin/documents'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentController::store
 * @see app/Http/Controllers/Admin/DocumentController.php:66
 * @route '/admin/documents'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const documents = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default documents