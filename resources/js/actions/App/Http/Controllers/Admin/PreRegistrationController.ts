import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::batchMigrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:68
 * @route '/admin/pre-registrations/batch-migrate'
 */
export const batchMigrate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchMigrate.url(options),
    method: 'post',
})

batchMigrate.definition = {
    methods: ["post"],
    url: '/admin/pre-registrations/batch-migrate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::batchMigrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:68
 * @route '/admin/pre-registrations/batch-migrate'
 */
batchMigrate.url = (options?: RouteQueryOptions) => {
    return batchMigrate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::batchMigrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:68
 * @route '/admin/pre-registrations/batch-migrate'
 */
batchMigrate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchMigrate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::batchMigrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:68
 * @route '/admin/pre-registrations/batch-migrate'
 */
    const batchMigrateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: batchMigrate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::batchMigrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:68
 * @route '/admin/pre-registrations/batch-migrate'
 */
        batchMigrateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: batchMigrate.url(options),
            method: 'post',
        })
    
    batchMigrate.form = batchMigrateForm
/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::migrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:53
 * @route '/admin/pre-registrations/{id}/migrate'
 */
export const migrate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: migrate.url(args, options),
    method: 'post',
})

migrate.definition = {
    methods: ["post"],
    url: '/admin/pre-registrations/{id}/migrate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::migrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:53
 * @route '/admin/pre-registrations/{id}/migrate'
 */
migrate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return migrate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::migrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:53
 * @route '/admin/pre-registrations/{id}/migrate'
 */
migrate.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: migrate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::migrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:53
 * @route '/admin/pre-registrations/{id}/migrate'
 */
    const migrateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: migrate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::migrate
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:53
 * @route '/admin/pre-registrations/{id}/migrate'
 */
        migrateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: migrate.url(args, options),
            method: 'post',
        })
    
    migrate.form = migrateForm
/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pre-registrations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::index
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:13
 * @route '/admin/pre-registrations'
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
* @see \App\Http\Controllers\Admin\PreRegistrationController::store
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:97
 * @route '/admin/pre-registrations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pre-registrations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::store
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:97
 * @route '/admin/pre-registrations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::store
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:97
 * @route '/admin/pre-registrations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::store
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:97
 * @route '/admin/pre-registrations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::store
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:97
 * @route '/admin/pre-registrations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
 */
export const show = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/pre-registrations/{pre_registration}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
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
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
 */
show.get = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
 */
show.head = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
 */
    const showForm = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
 */
        showForm.get = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::show
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:118
 * @route '/admin/pre-registrations/{pre_registration}'
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
* @see \App\Http\Controllers\Admin\PreRegistrationController::destroy
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:130
 * @route '/admin/pre-registrations/{pre_registration}'
 */
export const destroy = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pre-registrations/{pre_registration}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PreRegistrationController::destroy
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:130
 * @route '/admin/pre-registrations/{pre_registration}'
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
* @see \App\Http\Controllers\Admin\PreRegistrationController::destroy
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:130
 * @route '/admin/pre-registrations/{pre_registration}'
 */
destroy.delete = (args: { pre_registration: string | number } | [pre_registration: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\PreRegistrationController::destroy
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:130
 * @route '/admin/pre-registrations/{pre_registration}'
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
* @see \App\Http\Controllers\Admin\PreRegistrationController::destroy
 * @see app/Http/Controllers/Admin/PreRegistrationController.php:130
 * @route '/admin/pre-registrations/{pre_registration}'
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
const PreRegistrationController = { batchMigrate, migrate, index, store, show, destroy }

export default PreRegistrationController