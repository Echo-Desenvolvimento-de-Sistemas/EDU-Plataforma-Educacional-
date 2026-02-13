import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\DashboardController::index
 * @see app/Http/Controllers/Secretaria/DashboardController.php:13
 * @route '/secretaria/dashboard'
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
const DashboardController = { index }

export default DashboardController