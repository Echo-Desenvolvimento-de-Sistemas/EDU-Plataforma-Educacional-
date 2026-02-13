import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
export const store = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/guardians/{guardian}/user',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
store.url = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guardian: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guardian: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guardian: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guardian: typeof args.guardian === 'object'
                ? args.guardian.id
                : args.guardian,
                }

    return store.definition.url
            .replace('{guardian}', parsedArgs.guardian.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
store.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
    const storeForm = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\GuardianController::store
 * @see app/Http/Controllers/Admin/GuardianController.php:150
 * @route '/admin/guardians/{guardian}/user'
 */
        storeForm.post = (args: { guardian: number | { id: number } } | [guardian: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const user = {
    store: Object.assign(store, store),
}

export default user