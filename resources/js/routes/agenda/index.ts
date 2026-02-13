import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import channelC61fd2 from './channel'
import messages from './messages'
/**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
export const inbox = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inbox.url(options),
    method: 'get',
})

inbox.definition = {
    methods: ["get","head"],
    url: '/agenda/inbox',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
inbox.url = (options?: RouteQueryOptions) => {
    return inbox.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
inbox.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inbox.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
inbox.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inbox.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
    const inboxForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inbox.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
        inboxForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inbox.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::inbox
 * @see app/Http/Controllers/AgendaController.php:14
 * @route '/agenda/inbox'
 */
        inboxForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inbox.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    inbox.form = inboxForm
/**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
export const channel = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channel.url(args, options),
    method: 'get',
})

channel.definition = {
    methods: ["get","head"],
    url: '/agenda/channels/{channel}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
channel.url = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return channel.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
channel.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channel.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
channel.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: channel.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
    const channelForm = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: channel.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
        channelForm.get = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: channel.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::channel
 * @see app/Http/Controllers/AgendaController.php:135
 * @route '/agenda/channels/{channel}'
 */
        channelForm.head = (args: { channel: number | { id: number } } | [channel: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: channel.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    channel.form = channelForm
const agenda = {
    inbox: Object.assign(inbox, inbox),
channel: Object.assign(channel, channelC61fd2),
messages: Object.assign(messages, messages),
}

export default agenda