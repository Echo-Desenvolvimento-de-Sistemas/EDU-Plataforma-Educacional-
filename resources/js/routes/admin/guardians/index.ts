import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import students from './students'
import user from './user'
/**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/guardians',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::index
 * @see app/Http/Controllers/Admin/GuardianController.php:15
 * @route '/admin/guardians'
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
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/guardians/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::create
 * @see app/Http/Controllers/Admin/GuardianController.php:36
 * @route '/admin/guardians/create'
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
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:44
 * @route '/admin/guardians'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/guardians',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:44
 * @route '/admin/guardians'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:44
 * @route '/admin/guardians'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:44
 * @route '/admin/guardians'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:44
 * @route '/admin/guardians'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
export const show = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/guardians/{guardian}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
show.url = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: args.guardian,
                }

    return show.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
show.get = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
show.head = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
    const showForm = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
        showForm.get = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::show
 * @see app/Http/Controllers/Admin/GuardianController.php:0
 * @route '/admin/guardians/{guardian}'
 */
        showForm.head = (args: { guardian: string | number } | [guardian: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
export const edit = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/guardians/{guardian}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
edit.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guardian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                }

    return edit.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
edit.get = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
edit.head = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
    const editForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
        editForm.get = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::edit
 * @see app/Http/Controllers/Admin/GuardianController.php:78
 * @route '/admin/guardians/{guardian}/edit'
 */
        editForm.head = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
export const update = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/guardians/{guardian}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
update.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guardian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                }

    return update.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
update.put = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
update.patch = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
    const updateForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
        updateForm.put = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::update
 * @see app/Http/Controllers/Admin/GuardianController.php:88
 * @route '/admin/guardians/{guardian}'
 */
        updateForm.patch = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:107
 * @route '/admin/guardians/{guardian}'
 */
export const destroy = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/guardians/{guardian}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:107
 * @route '/admin/guardians/{guardian}'
 */
destroy.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guardian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                }

    return destroy.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:107
 * @route '/admin/guardians/{guardian}'
 */
destroy.delete = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:107
 * @route '/admin/guardians/{guardian}'
 */
    const destroyForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:107
 * @route '/admin/guardians/{guardian}'
 */
        destroyForm.delete = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GuardianController::toggleStatus
 * @see app/Http/Controllers/Admin/GuardianController.php:143
 * @route '/admin/guardians/{guardian}/toggle-status'
 */
export const toggleStatus = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/admin/guardians/{guardian}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::toggleStatus
 * @see app/Http/Controllers/Admin/GuardianController.php:143
 * @route '/admin/guardians/{guardian}/toggle-status'
 */
toggleStatus.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guardian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                }

    return toggleStatus.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::toggleStatus
 * @see app/Http/Controllers/Admin/GuardianController.php:143
 * @route '/admin/guardians/{guardian}/toggle-status'
 */
toggleStatus.patch = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::toggleStatus
 * @see app/Http/Controllers/Admin/GuardianController.php:143
 * @route '/admin/guardians/{guardian}/toggle-status'
 */
    const toggleStatusForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::toggleStatus
 * @see app/Http/Controllers/Admin/GuardianController.php:143
 * @route '/admin/guardians/{guardian}/toggle-status'
 */
        toggleStatusForm.patch = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const guardians = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
students: Object.assign(students, students),
toggleStatus: Object.assign(toggleStatus, toggleStatus),
user: Object.assign(user, user),
}

export default guardians