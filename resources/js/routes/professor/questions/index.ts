import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/professor/questions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionController::create
 * @see app/Http/Controllers/Professor/QuestionController.php:14
 * @route '/professor/questions/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Professor\QuestionController::store
 * @see app/Http/Controllers/Professor/QuestionController.php:28
 * @route '/professor/questions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/professor/questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\QuestionController::store
 * @see app/Http/Controllers/Professor/QuestionController.php:28
 * @route '/professor/questions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionController::store
 * @see app/Http/Controllers/Professor/QuestionController.php:28
 * @route '/professor/questions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionController::store
 * @see app/Http/Controllers/Professor/QuestionController.php:28
 * @route '/professor/questions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionController::store
 * @see app/Http/Controllers/Professor/QuestionController.php:28
 * @route '/professor/questions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
export const edit = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/professor/questions/{question}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
edit.url = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question: args.question,
                }

    return edit.definition.url
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
edit.get = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
edit.head = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
    const editForm = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
        editForm.get = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionController::edit
 * @see app/Http/Controllers/Professor/QuestionController.php:0
 * @route '/professor/questions/{question}/edit'
 */
        editForm.head = (args: { question: string | number } | [question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
export const update = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/professor/questions/{question}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
update.url = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { question: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return update.definition.url
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
update.put = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
update.patch = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
    const updateForm = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
        updateForm.put = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionController::update
 * @see app/Http/Controllers/Professor/QuestionController.php:84
 * @route '/professor/questions/{question}'
 */
        updateForm.patch = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Professor\QuestionController::destroy
 * @see app/Http/Controllers/Professor/QuestionController.php:161
 * @route '/professor/questions/{question}'
 */
export const destroy = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/professor/questions/{question}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Professor\QuestionController::destroy
 * @see app/Http/Controllers/Professor/QuestionController.php:161
 * @route '/professor/questions/{question}'
 */
destroy.url = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { question: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return destroy.definition.url
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionController::destroy
 * @see app/Http/Controllers/Professor/QuestionController.php:161
 * @route '/professor/questions/{question}'
 */
destroy.delete = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionController::destroy
 * @see app/Http/Controllers/Professor/QuestionController.php:161
 * @route '/professor/questions/{question}'
 */
    const destroyForm = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionController::destroy
 * @see app/Http/Controllers/Professor/QuestionController.php:161
 * @route '/professor/questions/{question}'
 */
        destroyForm.delete = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const questions = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default questions