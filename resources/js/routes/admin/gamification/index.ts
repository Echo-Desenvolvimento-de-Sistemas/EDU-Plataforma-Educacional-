import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
export const test = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})

test.definition = {
    methods: ["get","head"],
    url: '/admin/gamification/test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
test.url = (options?: RouteQueryOptions) => {
    return test.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
test.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: test.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
test.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: test.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
    const testForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: test.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
        testForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: test.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::test
 * @see app/Http/Controllers/Admin/GamificationTestController.php:20
 * @route '/admin/gamification/test'
 */
        testForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: test.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    test.form = testForm
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: send.url(options),
    method: 'get',
})

send.definition = {
    methods: ["get","head"],
    url: '/admin/gamification/test/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
send.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: send.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
send.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: send.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: send.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
        sendForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: send.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\GamificationTestController::send
 * @see app/Http/Controllers/Admin/GamificationTestController.php:27
 * @route '/admin/gamification/test/export'
 */
        sendForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: send.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    send.form = sendForm
const gamification = {
    test: Object.assign(test, test),
send: Object.assign(send, send),
}

export default gamification