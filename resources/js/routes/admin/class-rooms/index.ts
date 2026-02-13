import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/class-rooms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::index
 * @see app/Http/Controllers/Admin/ClassRoomController.php:17
 * @route '/admin/class-rooms'
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
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/class-rooms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::create
 * @see app/Http/Controllers/Admin/ClassRoomController.php:25
 * @route '/admin/class-rooms/create'
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
* @see \App\Http\Controllers\Admin\ClassRoomController::store
 * @see app/Http/Controllers/Admin/ClassRoomController.php:35
 * @route '/admin/class-rooms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/class-rooms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::store
 * @see app/Http/Controllers/Admin/ClassRoomController.php:35
 * @route '/admin/class-rooms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::store
 * @see app/Http/Controllers/Admin/ClassRoomController.php:35
 * @route '/admin/class-rooms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::store
 * @see app/Http/Controllers/Admin/ClassRoomController.php:35
 * @route '/admin/class-rooms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::store
 * @see app/Http/Controllers/Admin/ClassRoomController.php:35
 * @route '/admin/class-rooms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
export const show = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/class-rooms/{class_room}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
show.url = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { class_room: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    class_room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        class_room: args.class_room,
                }

    return show.definition.url
            .replace('{class_room}', parsedArgs.class_room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
show.get = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
show.head = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
    const showForm = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
        showForm.get = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::show
 * @see app/Http/Controllers/Admin/ClassRoomController.php:0
 * @route '/admin/class-rooms/{class_room}'
 */
        showForm.head = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
export const edit = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/class-rooms/{class_room}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
edit.url = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { class_room: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    class_room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        class_room: args.class_room,
                }

    return edit.definition.url
            .replace('{class_room}', parsedArgs.class_room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
edit.get = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
edit.head = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
    const editForm = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
        editForm.get = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::edit
 * @see app/Http/Controllers/Admin/ClassRoomController.php:49
 * @route '/admin/class-rooms/{class_room}/edit'
 */
        editForm.head = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
export const update = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/class-rooms/{class_room}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
update.url = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { class_room: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    class_room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        class_room: args.class_room,
                }

    return update.definition.url
            .replace('{class_room}', parsedArgs.class_room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
update.put = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
update.patch = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
    const updateForm = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
        updateForm.put = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::update
 * @see app/Http/Controllers/Admin/ClassRoomController.php:60
 * @route '/admin/class-rooms/{class_room}'
 */
        updateForm.patch = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ClassRoomController::destroy
 * @see app/Http/Controllers/Admin/ClassRoomController.php:74
 * @route '/admin/class-rooms/{class_room}'
 */
export const destroy = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/class-rooms/{class_room}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::destroy
 * @see app/Http/Controllers/Admin/ClassRoomController.php:74
 * @route '/admin/class-rooms/{class_room}'
 */
destroy.url = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { class_room: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    class_room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        class_room: args.class_room,
                }

    return destroy.definition.url
            .replace('{class_room}', parsedArgs.class_room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ClassRoomController::destroy
 * @see app/Http/Controllers/Admin/ClassRoomController.php:74
 * @route '/admin/class-rooms/{class_room}'
 */
destroy.delete = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ClassRoomController::destroy
 * @see app/Http/Controllers/Admin/ClassRoomController.php:74
 * @route '/admin/class-rooms/{class_room}'
 */
    const destroyForm = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ClassRoomController::destroy
 * @see app/Http/Controllers/Admin/ClassRoomController.php:74
 * @route '/admin/class-rooms/{class_room}'
 */
        destroyForm.delete = (args: { class_room: string | number } | [class_room: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const classRooms = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default classRooms