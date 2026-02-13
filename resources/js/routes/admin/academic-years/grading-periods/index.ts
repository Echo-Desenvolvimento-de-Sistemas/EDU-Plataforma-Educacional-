import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
const gradingPeriods = {
    store: Object.assign(store, store),
}

export default gradingPeriods