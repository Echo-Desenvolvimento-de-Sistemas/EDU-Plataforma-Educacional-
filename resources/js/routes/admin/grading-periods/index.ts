import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
const gradingPeriods = {
    destroy: Object.assign(destroy, destroy),
}

export default gradingPeriods