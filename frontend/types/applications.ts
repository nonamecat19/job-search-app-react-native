export type ApplicationElementType = {
    vacancy: {
        title: string
        company: {
            name: string
            logo: string
            id: string
        }
        id: string
    }
    date: Date
    status: "sent" | "checked" | "resolved" | "rejected"
    id: string
}

export type ApplicationFetch = {
    data: ApplicationElementType[]
    isLoading: boolean
    error: string
}

export type ApplicationFetchData = {
    vacancy: string
    worker: {
        user: {
            firstName: string
            lastName: string
            email: string
            id: string
        }
        id: string
    }
    date: Date
    status: string
    id: string
}