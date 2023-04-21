export type VacancyType = {
    title: string
    company: InfoType
    description: string
    minSalary?: number
    maxSalary?: number
    // logo?: string
    requirements: string[]
    offers: string[]
    date: Date
    category: InfoType
    employmentType: InfoType
    tags: InfoType[]
    available: boolean
    id: string
}

export type AddVacancyType = {
    title: string
    description: string
    requirements: string[]
    offers: string[]
    location?: string
    category: string
    employmentType: string
    tags: string[]
    minSalary?: number
    maxSalary?: number
}

export type InfoType = {
    name: string
    id: string
}

export type TitleInfoType = {
    title: string
    id: string
}
