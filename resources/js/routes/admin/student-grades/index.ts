import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import assessments from './assessments'
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/student-grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::index
 * @see app/Http/Controllers/Admin/StudentGradeController.php:16
 * @route '/admin/student-grades'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
 */
export const entry = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entry.url(options),
    method: 'get',
})

entry.definition = {
    methods: ["get","head"],
    url: '/admin/student-grades/entry',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
 */
entry.url = (options?: RouteQueryOptions) => {
    return entry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
 */
entry.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entry.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
 */
entry.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: entry.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
 */
    const entryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: entry.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
 */
        entryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: entry.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::entry
 * @see app/Http/Controllers/Admin/StudentGradeController.php:84
 * @route '/admin/student-grades/entry'
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
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
export const gradesApi = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gradesApi.url(args, options),
    method: 'get',
})

gradesApi.definition = {
    methods: ["get","head"],
    url: '/admin/student-grades/{classRoom}/grades-api',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
gradesApi.url = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return gradesApi.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
gradesApi.get = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gradesApi.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
gradesApi.head = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gradesApi.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
    const gradesApiForm = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: gradesApi.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
        gradesApiForm.get = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: gradesApi.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::gradesApi
 * @see app/Http/Controllers/Admin/StudentGradeController.php:109
 * @route '/admin/student-grades/{classRoom}/grades-api'
 */
        gradesApiForm.head = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: gradesApi.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    gradesApi.form = gradesApiForm
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::batch
 * @see app/Http/Controllers/Admin/StudentGradeController.php:143
 * @route '/admin/student-grades/{classRoom}/grades-batch'
 */
export const batch = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batch.url(args, options),
    method: 'post',
})

batch.definition = {
    methods: ["post"],
    url: '/admin/student-grades/{classRoom}/grades-batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::batch
 * @see app/Http/Controllers/Admin/StudentGradeController.php:143
 * @route '/admin/student-grades/{classRoom}/grades-batch'
 */
batch.url = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return batch.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::batch
 * @see app/Http/Controllers/Admin/StudentGradeController.php:143
 * @route '/admin/student-grades/{classRoom}/grades-batch'
 */
batch.post = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batch.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::batch
 * @see app/Http/Controllers/Admin/StudentGradeController.php:143
 * @route '/admin/student-grades/{classRoom}/grades-batch'
 */
    const batchForm = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: batch.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::batch
 * @see app/Http/Controllers/Admin/StudentGradeController.php:143
 * @route '/admin/student-grades/{classRoom}/grades-batch'
 */
        batchForm.post = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: batch.url(args, options),
            method: 'post',
        })
    
    batch.form = batchForm
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
export const show = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/student-grades/{classRoom}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
show.url = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
show.get = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
show.head = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
    const showForm = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
        showForm.get = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::show
 * @see app/Http/Controllers/Admin/StudentGradeController.php:39
 * @route '/admin/student-grades/{classRoom}'
 */
        showForm.head = (args: { classRoom: string | number | { id: string | number } } | [classRoom: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
export const reportCard = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCard.url(args, options),
    method: 'get',
})

reportCard.definition = {
    methods: ["get","head"],
    url: '/admin/student-grades/student/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
reportCard.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return reportCard.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
reportCard.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
reportCard.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportCard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
    const reportCardForm = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reportCard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
        reportCardForm.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StudentGradeController::reportCard
 * @see app/Http/Controllers/Admin/StudentGradeController.php:49
 * @route '/admin/student-grades/student/{student}'
 */
        reportCardForm.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reportCard.form = reportCardForm
const studentGrades = {
    index: Object.assign(index, index),
entry: Object.assign(entry, entry),
gradesApi: Object.assign(gradesApi, gradesApi),
batch: Object.assign(batch, batch),
assessments: Object.assign(assessments, assessments),
show: Object.assign(show, show),
reportCard: Object.assign(reportCard, reportCard),
}

export default studentGrades