import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/batch-enrollment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::index
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:17
 * @route '/secretaria/batch-enrollment'
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
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::store
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:42
 * @route '/secretaria/batch-enrollment'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/secretaria/batch-enrollment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::store
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:42
 * @route '/secretaria/batch-enrollment'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::store
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:42
 * @route '/secretaria/batch-enrollment'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::store
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:42
 * @route '/secretaria/batch-enrollment'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Secretaria\BatchEnrollmentController::store
 * @see app/Http/Controllers/Secretaria/BatchEnrollmentController.php:42
 * @route '/secretaria/batch-enrollment'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const batchEnrollment = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default batchEnrollment