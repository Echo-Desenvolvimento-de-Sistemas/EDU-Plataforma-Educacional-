import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/education-levels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::index
 * @see app/Http/Controllers/Admin/EducationLevelController.php:15
 * @route '/admin/education-levels'
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
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/education-levels/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::create
 * @see app/Http/Controllers/Admin/EducationLevelController.php:23
 * @route '/admin/education-levels/create'
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
* @see \App\Http\Controllers\Admin\EducationLevelController::store
 * @see app/Http/Controllers/Admin/EducationLevelController.php:28
 * @route '/admin/education-levels'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/education-levels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::store
 * @see app/Http/Controllers/Admin/EducationLevelController.php:28
 * @route '/admin/education-levels'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::store
 * @see app/Http/Controllers/Admin/EducationLevelController.php:28
 * @route '/admin/education-levels'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::store
 * @see app/Http/Controllers/Admin/EducationLevelController.php:28
 * @route '/admin/education-levels'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::store
 * @see app/Http/Controllers/Admin/EducationLevelController.php:28
 * @route '/admin/education-levels'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
export const show = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/education-levels/{education_level}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
show.url = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: args.education_level,
                }

    return show.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
show.get = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
show.head = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
    const showForm = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
        showForm.get = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::show
 * @see app/Http/Controllers/Admin/EducationLevelController.php:0
 * @route '/admin/education-levels/{education_level}'
 */
        showForm.head = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
export const edit = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/education-levels/{education_level}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
edit.url = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: args.education_level,
                }

    return edit.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
edit.get = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
edit.head = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
    const editForm = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
        editForm.get = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::edit
 * @see app/Http/Controllers/Admin/EducationLevelController.php:40
 * @route '/admin/education-levels/{education_level}/edit'
 */
        editForm.head = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
export const update = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/education-levels/{education_level}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
update.url = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: args.education_level,
                }

    return update.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
update.put = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
update.patch = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
    const updateForm = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
        updateForm.put = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::update
 * @see app/Http/Controllers/Admin/EducationLevelController.php:47
 * @route '/admin/education-levels/{education_level}'
 */
        updateForm.patch = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\EducationLevelController::destroy
 * @see app/Http/Controllers/Admin/EducationLevelController.php:59
 * @route '/admin/education-levels/{education_level}'
 */
export const destroy = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/education-levels/{education_level}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::destroy
 * @see app/Http/Controllers/Admin/EducationLevelController.php:59
 * @route '/admin/education-levels/{education_level}'
 */
destroy.url = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: args.education_level,
                }

    return destroy.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EducationLevelController::destroy
 * @see app/Http/Controllers/Admin/EducationLevelController.php:59
 * @route '/admin/education-levels/{education_level}'
 */
destroy.delete = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EducationLevelController::destroy
 * @see app/Http/Controllers/Admin/EducationLevelController.php:59
 * @route '/admin/education-levels/{education_level}'
 */
    const destroyForm = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EducationLevelController::destroy
 * @see app/Http/Controllers/Admin/EducationLevelController.php:59
 * @route '/admin/education-levels/{education_level}'
 */
        destroyForm.delete = (args: { education_level: string | number } | [education_level: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const EducationLevelController = { index, create, store, show, edit, update, destroy }

export default EducationLevelController