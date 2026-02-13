import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
const index7f17926f7817e0c9a5617a8b233ce238 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7f17926f7817e0c9a5617a8b233ce238.url(options),
    method: 'get',
})

index7f17926f7817e0c9a5617a8b233ce238.definition = {
    methods: ["get","head"],
    url: '/secretaria/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
index7f17926f7817e0c9a5617a8b233ce238.url = (options?: RouteQueryOptions) => {
    return index7f17926f7817e0c9a5617a8b233ce238.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
index7f17926f7817e0c9a5617a8b233ce238.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7f17926f7817e0c9a5617a8b233ce238.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
index7f17926f7817e0c9a5617a8b233ce238.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7f17926f7817e0c9a5617a8b233ce238.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
    const index7f17926f7817e0c9a5617a8b233ce238Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index7f17926f7817e0c9a5617a8b233ce238.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
        index7f17926f7817e0c9a5617a8b233ce238Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7f17926f7817e0c9a5617a8b233ce238.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/secretaria/attendance'
 */
        index7f17926f7817e0c9a5617a8b233ce238Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7f17926f7817e0c9a5617a8b233ce238.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index7f17926f7817e0c9a5617a8b233ce238.form = index7f17926f7817e0c9a5617a8b233ce238Form
    /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
const indexe3f16b811c619ae8670ada16ca7d59dd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe3f16b811c619ae8670ada16ca7d59dd.url(options),
    method: 'get',
})

indexe3f16b811c619ae8670ada16ca7d59dd.definition = {
    methods: ["get","head"],
    url: '/admin/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
indexe3f16b811c619ae8670ada16ca7d59dd.url = (options?: RouteQueryOptions) => {
    return indexe3f16b811c619ae8670ada16ca7d59dd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
indexe3f16b811c619ae8670ada16ca7d59dd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe3f16b811c619ae8670ada16ca7d59dd.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
indexe3f16b811c619ae8670ada16ca7d59dd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexe3f16b811c619ae8670ada16ca7d59dd.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
    const indexe3f16b811c619ae8670ada16ca7d59ddForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexe3f16b811c619ae8670ada16ca7d59dd.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
        indexe3f16b811c619ae8670ada16ca7d59ddForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe3f16b811c619ae8670ada16ca7d59dd.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
        indexe3f16b811c619ae8670ada16ca7d59ddForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexe3f16b811c619ae8670ada16ca7d59dd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexe3f16b811c619ae8670ada16ca7d59dd.form = indexe3f16b811c619ae8670ada16ca7d59ddForm

export const index = {
    '/secretaria/attendance': index7f17926f7817e0c9a5617a8b233ce238,
    '/admin/attendance': indexe3f16b811c619ae8670ada16ca7d59dd,
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
const edit89163c7a23dd2ccbcb939a73e42bb3ca = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit89163c7a23dd2ccbcb939a73e42bb3ca.url(options),
    method: 'get',
})

edit89163c7a23dd2ccbcb939a73e42bb3ca.definition = {
    methods: ["get","head"],
    url: '/secretaria/attendance/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
edit89163c7a23dd2ccbcb939a73e42bb3ca.url = (options?: RouteQueryOptions) => {
    return edit89163c7a23dd2ccbcb939a73e42bb3ca.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
edit89163c7a23dd2ccbcb939a73e42bb3ca.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit89163c7a23dd2ccbcb939a73e42bb3ca.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
edit89163c7a23dd2ccbcb939a73e42bb3ca.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit89163c7a23dd2ccbcb939a73e42bb3ca.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
    const edit89163c7a23dd2ccbcb939a73e42bb3caForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit89163c7a23dd2ccbcb939a73e42bb3ca.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
        edit89163c7a23dd2ccbcb939a73e42bb3caForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit89163c7a23dd2ccbcb939a73e42bb3ca.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/secretaria/attendance/edit'
 */
        edit89163c7a23dd2ccbcb939a73e42bb3caForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit89163c7a23dd2ccbcb939a73e42bb3ca.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit89163c7a23dd2ccbcb939a73e42bb3ca.form = edit89163c7a23dd2ccbcb939a73e42bb3caForm
    /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
const edit42f3f2fe40f86043c8f08e476f5847fa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit42f3f2fe40f86043c8f08e476f5847fa.url(options),
    method: 'get',
})

edit42f3f2fe40f86043c8f08e476f5847fa.definition = {
    methods: ["get","head"],
    url: '/admin/attendance/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
edit42f3f2fe40f86043c8f08e476f5847fa.url = (options?: RouteQueryOptions) => {
    return edit42f3f2fe40f86043c8f08e476f5847fa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
edit42f3f2fe40f86043c8f08e476f5847fa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit42f3f2fe40f86043c8f08e476f5847fa.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
edit42f3f2fe40f86043c8f08e476f5847fa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit42f3f2fe40f86043c8f08e476f5847fa.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
    const edit42f3f2fe40f86043c8f08e476f5847faForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit42f3f2fe40f86043c8f08e476f5847fa.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
        edit42f3f2fe40f86043c8f08e476f5847faForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit42f3f2fe40f86043c8f08e476f5847fa.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
        edit42f3f2fe40f86043c8f08e476f5847faForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit42f3f2fe40f86043c8f08e476f5847fa.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit42f3f2fe40f86043c8f08e476f5847fa.form = edit42f3f2fe40f86043c8f08e476f5847faForm

export const edit = {
    '/secretaria/attendance/edit': edit89163c7a23dd2ccbcb939a73e42bb3ca,
    '/admin/attendance/edit': edit42f3f2fe40f86043c8f08e476f5847fa,
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/secretaria/attendance/batch'
 */
const batchStore31740d3ae193ac503fc411aae4051fdf = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchStore31740d3ae193ac503fc411aae4051fdf.url(options),
    method: 'post',
})

batchStore31740d3ae193ac503fc411aae4051fdf.definition = {
    methods: ["post"],
    url: '/secretaria/attendance/batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/secretaria/attendance/batch'
 */
batchStore31740d3ae193ac503fc411aae4051fdf.url = (options?: RouteQueryOptions) => {
    return batchStore31740d3ae193ac503fc411aae4051fdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/secretaria/attendance/batch'
 */
batchStore31740d3ae193ac503fc411aae4051fdf.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchStore31740d3ae193ac503fc411aae4051fdf.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/secretaria/attendance/batch'
 */
    const batchStore31740d3ae193ac503fc411aae4051fdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: batchStore31740d3ae193ac503fc411aae4051fdf.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/secretaria/attendance/batch'
 */
        batchStore31740d3ae193ac503fc411aae4051fdfForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: batchStore31740d3ae193ac503fc411aae4051fdf.url(options),
            method: 'post',
        })
    
    batchStore31740d3ae193ac503fc411aae4051fdf.form = batchStore31740d3ae193ac503fc411aae4051fdfForm
    /**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
const batchStored6db330718025d47b294ded090aa1a01 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchStored6db330718025d47b294ded090aa1a01.url(options),
    method: 'post',
})

batchStored6db330718025d47b294ded090aa1a01.definition = {
    methods: ["post"],
    url: '/admin/attendance/batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
batchStored6db330718025d47b294ded090aa1a01.url = (options?: RouteQueryOptions) => {
    return batchStored6db330718025d47b294ded090aa1a01.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
batchStored6db330718025d47b294ded090aa1a01.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchStored6db330718025d47b294ded090aa1a01.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
    const batchStored6db330718025d47b294ded090aa1a01Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: batchStored6db330718025d47b294ded090aa1a01.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::batchStore
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
        batchStored6db330718025d47b294ded090aa1a01Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: batchStored6db330718025d47b294ded090aa1a01.url(options),
            method: 'post',
        })
    
    batchStored6db330718025d47b294ded090aa1a01.form = batchStored6db330718025d47b294ded090aa1a01Form

export const batchStore = {
    '/secretaria/attendance/batch': batchStore31740d3ae193ac503fc411aae4051fdf,
    '/admin/attendance/batch': batchStored6db330718025d47b294ded090aa1a01,
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
const frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url(options),
    method: 'get',
})

frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.definition = {
    methods: ["get","head"],
    url: '/secretaria/attendance/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url = (options?: RouteQueryOptions) => {
    return frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
    const frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
        frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/secretaria/attendance/report'
 */
        frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0.form = frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0Form
    /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
const frequencyReport8208f32867b13b718a0b479ae598596a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frequencyReport8208f32867b13b718a0b479ae598596a.url(options),
    method: 'get',
})

