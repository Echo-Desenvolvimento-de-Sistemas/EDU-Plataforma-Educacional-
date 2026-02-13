import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/pre-registrations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::index
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:13
 * @route '/secretaria/pre-registrations'
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
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::store
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:37
 * @route '/secretaria/pre-registrations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/secretaria/pre-registrations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::store
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:37
 * @route '/secretaria/pre-registrations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::store
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:37
 * @route '/secretaria/pre-registrations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::store
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:37
 * @route '/secretaria/pre-registrations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::store
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:37
 * @route '/secretaria/pre-registrations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
export const show = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secretaria/pre-registrations/{pre_registration}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
show.url = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pre_registration: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pre_registration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pre_registration: args.pre_registration,
                }

    return show.definition.url
            .replace('{pre_registration}', parsedArgs.pre_registration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
show.get = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
show.head = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
    const showForm = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
        showForm.get = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::show
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:58
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
        showForm.head = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::destroy
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:70
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
export const destroy = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/secretaria/pre-registrations/{pre_registration}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::destroy
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:70
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
destroy.url = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pre_registration: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    pre_registration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pre_registration: args.pre_registration,
                }

    return destroy.definition.url
            .replace('{pre_registration}', parsedArgs.pre_registration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::destroy
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:70
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
destroy.delete = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::destroy
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:70
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
    const destroyForm = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Secretaria\PreRegistrationController::destroy
 * @see app/Http/Controllers/Secretaria/PreRegistrationController.php:70
 * @route '/secretaria/pre-registrations/{pre_registration}'
 */
        destroyForm.delete = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const preRegistrations = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
destroy: Object.assign(destroy, destroy),
}

export default preRegistrations