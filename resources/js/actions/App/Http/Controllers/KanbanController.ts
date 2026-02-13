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
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:26
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
 * @see app/Http/Controllers/KanbanController.php:26
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
 * @see app/Http/Controllers/KanbanController.php:26
 * @route '/kanban/{kanbanBoard}'
 */
show.get = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:26
 * @route '/kanban/{kanbanBoard}'
 */
show.head = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:26
 * @route '/kanban/{kanbanBoard}'
 */
    const showForm = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:26
 * @route '/kanban/{kanbanBoard}'
 */
        showForm.get = (args: { kanbanBoard: number | { id: number } } | [kanbanBoard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KanbanController::show
 * @see app/Http/Controllers/KanbanController.php:26
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
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:59
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
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
storeCard.url = (options?: RouteQueryOptions) => {
    return storeCard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
storeCard.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCard.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
    const storeCardForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeCard.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::storeCard
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
        storeCardForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeCard.url(options),
            method: 'post',
        })
    
    storeCard.form = storeCardForm
/**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:157
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
 * @see app/Http/Controllers/KanbanController.php:157
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
 * @see app/Http/Controllers/KanbanController.php:157
 * @route '/kanban/cards/{card}/move'
 */
moveCard.patch = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: moveCard.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KanbanController::moveCard
 * @see app/Http/Controllers/KanbanController.php:157
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
 * @see app/Http/Controllers/KanbanController.php:157
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
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
export const updateCard = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCard.url(args, options),
    method: 'put',
})

updateCard.definition = {
    methods: ["put"],
    url: '/kanban/cards/{card}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:96
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
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
updateCard.put = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCard.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
    const updateCardForm = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateCard.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::updateCard
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
        updateCardForm.put = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateCard.form = updateCardForm
const KanbanController = { index, show, storeCard, moveCard, updateCard }

export default KanbanController