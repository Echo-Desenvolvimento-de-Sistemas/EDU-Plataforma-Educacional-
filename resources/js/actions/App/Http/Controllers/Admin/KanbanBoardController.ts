import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/kanban',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::index
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:13
 * @route '/admin/kanban'
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
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::create
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/create'
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
* @see \App\Http\Controllers\Admin\KanbanBoardController::store
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:35
 * @route '/admin/kanban'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/kanban',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::store
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:35
 * @route '/admin/kanban'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::store
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:35
 * @route '/admin/kanban'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::store
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:35
 * @route '/admin/kanban'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::store
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:35
 * @route '/admin/kanban'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
export const show = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/{kanban}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
show.url = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kanban: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kanban: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kanban: args.kanban,
                }

    return show.definition.url
            .replace('{kanban}', parsedArgs.kanban.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
show.get = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
show.head = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
    const showForm = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
        showForm.get = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::show
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}'
 */
        showForm.head = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
export const edit = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/kanban/{kanban}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
edit.url = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kanban: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kanban: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kanban: args.kanban,
                }

    return edit.definition.url
            .replace('{kanban}', parsedArgs.kanban.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
edit.get = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
edit.head = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
    const editForm = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
        editForm.get = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::edit
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:0
 * @route '/admin/kanban/{kanban}/edit'
 */
        editForm.head = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
export const update = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/kanban/{kanban}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
update.url = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kanban: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kanban: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kanban: args.kanban,
                }

    return update.definition.url
            .replace('{kanban}', parsedArgs.kanban.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
update.put = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
update.patch = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
    const updateForm = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
        updateForm.put = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::update
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:58
 * @route '/admin/kanban/{kanban}'
 */
        updateForm.patch = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\KanbanBoardController::destroy
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:70
 * @route '/admin/kanban/{kanban}'
 */
export const destroy = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/kanban/{kanban}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::destroy
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:70
 * @route '/admin/kanban/{kanban}'
 */
destroy.url = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kanban: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    kanban: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kanban: args.kanban,
                }

    return destroy.definition.url
            .replace('{kanban}', parsedArgs.kanban.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::destroy
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:70
 * @route '/admin/kanban/{kanban}'
 */
destroy.delete = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::destroy
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:70
 * @route '/admin/kanban/{kanban}'
 */
    const destroyForm = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::destroy
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:70
 * @route '/admin/kanban/{kanban}'
 */
        destroyForm.delete = (args: { kanban: string | number } | [kanban: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\KanbanBoardController::storeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:76
 * @route '/admin/kanban/{kanbanBoard}/users'
 */
export const storeUser = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(args, options),
    method: 'post',
})

storeUser.definition = {
    methods: ["post"],
    url: '/admin/kanban/{kanbanBoard}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::storeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:76
 * @route '/admin/kanban/{kanbanBoard}/users'
 */
storeUser.url = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kanbanBoard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kanbanBoard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kanbanBoard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kanbanBoard: typeof args.kanbanBoard === 'object'
                ? args.kanbanBoard.id
                : args.kanbanBoard,
                }

    return storeUser.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::storeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:76
 * @route '/admin/kanban/{kanbanBoard}/users'
 */
storeUser.post = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::storeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:76
 * @route '/admin/kanban/{kanbanBoard}/users'
 */
    const storeUserForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::storeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:76
 * @route '/admin/kanban/{kanbanBoard}/users'
 */
        storeUserForm.post = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser.url(args, options),
            method: 'post',
        })
    
    storeUser.form = storeUserForm
/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::removeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:88
 * @route '/admin/kanban/{kanbanBoard}/users/{user}'
 */
export const removeUser = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeUser.url(args, options),
    method: 'delete',
})

removeUser.definition = {
    methods: ["delete"],
    url: '/admin/kanban/{kanbanBoard}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::removeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:88
 * @route '/admin/kanban/{kanbanBoard}/users/{user}'
 */
removeUser.url = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    kanbanBoard: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kanbanBoard: typeof args.kanbanBoard === 'object'
                ? args.kanbanBoard.id
                : args.kanbanBoard,
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return removeUser.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\KanbanBoardController::removeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:88
 * @route '/admin/kanban/{kanbanBoard}/users/{user}'
 */
removeUser.delete = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeUser.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::removeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:88
 * @route '/admin/kanban/{kanbanBoard}/users/{user}'
 */
    const removeUserForm = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeUser.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\KanbanBoardController::removeUser
 * @see app/Http/Controllers/Admin/KanbanBoardController.php:88
 * @route '/admin/kanban/{kanbanBoard}/users/{user}'
 */
        removeUserForm.delete = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeUser.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeUser.form = removeUserForm
const KanbanBoardController = { index, create, store, show, edit, update, destroy, storeUser, removeUser }

export default KanbanBoardController