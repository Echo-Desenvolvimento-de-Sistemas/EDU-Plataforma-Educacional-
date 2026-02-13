import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
export const validateDocument = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validateDocument.url(args, options),
    method: 'get',
})

validateDocument.definition = {
    methods: ["get","head"],
    url: '/validate-document/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
validateDocument.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return validateDocument.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
validateDocument.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validateDocument.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
validateDocument.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: validateDocument.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
    const validateDocumentForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: validateDocument.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
        validateDocumentForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validateDocument.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Public\DocumentValidationController::validateDocument
 * @see app/Http/Controllers/Public/DocumentValidationController.php:12
 * @route '/validate-document/{uuid}'
 */
        validateDocumentForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validateDocument.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    validateDocument.form = validateDocumentForm
const DocumentValidationController = { validateDocument }

export default DocumentValidationController