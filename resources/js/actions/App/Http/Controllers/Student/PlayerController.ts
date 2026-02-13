import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
export const start = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(args, options),
    method: 'get',
})

start.definition = {
    methods: ["get","head"],
    url: '/aluno/activities/{activity}/play',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
start.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return start.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
start.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
start.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: start.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
    const startForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: start.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
        startForm.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: start.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\PlayerController::start
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
        startForm.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: start.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    start.form = startForm
/**
* @see \App\Http\Controllers\Student\PlayerController::submit
 * @see app/Http/Controllers/Student/PlayerController.php:48
 * @route '/aluno/activities/{activity}/submit'
 */
export const submit = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/aluno/activities/{activity}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\PlayerController::submit
 * @see app/Http/Controllers/Student/PlayerController.php:48
 * @route '/aluno/activities/{activity}/submit'
 */
submit.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return submit.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\PlayerController::submit
 * @see app/Http/Controllers/Student/PlayerController.php:48
 * @route '/aluno/activities/{activity}/submit'
 */
submit.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\PlayerController::submit
 * @see app/Http/Controllers/Student/PlayerController.php:48
 * @route '/aluno/activities/{activity}/submit'
 */
    const submitForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\PlayerController::submit
 * @see app/Http/Controllers/Student/PlayerController.php:48
 * @route '/aluno/activities/{activity}/submit'
 */
        submitForm.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
const PlayerController = { start, submit }

export default PlayerController