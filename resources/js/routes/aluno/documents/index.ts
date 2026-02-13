import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/aluno/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DocumentController::index
 * @see app/Http/Controllers/Student/DocumentController.php:14
 * @route '/aluno/documents'
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
* @see \App\Http\Controllers\Student\DocumentController::store
 * @see app/Http/Controllers/Student/DocumentController.php:36
 * @route '/aluno/documents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/aluno/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\DocumentController::store
 * @see app/Http/Controllers/Student/DocumentController.php:36
 * @route '/aluno/documents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DocumentController::store
 * @see app/Http/Controllers/Student/DocumentController.php:36
 * @route '/aluno/documents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Student\DocumentController::store
 * @see app/Http/Controllers/Student/DocumentController.php:36
 * @route '/aluno/documents'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Student\DocumentController::store
 * @see app/Http/Controllers/Student/DocumentController.php:36
 * @route '/aluno/documents'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
export const show = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/aluno/documents/{document}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
show.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { document: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    document: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document: typeof args.document === 'object'
                ? args.document.id
                : args.document,
                }

    return show.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
show.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
show.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
    const showForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
        showForm.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\DocumentController::show
 * @see app/Http/Controllers/Student/DocumentController.php:50
 * @route '/aluno/documents/{document}'
 */
        showForm.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const documents = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
}

export default documents