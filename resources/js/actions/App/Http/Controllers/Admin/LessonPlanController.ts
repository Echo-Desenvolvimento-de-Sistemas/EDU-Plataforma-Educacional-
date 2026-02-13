import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
const index369f8f7a383bdefb2a46c2661e02f129 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index369f8f7a383bdefb2a46c2661e02f129.url(options),
    method: 'get',
})

index369f8f7a383bdefb2a46c2661e02f129.definition = {
    methods: ["get","head"],
    url: '/secretaria/planning',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
index369f8f7a383bdefb2a46c2661e02f129.url = (options?: RouteQueryOptions) => {
    return index369f8f7a383bdefb2a46c2661e02f129.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
index369f8f7a383bdefb2a46c2661e02f129.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index369f8f7a383bdefb2a46c2661e02f129.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
index369f8f7a383bdefb2a46c2661e02f129.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index369f8f7a383bdefb2a46c2661e02f129.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
    const index369f8f7a383bdefb2a46c2661e02f129Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index369f8f7a383bdefb2a46c2661e02f129.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
        index369f8f7a383bdefb2a46c2661e02f129Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index369f8f7a383bdefb2a46c2661e02f129.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/secretaria/planning'
 */
        index369f8f7a383bdefb2a46c2661e02f129Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index369f8f7a383bdefb2a46c2661e02f129.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index369f8f7a383bdefb2a46c2661e02f129.form = index369f8f7a383bdefb2a46c2661e02f129Form
    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
const index7c33d115634f14be0a0b12cd9c520897 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7c33d115634f14be0a0b12cd9c520897.url(options),
    method: 'get',
})

index7c33d115634f14be0a0b12cd9c520897.definition = {
    methods: ["get","head"],
    url: '/admin/planning',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
index7c33d115634f14be0a0b12cd9c520897.url = (options?: RouteQueryOptions) => {
    return index7c33d115634f14be0a0b12cd9c520897.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
index7c33d115634f14be0a0b12cd9c520897.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7c33d115634f14be0a0b12cd9c520897.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
index7c33d115634f14be0a0b12cd9c520897.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7c33d115634f14be0a0b12cd9c520897.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
    const index7c33d115634f14be0a0b12cd9c520897Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index7c33d115634f14be0a0b12cd9c520897.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
        index7c33d115634f14be0a0b12cd9c520897Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7c33d115634f14be0a0b12cd9c520897.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::index
 * @see app/Http/Controllers/Admin/LessonPlanController.php:20
 * @route '/admin/planning'
 */
        index7c33d115634f14be0a0b12cd9c520897Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7c33d115634f14be0a0b12cd9c520897.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index7c33d115634f14be0a0b12cd9c520897.form = index7c33d115634f14be0a0b12cd9c520897Form

export const index = {
    '/secretaria/planning': index369f8f7a383bdefb2a46c2661e02f129,
    '/admin/planning': index7c33d115634f14be0a0b12cd9c520897,
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
const show9fed2107bc40bed1783187dc472af8c2 = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9fed2107bc40bed1783187dc472af8c2.url(args, options),
    method: 'get',
})

show9fed2107bc40bed1783187dc472af8c2.definition = {
    methods: ["get","head"],
    url: '/secretaria/planning/{lessonPlan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
show9fed2107bc40bed1783187dc472af8c2.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return show9fed2107bc40bed1783187dc472af8c2.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
show9fed2107bc40bed1783187dc472af8c2.get = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9fed2107bc40bed1783187dc472af8c2.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
show9fed2107bc40bed1783187dc472af8c2.head = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show9fed2107bc40bed1783187dc472af8c2.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
    const show9fed2107bc40bed1783187dc472af8c2Form = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show9fed2107bc40bed1783187dc472af8c2.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
        show9fed2107bc40bed1783187dc472af8c2Form.get = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show9fed2107bc40bed1783187dc472af8c2.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/secretaria/planning/{lessonPlan}'
 */
        show9fed2107bc40bed1783187dc472af8c2Form.head = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show9fed2107bc40bed1783187dc472af8c2.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show9fed2107bc40bed1783187dc472af8c2.form = show9fed2107bc40bed1783187dc472af8c2Form
    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
const show21180aa5c1fc38f8b335528d570b069f = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show21180aa5c1fc38f8b335528d570b069f.url(args, options),
    method: 'get',
})

