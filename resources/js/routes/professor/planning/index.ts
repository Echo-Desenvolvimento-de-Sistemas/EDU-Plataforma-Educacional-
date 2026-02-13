import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/planning',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::index
 * @see app/Http/Controllers/Professor/LessonPlanController.php:20
 * @route '/professor/planning'
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
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/professor/planning/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::create
 * @see app/Http/Controllers/Professor/LessonPlanController.php:32
 * @route '/professor/planning/create'
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
* @see \App\Http\Controllers\Professor\LessonPlanController::store
 * @see app/Http/Controllers/Professor/LessonPlanController.php:57
 * @route '/professor/planning'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/professor/planning',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::store
 * @see app/Http/Controllers/Professor/LessonPlanController.php:57
 * @route '/professor/planning'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::store
 * @see app/Http/Controllers/Professor/LessonPlanController.php:57
 * @route '/professor/planning'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::store
 * @see app/Http/Controllers/Professor/LessonPlanController.php:57
 * @route '/professor/planning'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::store
 * @see app/Http/Controllers/Professor/LessonPlanController.php:57
 * @route '/professor/planning'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
export const show = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/professor/planning/{planning}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
show.url = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { planning: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    planning: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        planning: args.planning,
                }

    return show.definition.url
            .replace('{planning}', parsedArgs.planning.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
show.get = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
show.head = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
    const showForm = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
        showForm.get = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::show
 * @see app/Http/Controllers/Professor/LessonPlanController.php:0
 * @route '/professor/planning/{planning}'
 */
        showForm.head = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
export const edit = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/professor/planning/{planning}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
edit.url = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { planning: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    planning: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        planning: args.planning,
                }

    return edit.definition.url
            .replace('{planning}', parsedArgs.planning.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
edit.get = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
edit.head = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
    const editForm = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
        editForm.get = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::edit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:78
 * @route '/professor/planning/{planning}/edit'
 */
        editForm.head = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
export const update = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/professor/planning/{planning}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
update.url = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { planning: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    planning: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        planning: args.planning,
                }

    return update.definition.url
            .replace('{planning}', parsedArgs.planning.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
update.put = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
update.patch = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
    const updateForm = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
        updateForm.put = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::update
 * @see app/Http/Controllers/Professor/LessonPlanController.php:108
 * @route '/professor/planning/{planning}'
 */
        updateForm.patch = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Professor\LessonPlanController::destroy
 * @see app/Http/Controllers/Professor/LessonPlanController.php:141
 * @route '/professor/planning/{planning}'
 */
export const destroy = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/professor/planning/{planning}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::destroy
 * @see app/Http/Controllers/Professor/LessonPlanController.php:141
 * @route '/professor/planning/{planning}'
 */
destroy.url = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { planning: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    planning: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        planning: args.planning,
                }

    return destroy.definition.url
            .replace('{planning}', parsedArgs.planning.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::destroy
 * @see app/Http/Controllers/Professor/LessonPlanController.php:141
 * @route '/professor/planning/{planning}'
 */
destroy.delete = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::destroy
 * @see app/Http/Controllers/Professor/LessonPlanController.php:141
 * @route '/professor/planning/{planning}'
 */
    const destroyForm = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::destroy
 * @see app/Http/Controllers/Professor/LessonPlanController.php:141
 * @route '/professor/planning/{planning}'
 */
        destroyForm.delete = (args: { planning: string | number } | [planning: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Professor\LessonPlanController::submit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:130
 * @route '/professor/planning/{plan}/submit'
 */
export const submit = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/professor/planning/{plan}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::submit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:130
 * @route '/professor/planning/{plan}/submit'
 */
submit.url = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { plan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: typeof args.plan === 'object'
                ? args.plan.id
                : args.plan,
                }

    return submit.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\LessonPlanController::submit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:130
 * @route '/professor/planning/{plan}/submit'
 */
submit.post = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\LessonPlanController::submit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:130
 * @route '/professor/planning/{plan}/submit'
 */
    const submitForm = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\LessonPlanController::submit
 * @see app/Http/Controllers/Professor/LessonPlanController.php:130
 * @route '/professor/planning/{plan}/submit'
 */
        submitForm.post = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
const planning = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
submit: Object.assign(submit, submit),
}

export default planning