import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
export const play = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: play.url(args, options),
    method: 'get',
})

play.definition = {
    methods: ["get","head"],
    url: '/aluno/activities/{activity}/play',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
play.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return play.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
play.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: play.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
play.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: play.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
    const playForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: play.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
        playForm.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: play.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\PlayerController::play
 * @see app/Http/Controllers/Student/PlayerController.php:16
 * @route '/aluno/activities/{activity}/play'
 */
        playForm.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: play.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    play.form = playForm
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
const activities = {
    play: Object.assign(play, play),
submit: Object.assign(submit, submit),
}

export default activities