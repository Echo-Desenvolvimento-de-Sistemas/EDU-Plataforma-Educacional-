import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kanban',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KanbanController::index
 * @see app/Http/Controllers/KanbanController.php:16
 * @route '/kanban'
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
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:112
 * @route '/kanban'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kanban',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:112
 * @route '/kanban'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:112
 * @route '/kanban'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:112
 * @route '/kanban'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:112
 * @route '/kanban'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
export const show = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/kanban/{kanbanBoard}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
show.url = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
show.get = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
show.head = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
    const showForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
        showForm.get = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:42
 * @route '/kanban/{kanbanBoard}'
 */
        showForm.head = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:137
 * @route '/kanban/{kanbanBoard}'
 */
export const update = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/kanban/{kanbanBoard}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:137
 * @route '/kanban/{kanbanBoard}'
 */
update.url = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:137
 * @route '/kanban/{kanbanBoard}'
 */
update.put = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:137
 * @route '/kanban/{kanbanBoard}'
 */
    const updateForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:137
 * @route '/kanban/{kanbanBoard}'
 */
        updateForm.put = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:151
 * @route '/kanban/{kanbanBoard}'
 */
export const destroy = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kanban/{kanbanBoard}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:151
 * @route '/kanban/{kanbanBoard}'
 */
destroy.url = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:151
 * @route '/kanban/{kanbanBoard}'
 */
destroy.delete = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:151
 * @route '/kanban/{kanbanBoard}'
 */
    const destroyForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:151
 * @route '/kanban/{kanbanBoard}'
 */
        destroyForm.delete = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KanbanController::storeUser
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
export const storeUser = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(args, options),
    method: 'post',
})

storeUser.definition = {
    methods: ["post"],
    url: '/kanban/{kanbanBoard}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KanbanController::storeUser
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
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
* @see \App\Http\Controllers\KanbanController::storeUser
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
storeUser.post = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KanbanController::storeUser
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
    const storeUserForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::storeUser
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
        storeUserForm.post = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser.url(args, options),
            method: 'post',
        })
    
    storeUser.form = storeUserForm
/**
* @see \App\Http\Controllers\KanbanController::removeUser
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
export const removeUser = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeUser.url(args, options),
    method: 'delete',
})

removeUser.definition = {
    methods: ["delete"],
    url: '/kanban/{kanbanBoard}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KanbanController::removeUser
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
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
* @see \App\Http\Controllers\KanbanController::removeUser
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
removeUser.delete = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeUser.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KanbanController::removeUser
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
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
* @see \App\Http\Controllers\KanbanController::removeUser
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
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
/**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:75
 * @route '/kanban/cards'
 */
export const storeCard = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCard.url(options),
    method: 'post',
})

storeCard.definition = {
    methods: ["post"],
    url: '/kanban/cards',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:75
 * @route '/kanban/cards'
 */
storeCard.url = (options?: RouteQueryOptions) => {
    return storeCard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:75
 * @route '/kanban/cards'
 */
storeCard.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCard.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:75
 * @route '/kanban/cards'
 */
    const storeCardForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeCard.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:75
 * @route '/kanban/cards'
 */
        storeCardForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeCard.url(options),
            method: 'post',
        })
    
    storeCard.form = storeCardForm
/**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:242
 * @route '/kanban/cards/{card}/move'
 */
export const moveCard = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveCard.url(args, options),
    method: 'patch',
})

moveCard.definition = {
    methods: ["patch"],
    url: '/kanban/cards/{card}/move',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:242
 * @route '/kanban/cards/{card}/move'
 */
moveCard.url = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { card: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    card: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        card: typeof args.card === 'object'
                ? args.card.id
                : args.card,
                }

    return moveCard.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:242
 * @route '/kanban/cards/{card}/move'
 */
moveCard.patch = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveCard.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:242
 * @route '/kanban/cards/{card}/move'
 */
    const moveCardForm = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: moveCard.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:242
 * @route '/kanban/cards/{card}/move'
 */
        moveCardForm.patch = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: moveCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    moveCard.form = moveCardForm
/**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
export const updateCard = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateCard.url(args, options),
    method: 'get',
})

updateCard.definition = {
    methods: ["get","head"],
    url: '/kanban/cards/{card}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
updateCard.url = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { card: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    card: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        card: typeof args.card === 'object'
                ? args.card.id
                : args.card,
                }

    return updateCard.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
updateCard.get = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateCard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
updateCard.head = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: updateCard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
    const updateCardForm = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: updateCard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
        updateCardForm.get = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateCard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:181
 * @route '/kanban/cards/{card}'
 */
        updateCardForm.head = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    updateCard.form = updateCardForm
/**
* @see \App\Http\Controllers\KanbanController::destroyCard
 * @see app/Http/Controllers/KanbanController.php:289
 * @route '/kanban/cards/{card}'
 */
export const destroyCard = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCard.url(args, options),
    method: 'delete',
})

destroyCard.definition = {
    methods: ["delete"],
    url: '/kanban/cards/{card}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KanbanController::destroyCard
 * @see app/Http/Controllers/KanbanController.php:289
 * @route '/kanban/cards/{card}'
 */
destroyCard.url = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { card: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    card: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        card: typeof args.card === 'object'
                ? args.card.id
                : args.card,
                }

    return destroyCard.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::destroyCard
 * @see app/Http/Controllers/KanbanController.php:289
 * @route '/kanban/cards/{card}'
 */
destroyCard.delete = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCard.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KanbanController::destroyCard
 * @see app/Http/Controllers/KanbanController.php:289
 * @route '/kanban/cards/{card}'
 */
    const destroyCardForm = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyCard.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::destroyCard
 * @see app/Http/Controllers/KanbanController.php:289
 * @route '/kanban/cards/{card}'
 */
        destroyCardForm.delete = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyCard.form = destroyCardForm
const KanbanController = { index, store, show, update, destroy, storeUser, removeUser, storeCard, moveCard, updateCard, destroyCard }

export default KanbanController