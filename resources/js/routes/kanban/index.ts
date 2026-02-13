import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
const kanban = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
cards: Object.assign(cards, cards),
}

export default kanban