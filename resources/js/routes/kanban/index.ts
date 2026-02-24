import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import users from './users'
import cards from './cards'
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
const kanban = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
users: Object.assign(users, users),
cards: Object.assign(cards, cards),
}

export default kanban