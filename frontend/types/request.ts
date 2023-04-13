export type RequestMethod = 'get' | 'post' | 'patch' | 'delete'
export type RequestPath = string

export type ResponseType = {
    isError: boolean
    data: any
    errorMessage: string
}