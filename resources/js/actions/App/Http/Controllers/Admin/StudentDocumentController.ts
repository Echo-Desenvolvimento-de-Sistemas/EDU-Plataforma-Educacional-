import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StudentDocumentController::store
 * @see app/Http/Controllers/Admin/StudentDocumentController.php:23
 * @route '/admin/students/{student}/documents'
 */
export const store = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/students/{student}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentDocumentController::store
 * @see app/Http/Controllers/Admin/StudentDocumentController.php:23
 * @route '/admin/students/{student}/documents'
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
* @see \App\Http\Controllers\Admin\StudentDocumentController::store
 * @see app/Http/Controllers/Admin/StudentDocumentController.php:23
 * @route '/admin/students/{student}/documents'
 */
store.post = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentDocumentController::store
 * @see app/Http/Controllers/Admin/StudentDocumentController.php:23
 * @route '/admin/students/{student}/documents'
 */
    const storeForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentDocumentController::store
 * @see app/Http/Controllers/Admin/StudentDocumentController.php:23
 * @route '/admin/students/{student}/documents'
 */
        storeForm.post = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const StudentDocumentController = { store }

export default StudentDocumentController