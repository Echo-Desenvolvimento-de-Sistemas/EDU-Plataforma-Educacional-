import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/pre-matricula/sucesso',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:273
 * @route '/pre-matricula/sucesso'
 */
        successForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    success.form = successForm
/**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
export const show = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/pre-matricula/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
show.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return show.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
show.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
show.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
    const showForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
        showForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\PreRegistrationController::show
 * @see app/Http/Controllers/Public/PreRegistrationController.php:17
 * @route '/pre-matricula/{token}'
 */
        showForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Public\PreRegistrationController::store
 * @see app/Http/Controllers/Public/PreRegistrationController.php:92
 * @route '/pre-matricula/{token}'
 */
export const store = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pre-matricula/{token}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Public\PreRegistrationController::store
 * @see app/Http/Controllers/Public/PreRegistrationController.php:92
 * @route '/pre-matricula/{token}'
 */
store.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return store.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\PreRegistrationController::store
 * @see app/Http/Controllers/Public/PreRegistrationController.php:92
 * @route '/pre-matricula/{token}'
 */
store.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Public\PreRegistrationController::store
 * @see app/Http/Controllers/Public/PreRegistrationController.php:92
 * @route '/pre-matricula/{token}'
 */
    const storeForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Public\PreRegistrationController::store
 * @see app/Http/Controllers/Public/PreRegistrationController.php:92
 * @route '/pre-matricula/{token}'
 */
        storeForm.post = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const preRegistration = {
    success: Object.assign(success, success),
show: Object.assign(show, show),
store: Object.assign(store, store),
}

export default preRegistration