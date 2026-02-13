import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
export const verify = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/magic-login/{user}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
verify.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: args.user,
                }

    return verify.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
verify.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
verify.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
    const verifyForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
        verifyForm.get = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\MagicLoginController::verify
 * @see app/Http/Controllers/Auth/MagicLoginController.php:12
 * @route '/magic-login/{user}'
 */
        verifyForm.head = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify.form = verifyForm
const MagicLoginController = { verify }

export default MagicLoginController