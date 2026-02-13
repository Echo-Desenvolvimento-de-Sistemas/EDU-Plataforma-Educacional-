import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/gamification/sso',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GamificationAuthController::redirect
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
const GamificationAuthController = { redirect }

export default GamificationAuthController