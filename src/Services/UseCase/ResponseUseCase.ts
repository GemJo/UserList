export type ResponseUseCase<PropertyName extends string, T> = {
    success: boolean,
    error?: string | unknown,
} & {[P in PropertyName]?: T}