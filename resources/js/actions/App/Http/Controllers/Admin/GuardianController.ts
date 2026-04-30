import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\GuardianController::attachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
export const attachStudent = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachStudent.url(args, options),
    method: 'post',
})

attachStudent.definition = {
    methods: ["post"],
    url: '/admin/guardians/{guardian}/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::attachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
attachStudent.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attachStudent.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::attachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
attachStudent.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attachStudent.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::attachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
    const attachStudentForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: attachStudent.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::attachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
        attachStudentForm.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: attachStudent.url(args, options),
            method: 'post',
        })
    
    attachStudent.form = attachStudentForm
/**
* @see \App\Http\Controllers\Admin\GuardianController::detachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
export const detachStudent = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachStudent.url(args, options),
    method: 'delete',
})

detachStudent.definition = {
    methods: ["delete"],
    url: '/admin/guardians/{guardian}/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::detachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
detachStudent.url = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                    student: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                                student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return detachStudent.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::detachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
detachStudent.delete = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: detachStudent.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::detachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
    const detachStudentForm = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: detachStudent.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::detachStudent
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
        detachStudentForm.delete = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: detachStudent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    detachStudent.form = detachStudentForm
/**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
export const getStudentsByClass = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByClass.url(args, options),
    method: 'get',
})

getStudentsByClass.definition = {
    methods: ["get","head"],
    url: '/admin/api/classes/{classRoom}/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
getStudentsByClass.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classRoom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classRoom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classRoom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classRoom: typeof args.classRoom === 'object'
                ? args.classRoom.id
                : args.classRoom,
                }

    return getStudentsByClass.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
getStudentsByClass.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByClass.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
getStudentsByClass.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStudentsByClass.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
    const getStudentsByClassForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStudentsByClass.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
        getStudentsByClassForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStudentsByClass.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::getStudentsByClass
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
        getStudentsByClassForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStudentsByClass.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStudentsByClass.form = getStudentsByClassForm
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
/**
* @see \App\Http\Controllers\Admin\GuardianController::createUser
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
export const createUser = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createUser.url(args, options),
    method: 'post',
})

createUser.definition = {
    methods: ["post"],
    url: '/admin/guardians/{guardian}/user',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::createUser
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
createUser.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return createUser.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::createUser
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
createUser.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createUser.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::createUser
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
    const createUserForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createUser.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::createUser
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
        createUserForm.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createUser.url(args, options),
            method: 'post',
        })
    
    createUser.form = createUserForm
const GuardianController = { index, create, store, show, edit, update, destroy, attachStudent, detachStudent, getStudentsByClass, toggleStatus, createUser }

export default GuardianController