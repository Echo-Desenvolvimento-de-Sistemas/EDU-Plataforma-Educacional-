import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::store
 * @see app/Http/Controllers/Admin/StudentGradeController.php:186
 * @route '/admin/student-grades/{classRoom}/assessments'
 */
export const store = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/student-grades/{classRoom}/assessments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::store
 * @see app/Http/Controllers/Admin/StudentGradeController.php:186
 * @route '/admin/student-grades/{classRoom}/assessments'
 */
store.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::store
 * @see app/Http/Controllers/Admin/StudentGradeController.php:186
 * @route '/admin/student-grades/{classRoom}/assessments'
 */
store.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::store
 * @see app/Http/Controllers/Admin/StudentGradeController.php:186
 * @route '/admin/student-grades/{classRoom}/assessments'
 */
    const storeForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::store
 * @see app/Http/Controllers/Admin/StudentGradeController.php:186
 * @route '/admin/student-grades/{classRoom}/assessments'
 */
        storeForm.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::destroy
 * @see app/Http/Controllers/Admin/StudentGradeController.php:214
 * @route '/admin/student-grades/{classRoom}/assessments/{assessment}'
 */
export const destroy = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/student-grades/{classRoom}/assessments/{assessment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::destroy
 * @see app/Http/Controllers/Admin/StudentGradeController.php:214
 * @route '/admin/student-grades/{classRoom}/assessments/{assessment}'
 */
destroy.url = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    classRoom: args[0],
                    assessment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classRoom: typeof args.classRoom === 'object'
                ? args.classRoom.id
                : args.classRoom,
                                assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return destroy.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::destroy
 * @see app/Http/Controllers/Admin/StudentGradeController.php:214
 * @route '/admin/student-grades/{classRoom}/assessments/{assessment}'
 */
destroy.delete = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::destroy
 * @see app/Http/Controllers/Admin/StudentGradeController.php:214
 * @route '/admin/student-grades/{classRoom}/assessments/{assessment}'
 */
    const destroyForm = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::destroy
 * @see app/Http/Controllers/Admin/StudentGradeController.php:214
 * @route '/admin/student-grades/{classRoom}/assessments/{assessment}'
 */
        destroyForm.delete = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const assessments = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default assessments