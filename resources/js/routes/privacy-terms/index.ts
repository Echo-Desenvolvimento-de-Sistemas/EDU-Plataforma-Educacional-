import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/termos-e-privacidade',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\PrivacyTermsController::index
 * @see app/Http/Controllers/Public/PrivacyTermsController.php:10
 * @route '/termos-e-privacidade'
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
const privacyTerms = {
    index: Object.assign(index, index),
}

export default privacyTerms