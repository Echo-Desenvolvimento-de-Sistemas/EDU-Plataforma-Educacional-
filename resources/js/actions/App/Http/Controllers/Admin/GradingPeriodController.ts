import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GradingPeriodController::store
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:12
 * @route '/admin/academic-years/{academicYear}/grading-periods'
 */
export const store = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/academic-years/{academicYear}/grading-periods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GradingPeriodController::store
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:12
 * @route '/admin/academic-years/{academicYear}/grading-periods'
 */
store.url = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academicYear: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { academicYear: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    academicYear: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academicYear: typeof args.academicYear === 'object'
                ? args.academicYear.id
                : args.academicYear,
                }

    return store.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GradingPeriodController::store
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:12
 * @route '/admin/academic-years/{academicYear}/grading-periods'
 */
store.post = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GradingPeriodController::store
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:12
 * @route '/admin/academic-years/{academicYear}/grading-periods'
 */
    const storeForm = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GradingPeriodController::store
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:12
 * @route '/admin/academic-years/{academicYear}/grading-periods'
 */
        storeForm.post = (args: { academicYear: number | { id: number } } | [academicYear: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\GradingPeriodController::destroy
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:25
 * @route '/admin/grading-periods/{gradingPeriod}'
 */
export const destroy = (args: { gradingPeriod: number | { id: number } } | [gradingPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/grading-periods/{gradingPeriod}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GradingPeriodController::destroy
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:25
 * @route '/admin/grading-periods/{gradingPeriod}'
 */
destroy.url = (args: { gradingPeriod: number | { id: number } } | [gradingPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gradingPeriod: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { gradingPeriod: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    gradingPeriod: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        gradingPeriod: typeof args.gradingPeriod === 'object'
                ? args.gradingPeriod.id
                : args.gradingPeriod,
                }

    return destroy.definition.url
            .replace('{gradingPeriod}', parsedArgs.gradingPeriod.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GradingPeriodController::destroy
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:25
 * @route '/admin/grading-periods/{gradingPeriod}'
 */
destroy.delete = (args: { gradingPeriod: number | { id: number } } | [gradingPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\GradingPeriodController::destroy
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:25
 * @route '/admin/grading-periods/{gradingPeriod}'
 */
    const destroyForm = (args: { gradingPeriod: number | { id: number } } | [gradingPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GradingPeriodController::destroy
 * @see app/Http/Controllers/Admin/GradingPeriodController.php:25
 * @route '/admin/grading-periods/{gradingPeriod}'
 */
        destroyForm.delete = (args: { gradingPeriod: number | { id: number } } | [gradingPeriod: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const GradingPeriodController = { store, destroy }

export default GradingPeriodController