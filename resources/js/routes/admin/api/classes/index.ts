import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
export const students = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(args, options),
    method: 'get',
})

students.definition = {
    methods: ["get","head"],
    url: '/admin/api/classes/{classRoom}/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
students.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return students.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
students.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
students.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: students.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
    const studentsForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: students.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
        studentsForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GuardianController::students
 * @see app/Http/Controllers/Admin/GuardianController.php:138
 * @route '/admin/api/classes/{classRoom}/students'
 */
        studentsForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    students.form = studentsForm
const classes = {
    students: Object.assign(students, students),
}

export default classes