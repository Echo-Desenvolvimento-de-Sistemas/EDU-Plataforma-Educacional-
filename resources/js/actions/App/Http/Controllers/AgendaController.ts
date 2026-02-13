import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/agenda/inbox',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
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
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
export const show = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/agenda/channels/{channel}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
show.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channel: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { channel: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: typeof args.channel === 'object'
                ? args.channel.id
                : args.channel,
                }

    return show.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
show.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
show.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
    const showForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
        showForm.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::show
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
        showForm.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
export const poll = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poll.url(args, options),
    method: 'get',
})

poll.definition = {
    methods: ["get","head"],
    url: '/agenda/channels/{channel}/poll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
poll.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channel: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { channel: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    channel: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        channel: typeof args.channel === 'object'
                ? args.channel.id
                : args.channel,
                }

    return poll.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
poll.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poll.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
poll.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poll.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
    const pollForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: poll.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
        pollForm.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: poll.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:155
 * @route '/agenda/channels/{channel}/poll'
 */
        pollForm.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: poll.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    poll.form = pollForm
/**
* @see \App\Http\Controllers\AgendaController::markAsRead
 * @see app/Http/Controllers/AgendaController.php:225
 * @route '/agenda/messages/{message}/read'
 */
export const markAsRead = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

markAsRead.definition = {
    methods: ["post"],
    url: '/agenda/messages/{message}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AgendaController::markAsRead
 * @see app/Http/Controllers/AgendaController.php:225
 * @route '/agenda/messages/{message}/read'
 */
markAsRead.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return markAsRead.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::markAsRead
 * @see app/Http/Controllers/AgendaController.php:225
 * @route '/agenda/messages/{message}/read'
 */
markAsRead.post = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsRead.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AgendaController::markAsRead
 * @see app/Http/Controllers/AgendaController.php:225
 * @route '/agenda/messages/{message}/read'
 */
    const markAsReadForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markAsRead.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AgendaController::markAsRead
 * @see app/Http/Controllers/AgendaController.php:225
 * @route '/agenda/messages/{message}/read'
 */
        markAsReadForm.post = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markAsRead.url(args, options),
            method: 'post',
        })
    
    markAsRead.form = markAsReadForm
const AgendaController = { index, show, poll, markAsRead }

export default AgendaController