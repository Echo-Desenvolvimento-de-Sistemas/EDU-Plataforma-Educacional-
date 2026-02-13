import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::index
 * @see app/Http/Controllers/Admin/AttendanceController.php:20
 * @route '/admin/attendance'
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
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/attendance/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::edit
 * @see app/Http/Controllers/Admin/AttendanceController.php:159
 * @route '/admin/attendance/edit'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\AttendanceController::batch
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
export const batch = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batch.url(options),
    method: 'post',
})

batch.definition = {
    methods: ["post"],
    url: '/admin/attendance/batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batch
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
batch.url = (options?: RouteQueryOptions) => {
    return batch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::batch
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
batch.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batch.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::batch
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
    const batchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: batch.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::batch
 * @see app/Http/Controllers/Admin/AttendanceController.php:235
 * @route '/admin/attendance/batch'
 */
        batchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: batch.url(options),
            method: 'post',
        })
    
    batch.form = batchForm
/**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
export const report = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ["get","head"],
    url: '/admin/attendance/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
report.url = (options?: RouteQueryOptions) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
report.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
report.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
    const reportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: report.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
        reportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AttendanceController::report
 * @see app/Http/Controllers/Admin/AttendanceController.php:292
 * @route '/admin/attendance/report'
 */
        reportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    report.form = reportForm
const attendance = {
    index: Object.assign(index, index),
edit: Object.assign(edit, edit),
batch: Object.assign(batch, batch),
report: Object.assign(report, report),
}

export default attendance