show21180aa5c1fc38f8b335528d570b069f.definition = {
    methods: ["get","head"],
    url: '/admin/planning/{lessonPlan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
show21180aa5c1fc38f8b335528d570b069f.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return show21180aa5c1fc38f8b335528d570b069f.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
show21180aa5c1fc38f8b335528d570b069f.get = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show21180aa5c1fc38f8b335528d570b069f.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
show21180aa5c1fc38f8b335528d570b069f.head = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show21180aa5c1fc38f8b335528d570b069f.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
    const show21180aa5c1fc38f8b335528d570b069fForm = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show21180aa5c1fc38f8b335528d570b069f.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
        show21180aa5c1fc38f8b335528d570b069fForm.get = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show21180aa5c1fc38f8b335528d570b069f.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::show
 * @see app/Http/Controllers/Admin/LessonPlanController.php:49
 * @route '/admin/planning/{lessonPlan}'
 */
        show21180aa5c1fc38f8b335528d570b069fForm.head = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show21180aa5c1fc38f8b335528d570b069f.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show21180aa5c1fc38f8b335528d570b069f.form = show21180aa5c1fc38f8b335528d570b069fForm

export const show = {
    '/secretaria/planning/{lessonPlan}': show9fed2107bc40bed1783187dc472af8c2,
    '/admin/planning/{lessonPlan}': show21180aa5c1fc38f8b335528d570b069f,
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
const approve1c26d8a057ac59d7f48f54f8a2896e19 = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve1c26d8a057ac59d7f48f54f8a2896e19.url(args, options),
    method: 'post',
})

approve1c26d8a057ac59d7f48f54f8a2896e19.definition = {
    methods: ["post"],
    url: '/secretaria/planning/{lessonPlan}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
approve1c26d8a057ac59d7f48f54f8a2896e19.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return approve1c26d8a057ac59d7f48f54f8a2896e19.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
approve1c26d8a057ac59d7f48f54f8a2896e19.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve1c26d8a057ac59d7f48f54f8a2896e19.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
    const approve1c26d8a057ac59d7f48f54f8a2896e19Form = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve1c26d8a057ac59d7f48f54f8a2896e19.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/secretaria/planning/{lessonPlan}/approve'
 */
        approve1c26d8a057ac59d7f48f54f8a2896e19Form.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve1c26d8a057ac59d7f48f54f8a2896e19.url(args, options),
            method: 'post',
        })
    
    approve1c26d8a057ac59d7f48f54f8a2896e19.form = approve1c26d8a057ac59d7f48f54f8a2896e19Form
    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/admin/planning/{lessonPlan}/approve'
 */
const approve8c056704ab688403b6a8f98079063e41 = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve8c056704ab688403b6a8f98079063e41.url(args, options),
    method: 'post',
})

approve8c056704ab688403b6a8f98079063e41.definition = {
    methods: ["post"],
    url: '/admin/planning/{lessonPlan}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/admin/planning/{lessonPlan}/approve'
 */
approve8c056704ab688403b6a8f98079063e41.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return approve8c056704ab688403b6a8f98079063e41.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/admin/planning/{lessonPlan}/approve'
 */
approve8c056704ab688403b6a8f98079063e41.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve8c056704ab688403b6a8f98079063e41.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/admin/planning/{lessonPlan}/approve'
 */
    const approve8c056704ab688403b6a8f98079063e41Form = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve8c056704ab688403b6a8f98079063e41.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::approve
 * @see app/Http/Controllers/Admin/LessonPlanController.php:58
 * @route '/admin/planning/{lessonPlan}/approve'
 */
        approve8c056704ab688403b6a8f98079063e41Form.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve8c056704ab688403b6a8f98079063e41.url(args, options),
            method: 'post',
        })
    
    approve8c056704ab688403b6a8f98079063e41.form = approve8c056704ab688403b6a8f98079063e41Form

