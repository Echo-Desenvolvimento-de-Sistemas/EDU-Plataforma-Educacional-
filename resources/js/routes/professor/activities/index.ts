import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ActivityController::index
 * @see app/Http/Controllers/Professor/ActivityController.php:14
 * @route '/professor/activities'
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
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/professor/activities/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ActivityController::create
 * @see app/Http/Controllers/Professor/ActivityController.php:26
 * @route '/professor/activities/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Professor\ActivityController::store
 * @see app/Http/Controllers/Professor/ActivityController.php:39
 * @route '/professor/activities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/professor/activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::store
 * @see app/Http/Controllers/Professor/ActivityController.php:39
 * @route '/professor/activities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::store
 * @see app/Http/Controllers/Professor/ActivityController.php:39
 * @route '/professor/activities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::store
 * @see app/Http/Controllers/Professor/ActivityController.php:39
 * @route '/professor/activities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::store
 * @see app/Http/Controllers/Professor/ActivityController.php:39
 * @route '/professor/activities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
export const show = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/professor/activities/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
show.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return show.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
show.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
show.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
    const showForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
        showForm.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ActivityController::show
 * @see app/Http/Controllers/Professor/ActivityController.php:80
 * @route '/professor/activities/{activity}'
 */
        showForm.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
export const edit = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/professor/activities/{activity}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
edit.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return edit.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
edit.get = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
edit.head = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
    const editForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
        editForm.get = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\ActivityController::edit
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}/edit'
 */
        editForm.head = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
export const update = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/professor/activities/{activity}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
update.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return update.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
update.put = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
update.patch = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
    const updateForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
        updateForm.put = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Professor\ActivityController::update
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
        updateForm.patch = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Professor\ActivityController::destroy
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
export const destroy = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/professor/activities/{activity}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Professor\ActivityController::destroy
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
destroy.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return destroy.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\ActivityController::destroy
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
destroy.delete = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Professor\ActivityController::destroy
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
    const destroyForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\ActivityController::destroy
 * @see app/Http/Controllers/Professor/ActivityController.php:0
 * @route '/professor/activities/{activity}'
 */
        destroyForm.delete = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const activities = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default activities