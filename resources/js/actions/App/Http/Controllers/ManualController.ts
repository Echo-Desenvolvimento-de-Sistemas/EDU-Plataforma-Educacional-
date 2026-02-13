import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manual',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ManualController::index
 * @see app/Http/Controllers/ManualController.php:11
 * @route '/manual'
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
const ManualController = { index }

export default ManualController