import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/document-templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::index
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:15
 * @route '/admin/document-templates'
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
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/document-templates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::create
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:26
 * @route '/admin/document-templates/create'
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
* @see \App\Http\Controllers\Admin\DocumentTemplateController::store
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:34
 * @route '/admin/document-templates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/document-templates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::store
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:34
 * @route '/admin/document-templates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::store
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:34
 * @route '/admin/document-templates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::store
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:34
 * @route '/admin/document-templates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::store
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:34
 * @route '/admin/document-templates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
export const show = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/document-templates/{document_template}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
show.url = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_template: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    document_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document_template: args.document_template,
                }

    return show.definition.url
            .replace('{document_template}', parsedArgs.document_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
show.get = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
show.head = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
    const showForm = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
        showForm.get = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::show
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:51
 * @route '/admin/document-templates/{document_template}'
 */
        showForm.head = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
export const edit = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/document-templates/{document_template}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
edit.url = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_template: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    document_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document_template: args.document_template,
                }

    return edit.definition.url
            .replace('{document_template}', parsedArgs.document_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
edit.get = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
edit.head = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
    const editForm = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
        editForm.get = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::edit
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:59
 * @route '/admin/document-templates/{document_template}/edit'
 */
        editForm.head = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
export const update = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/document-templates/{document_template}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
update.url = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_template: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    document_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document_template: args.document_template,
                }

    return update.definition.url
            .replace('{document_template}', parsedArgs.document_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
update.put = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
update.patch = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
    const updateForm = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
        updateForm.put = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::update
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:69
 * @route '/admin/document-templates/{document_template}'
 */
        updateForm.patch = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\DocumentTemplateController::destroy
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:86
 * @route '/admin/document-templates/{document_template}'
 */
export const destroy = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/document-templates/{document_template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::destroy
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:86
 * @route '/admin/document-templates/{document_template}'
 */
destroy.url = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document_template: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    document_template: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        document_template: args.document_template,
                }

    return destroy.definition.url
            .replace('{document_template}', parsedArgs.document_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::destroy
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:86
 * @route '/admin/document-templates/{document_template}'
 */
destroy.delete = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::destroy
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:86
 * @route '/admin/document-templates/{document_template}'
 */
    const destroyForm = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DocumentTemplateController::destroy
 * @see app/Http/Controllers/Admin/DocumentTemplateController.php:86
 * @route '/admin/document-templates/{document_template}'
 */
        destroyForm.delete = (args: { document_template: string | number } | [document_template: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const DocumentTemplateController = { index, create, store, show, edit, update, destroy }

export default DocumentTemplateController