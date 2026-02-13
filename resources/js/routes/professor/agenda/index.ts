import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AgendaController::message
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
export const message = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: message.url(options),
    method: 'post',
})

message.definition = {
    methods: ["post"],
    url: '/professor/agenda/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AgendaController::message
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
message.url = (options?: RouteQueryOptions) => {
    return message.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AgendaController::message
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
message.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: message.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AgendaController::message
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
    const messageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: message.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AgendaController::message
 * @see app/Http/Controllers/Admin/AgendaController.php:120
 * @route '/professor/agenda/message'
 */
        messageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: message.url(options),
            method: 'post',
        })
    
    message.form = messageForm
const agenda = {
    message: Object.assign(message, message),
}

export default agenda