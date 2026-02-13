import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kanban/cards',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::store
 * @see app/Http/Controllers/KanbanController.php:59
 * @route '/kanban/cards'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KanbanController::move
 * @see app/Http/Controllers/KanbanController.php:157
 * @route '/kanban/cards/{card}/move'
 */
export const move = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(args, options),
    method: 'patch',
})

move.definition = {
    methods: ["patch"],
    url: '/kanban/cards/{card}/move',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KanbanController::move
 * @see app/Http/Controllers/KanbanController.php:157
 * @route '/kanban/cards/{card}/move'
 */
move.url = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return move.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::move
 * @see app/Http/Controllers/KanbanController.php:157
 * @route '/kanban/cards/{card}/move'
 */
move.patch = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: move.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KanbanController::move
 * @see app/Http/Controllers/KanbanController.php:157
 * @route '/kanban/cards/{card}/move'
 */
    const moveForm = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: move.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KanbanController::move
 * @see app/Http/Controllers/KanbanController.php:157
 * @route '/kanban/cards/{card}/move'
 */
        moveForm.patch = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: move.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    move.form = moveForm
/**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
export const update = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/kanban/cards/{card}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
update.url = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
update.put = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\KanbanController::update
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
    const updateForm = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/KanbanController.php:96
 * @route '/kanban/cards/{card}'
 */
        updateForm.put = (args: { card: number | { id: number } } | [card: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const cards = {
    store: Object.assign(store, store),
move: Object.assign(move, move),
update: Object.assign(update, update),
}

export default cards