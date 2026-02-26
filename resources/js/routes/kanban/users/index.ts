import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
export const store = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kanban/{kanbanBoard}/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
store.url = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
store.post = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
    const storeForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:159
 * @route '/kanban/{kanbanBoard}/users'
 */
        storeForm.post = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
export const destroy = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kanban/{kanbanBoard}/users/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
destroy.url = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{kanbanBoard}', parsedArgs.kanbanBoard.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
destroy.delete = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KanbanController::destroy
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
    const destroyForm = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/KanbanController.php:173
 * @route '/kanban/{kanbanBoard}/users/{user}'
 */
        destroyForm.delete = (args: { kanbanBoard: number | { id: number }, user: number | { id: number } } | [kanbanBoard: number | { id: number }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const users = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default users