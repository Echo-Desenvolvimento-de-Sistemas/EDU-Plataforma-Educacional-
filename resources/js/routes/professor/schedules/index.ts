import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ClassScheduleController::index
 * @see app/Http/Controllers/Professor/ClassScheduleController.php:12
 * @route '/professor/schedules'
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
const schedules = {
    index: Object.assign(index, index),
}

export default schedules