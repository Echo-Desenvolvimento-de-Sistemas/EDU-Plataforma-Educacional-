import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AgendaController::reply
 * @see app/Http/Controllers/AgendaController.php:291
 * @route '/agenda/channels/{channel}/reply'
 */
export const reply = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/agenda/channels/{channel}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AgendaController::reply
 * @see app/Http/Controllers/AgendaController.php:291
 * @route '/agenda/channels/{channel}/reply'
 */
reply.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reply.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::reply
 * @see app/Http/Controllers/AgendaController.php:291
 * @route '/agenda/channels/{channel}/reply'
 */
reply.post = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AgendaController::reply
 * @see app/Http/Controllers/AgendaController.php:291
 * @route '/agenda/channels/{channel}/reply'
 */
    const replyForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AgendaController::reply
 * @see app/Http/Controllers/AgendaController.php:291
 * @route '/agenda/channels/{channel}/reply'
 */
        replyForm.post = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reply.url(args, options),
            method: 'post',
        })
    
    reply.form = replyForm
/**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:206
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
 * @see app/Http/Controllers/AgendaController.php:206
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
 * @see app/Http/Controllers/AgendaController.php:206
 * @route '/agenda/channels/{channel}/poll'
 */
poll.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: poll.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:206
 * @route '/agenda/channels/{channel}/poll'
 */
poll.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: poll.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:206
 * @route '/agenda/channels/{channel}/poll'
 */
    const pollForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: poll.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:206
 * @route '/agenda/channels/{channel}/poll'
 */
        pollForm.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: poll.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::poll
 * @see app/Http/Controllers/AgendaController.php:206
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
const channel = {
    reply: Object.assign(reply, reply),
poll: Object.assign(poll, poll),
}

export default channel