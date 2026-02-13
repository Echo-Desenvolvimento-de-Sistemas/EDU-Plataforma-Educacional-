import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ReportController::index
 * @see app/Http/Controllers/Professor/ReportController.php:14
 * @route '/professor/reports'
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
const ReportController = { index }

export default ReportController