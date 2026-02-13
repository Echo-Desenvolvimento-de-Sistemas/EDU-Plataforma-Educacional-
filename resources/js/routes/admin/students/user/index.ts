import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:352
 * @route '/admin/students/{student}/user'
 */
export const store = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/students/{student}/user',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:352
 * @route '/admin/students/{student}/user'
 */
store.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return store.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:352
 * @route '/admin/students/{student}/user'
 */
store.post = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:352
 * @route '/admin/students/{student}/user'
 */
    const storeForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentController::store
 * @see app/Http/Controllers/Admin/StudentController.php:352
 * @route '/admin/students/{student}/user'
 */
        storeForm.post = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const user = {
    store: Object.assign(store, store),
}

export default user