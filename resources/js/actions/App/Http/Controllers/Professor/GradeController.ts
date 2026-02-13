import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
export const entry = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entry.url(options),
    method: 'get',
})

entry.definition = {
    methods: ["get","head"],
    url: '/professor/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
entry.url = (options?: RouteQueryOptions) => {
    return entry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
entry.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entry.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
entry.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: entry.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
    const entryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: entry.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
        entryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: entry.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\GradeController::entry
 * @see app/Http/Controllers/Professor/GradeController.php:16
 * @route '/professor/grades'
 */
        entryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: entry.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    entry.form = entryForm
/**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
export const index = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/classes/{classRoom}/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
index.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classRoom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classRoom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classRoom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classRoom: typeof args.classRoom === 'object'
                ? args.classRoom.id
                : args.classRoom,
                }

    return index.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
index.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
index.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
    const indexForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
        indexForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\GradeController::index
 * @see app/Http/Controllers/Professor/GradeController.php:58
 * @route '/professor/classes/{classRoom}/grades'
 */
        indexForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Professor\GradeController::storeBatch
 * @see app/Http/Controllers/Professor/GradeController.php:96
 * @route '/professor/classes/{classRoom}/grades/batch'
 */
export const storeBatch = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBatch.url(args, options),
    method: 'post',
})

storeBatch.definition = {
    methods: ["post"],
    url: '/professor/classes/{classRoom}/grades/batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\GradeController::storeBatch
 * @see app/Http/Controllers/Professor/GradeController.php:96
 * @route '/professor/classes/{classRoom}/grades/batch'
 */
storeBatch.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classRoom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classRoom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classRoom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classRoom: typeof args.classRoom === 'object'
                ? args.classRoom.id
                : args.classRoom,
                }

    return storeBatch.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\GradeController::storeBatch
 * @see app/Http/Controllers/Professor/GradeController.php:96
 * @route '/professor/classes/{classRoom}/grades/batch'
 */
storeBatch.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBatch.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\GradeController::storeBatch
 * @see app/Http/Controllers/Professor/GradeController.php:96
 * @route '/professor/classes/{classRoom}/grades/batch'
 */
    const storeBatchForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeBatch.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\GradeController::storeBatch
 * @see app/Http/Controllers/Professor/GradeController.php:96
 * @route '/professor/classes/{classRoom}/grades/batch'
 */
        storeBatchForm.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeBatch.url(args, options),
            method: 'post',
        })
    
    storeBatch.form = storeBatchForm
const GradeController = { entry, index, storeBatch }

export default GradeController