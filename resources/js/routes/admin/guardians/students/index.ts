import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
export const store = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/guardians/{guardian}/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
store.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guardian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                }

    return store.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
store.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
    const storeForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:113
 * @route '/admin/guardians/{guardian}/students'
 */
        storeForm.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
export const destroy = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/guardians/{guardian}/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
destroy.url = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                    student: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                                student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return destroy.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
destroy.delete = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
    const destroyForm = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::destroy
 * @see app/Http/Controllers/Admin/GuardianController.php:132
 * @route '/admin/guardians/{guardian}/students/{student}'
 */
        destroyForm.delete = (args: { guardian: number | { id: number }, student: number | { id: number } } | [guardian: number | { id: number }, student: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const students = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default students