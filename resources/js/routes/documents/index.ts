import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
export const validate = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validate.url(args, options),
    method: 'get',
})

validate.definition = {
    methods: ["get","head"],
    url: '/validate-document/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
validate.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return validate.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
validate.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validate.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
validate.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: validate.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
    const validateForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: validate.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
        validateForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validate.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\DocumentValidationController::validate
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
        validateForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    validate.form = validateForm
const documents = {
    validate: Object.assign(validate, validate),
}

export default documents