frequencyReport8208f32867b13b718a0b479ae598596a.definition = {
    methods: ["get","head"],
    url: '/admin/attendance/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
frequencyReport8208f32867b13b718a0b479ae598596a.url = (options?: RouteQueryOptions) => {
    return frequencyReport8208f32867b13b718a0b479ae598596a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
frequencyReport8208f32867b13b718a0b479ae598596a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: frequencyReport8208f32867b13b718a0b479ae598596a.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
frequencyReport8208f32867b13b718a0b479ae598596a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: frequencyReport8208f32867b13b718a0b479ae598596a.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
    const frequencyReport8208f32867b13b718a0b479ae598596aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: frequencyReport8208f32867b13b718a0b479ae598596a.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
        frequencyReport8208f32867b13b718a0b479ae598596aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: frequencyReport8208f32867b13b718a0b479ae598596a.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::frequencyReport
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
        frequencyReport8208f32867b13b718a0b479ae598596aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: frequencyReport8208f32867b13b718a0b479ae598596a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    frequencyReport8208f32867b13b718a0b479ae598596a.form = frequencyReport8208f32867b13b718a0b479ae598596aForm

export const frequencyReport = {
    '/secretaria/attendance/report': frequencyReportefbc85a2ae0755d618cadc1d9ce4e7a0,
    '/admin/attendance/report': frequencyReport8208f32867b13b718a0b479ae598596a,
}

const AttendanceController = { index, edit, batchStore, frequencyReport }

export default AttendanceController