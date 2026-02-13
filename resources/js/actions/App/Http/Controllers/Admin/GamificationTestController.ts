import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/gamification/test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::index
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
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
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/gamification/test/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::exportMethod
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const GamificationTestController = { index, exportMethod, export: exportMethod }

export default GamificationTestController