export const approve = {
    '/secretaria/planning/{lessonPlan}/approve': approve1c26d8a057ac59d7f48f54f8a2896e19,
    '/admin/planning/{lessonPlan}/approve': approve8c056704ab688403b6a8f98079063e41,
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
const requestChanges3e8a91ccfc247a5e57c895571db9271f = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestChanges3e8a91ccfc247a5e57c895571db9271f.url(args, options),
    method: 'post',
})

requestChanges3e8a91ccfc247a5e57c895571db9271f.definition = {
    methods: ["post"],
    url: '/secretaria/planning/{lessonPlan}/request-changes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
requestChanges3e8a91ccfc247a5e57c895571db9271f.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return requestChanges3e8a91ccfc247a5e57c895571db9271f.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
requestChanges3e8a91ccfc247a5e57c895571db9271f.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestChanges3e8a91ccfc247a5e57c895571db9271f.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
    const requestChanges3e8a91ccfc247a5e57c895571db9271fForm = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: requestChanges3e8a91ccfc247a5e57c895571db9271f.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/secretaria/planning/{lessonPlan}/request-changes'
 */
        requestChanges3e8a91ccfc247a5e57c895571db9271fForm.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: requestChanges3e8a91ccfc247a5e57c895571db9271f.url(args, options),
            method: 'post',
        })
    
    requestChanges3e8a91ccfc247a5e57c895571db9271f.form = requestChanges3e8a91ccfc247a5e57c895571db9271fForm
    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/admin/planning/{lessonPlan}/request-changes'
 */
const requestChanges46b3fb8f7d31619d036660446ddcf16f = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestChanges46b3fb8f7d31619d036660446ddcf16f.url(args, options),
    method: 'post',
})

requestChanges46b3fb8f7d31619d036660446ddcf16f.definition = {
    methods: ["post"],
    url: '/admin/planning/{lessonPlan}/request-changes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/admin/planning/{lessonPlan}/request-changes'
 */
requestChanges46b3fb8f7d31619d036660446ddcf16f.url = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessonPlan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lessonPlan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lessonPlan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lessonPlan: typeof args.lessonPlan === 'object'
                ? args.lessonPlan.id
                : args.lessonPlan,
                }

    return requestChanges46b3fb8f7d31619d036660446ddcf16f.definition.url
            .replace('{lessonPlan}', parsedArgs.lessonPlan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/admin/planning/{lessonPlan}/request-changes'
 */
requestChanges46b3fb8f7d31619d036660446ddcf16f.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestChanges46b3fb8f7d31619d036660446ddcf16f.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/admin/planning/{lessonPlan}/request-changes'
 */
    const requestChanges46b3fb8f7d31619d036660446ddcf16fForm = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: requestChanges46b3fb8f7d31619d036660446ddcf16f.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LessonPlanController::requestChanges
 * @see app/Http/Controllers/Admin/LessonPlanController.php:64
 * @route '/admin/planning/{lessonPlan}/request-changes'
 */
        requestChanges46b3fb8f7d31619d036660446ddcf16fForm.post = (args: { lessonPlan: number | { id: number } } | [lessonPlan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: requestChanges46b3fb8f7d31619d036660446ddcf16f.url(args, options),
            method: 'post',
        })
    
    requestChanges46b3fb8f7d31619d036660446ddcf16f.form = requestChanges46b3fb8f7d31619d036660446ddcf16fForm

export const requestChanges = {
    '/secretaria/planning/{lessonPlan}/request-changes': requestChanges3e8a91ccfc247a5e57c895571db9271f,
    '/admin/planning/{lessonPlan}/request-changes': requestChanges46b3fb8f7d31619d036660446ddcf16f,
}

const LessonPlanController = { index, show, approve, requestChanges }

export default LessonPlanController