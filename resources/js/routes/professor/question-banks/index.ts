import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/professor/question-banks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::index
 * @see app/Http/Controllers/Professor/QuestionBankController.php:12
 * @route '/professor/question-banks'
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
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/professor/question-banks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::create
 * @see app/Http/Controllers/Professor/QuestionBankController.php:24
 * @route '/professor/question-banks/create'
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
* @see \App\Http\Controllers\Professor\QuestionBankController::store
 * @see app/Http/Controllers/Professor/QuestionBankController.php:29
 * @route '/professor/question-banks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/professor/question-banks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::store
 * @see app/Http/Controllers/Professor/QuestionBankController.php:29
 * @route '/professor/question-banks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::store
 * @see app/Http/Controllers/Professor/QuestionBankController.php:29
 * @route '/professor/question-banks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::store
 * @see app/Http/Controllers/Professor/QuestionBankController.php:29
 * @route '/professor/question-banks'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::store
 * @see app/Http/Controllers/Professor/QuestionBankController.php:29
 * @route '/professor/question-banks'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
export const show = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/professor/question-banks/{question_bank}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
show.url = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question_bank: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    question_bank: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question_bank: args.question_bank,
                }

    return show.definition.url
            .replace('{question_bank}', parsedArgs.question_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
show.get = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
show.head = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
    const showForm = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
        showForm.get = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::show
 * @see app/Http/Controllers/Professor/QuestionBankController.php:42
 * @route '/professor/question-banks/{question_bank}'
 */
        showForm.head = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
export const edit = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/professor/question-banks/{question_bank}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
edit.url = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question_bank: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    question_bank: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question_bank: args.question_bank,
                }

    return edit.definition.url
            .replace('{question_bank}', parsedArgs.question_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
edit.get = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
edit.head = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
    const editForm = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
        editForm.get = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::edit
 * @see app/Http/Controllers/Professor/QuestionBankController.php:57
 * @route '/professor/question-banks/{question_bank}/edit'
 */
        editForm.head = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
export const update = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/professor/question-banks/{question_bank}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
update.url = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question_bank: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    question_bank: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question_bank: args.question_bank,
                }

    return update.definition.url
            .replace('{question_bank}', parsedArgs.question_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
update.put = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
update.patch = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
    const updateForm = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
        updateForm.put = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::update
 * @see app/Http/Controllers/Professor/QuestionBankController.php:68
 * @route '/professor/question-banks/{question_bank}'
 */
        updateForm.patch = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Professor\QuestionBankController::destroy
 * @see app/Http/Controllers/Professor/QuestionBankController.php:85
 * @route '/professor/question-banks/{question_bank}'
 */
export const destroy = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/professor/question-banks/{question_bank}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::destroy
 * @see app/Http/Controllers/Professor/QuestionBankController.php:85
 * @route '/professor/question-banks/{question_bank}'
 */
destroy.url = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question_bank: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    question_bank: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question_bank: args.question_bank,
                }

    return destroy.definition.url
            .replace('{question_bank}', parsedArgs.question_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Professor\QuestionBankController::destroy
 * @see app/Http/Controllers/Professor/QuestionBankController.php:85
 * @route '/professor/question-banks/{question_bank}'
 */
destroy.delete = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Professor\QuestionBankController::destroy
 * @see app/Http/Controllers/Professor/QuestionBankController.php:85
 * @route '/professor/question-banks/{question_bank}'
 */
    const destroyForm = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Professor\QuestionBankController::destroy
 * @see app/Http/Controllers/Professor/QuestionBankController.php:85
 * @route '/professor/question-banks/{question_bank}'
 */
        destroyForm.delete = (args: { question_bank: string | number } | [question_bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const questionBanks = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default questionBanks