import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::index
 * @see app/Http/Controllers/Secretaria/GradeController.php:16
 * @route '/secretaria/grades'
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
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
 */
export const entry = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entry.url(options),
    method: 'get',
})

entry.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades/entry',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
 */
entry.url = (options?: RouteQueryOptions) => {
    return entry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
 */
entry.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: entry.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
 */
entry.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: entry.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
 */
    const entryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: entry.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
 */
        entryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: entry.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::entry
 * @see app/Http/Controllers/Secretaria/GradeController.php:92
 * @route '/secretaria/grades/entry'
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
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
export const getGradesApi = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGradesApi.url(args, options),
    method: 'get',
})

getGradesApi.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades/{classRoom}/grades-api',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
getGradesApi.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getGradesApi.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
getGradesApi.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getGradesApi.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
getGradesApi.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getGradesApi.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
    const getGradesApiForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getGradesApi.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
        getGradesApiForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getGradesApi.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::getGradesApi
 * @see app/Http/Controllers/Secretaria/GradeController.php:117
 * @route '/secretaria/grades/{classRoom}/grades-api'
 */
        getGradesApiForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getGradesApi.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getGradesApi.form = getGradesApiForm
/**
* @see \App\Http\Controllers\Secretaria\GradeController::storeBatch
 * @see app/Http/Controllers/Secretaria/GradeController.php:151
 * @route '/secretaria/grades/{classRoom}/grades-batch'
 */
export const storeBatch = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBatch.url(args, options),
    method: 'post',
})

storeBatch.definition = {
    methods: ["post"],
    url: '/secretaria/grades/{classRoom}/grades-batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::storeBatch
 * @see app/Http/Controllers/Secretaria/GradeController.php:151
 * @route '/secretaria/grades/{classRoom}/grades-batch'
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
* @see \App\Http\Controllers\Secretaria\GradeController::storeBatch
 * @see app/Http/Controllers/Secretaria/GradeController.php:151
 * @route '/secretaria/grades/{classRoom}/grades-batch'
 */
storeBatch.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBatch.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::storeBatch
 * @see app/Http/Controllers/Secretaria/GradeController.php:151
 * @route '/secretaria/grades/{classRoom}/grades-batch'
 */
    const storeBatchForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeBatch.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::storeBatch
 * @see app/Http/Controllers/Secretaria/GradeController.php:151
 * @route '/secretaria/grades/{classRoom}/grades-batch'
 */
        storeBatchForm.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeBatch.url(args, options),
            method: 'post',
        })
    
    storeBatch.form = storeBatchForm
/**
* @see \App\Http\Controllers\Secretaria\GradeController::storeAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:194
 * @route '/secretaria/grades/{classRoom}/assessments'
 */
export const storeAssessment = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAssessment.url(args, options),
    method: 'post',
})

storeAssessment.definition = {
    methods: ["post"],
    url: '/secretaria/grades/{classRoom}/assessments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::storeAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:194
 * @route '/secretaria/grades/{classRoom}/assessments'
 */
storeAssessment.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeAssessment.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::storeAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:194
 * @route '/secretaria/grades/{classRoom}/assessments'
 */
storeAssessment.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAssessment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::storeAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:194
 * @route '/secretaria/grades/{classRoom}/assessments'
 */
    const storeAssessmentForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeAssessment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::storeAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:194
 * @route '/secretaria/grades/{classRoom}/assessments'
 */
        storeAssessmentForm.post = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeAssessment.url(args, options),
            method: 'post',
        })
    
    storeAssessment.form = storeAssessmentForm
/**
* @see \App\Http\Controllers\Secretaria\GradeController::destroyAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:222
 * @route '/secretaria/grades/{classRoom}/assessments/{assessment}'
 */
export const destroyAssessment = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAssessment.url(args, options),
    method: 'delete',
})

destroyAssessment.definition = {
    methods: ["delete"],
    url: '/secretaria/grades/{classRoom}/assessments/{assessment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::destroyAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:222
 * @route '/secretaria/grades/{classRoom}/assessments/{assessment}'
 */
destroyAssessment.url = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return destroyAssessment.definition.url
            .replace('{classRoom}', parsedArgs.classRoom.toString())
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Secretaria\GradeController::destroyAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:222
 * @route '/secretaria/grades/{classRoom}/assessments/{assessment}'
 */
destroyAssessment.delete = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAssessment.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::destroyAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:222
 * @route '/secretaria/grades/{classRoom}/assessments/{assessment}'
 */
    const destroyAssessmentForm = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyAssessment.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::destroyAssessment
 * @see app/Http/Controllers/Secretaria/GradeController.php:222
 * @route '/secretaria/grades/{classRoom}/assessments/{assessment}'
 */
        destroyAssessmentForm.delete = (args: { classRoom: number | { id: number }, assessment: number | { id: number } } | [classRoom: number | { id: number }, assessment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyAssessment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyAssessment.form = destroyAssessmentForm
/**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
export const show = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades/{classRoom}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
show.url = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
show.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
show.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
    const showForm = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
        showForm.get = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::show
 * @see app/Http/Controllers/Secretaria/GradeController.php:42
 * @route '/secretaria/grades/{classRoom}'
 */
        showForm.head = (args: { classRoom: number | { id: number } } | [classRoom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
export const reportCard = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCard.url(args, options),
    method: 'get',
})

reportCard.definition = {
    methods: ["get","head"],
    url: '/secretaria/grades/student/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
reportCard.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
reportCard.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportCard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
reportCard.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportCard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
    const reportCardForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reportCard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
        reportCardForm.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Secretaria\GradeController::reportCard
 * @see app/Http/Controllers/Secretaria/GradeController.php:52
 * @route '/secretaria/grades/student/{student}'
 */
        reportCardForm.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reportCard.form = reportCardForm
const GradeController = { index, entry, getGradesApi, storeBatch, storeAssessment, destroyAssessment, show, reportCard }

export default GradeController