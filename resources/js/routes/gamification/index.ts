import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
export const sso = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sso.url(options),
    method: 'get',
})

sso.definition = {
    methods: ["get","head"],
    url: '/gamification/sso',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
sso.url = (options?: RouteQueryOptions) => {
    return sso.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
sso.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sso.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
sso.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sso.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
    const ssoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sso.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
        ssoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sso.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GamificationAuthController::sso
 * @see app/Http/Controllers/GamificationAuthController.php:11
 * @route '/gamification/sso'
 */
        ssoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sso.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sso.form = ssoForm
const gamification = {
    sso: Object.assign(sso, sso),
}

export default gamification