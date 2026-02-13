import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/aluno/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\GradeController::index
 * @see app/Http/Controllers/Student/GradeController.php:13
 * @route '/aluno/grades'
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
const grades = {
    index: Object.assign(index, index),
}

export default grades