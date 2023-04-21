import {InfoType, TitleInfoType} from "./vacancy";

export type EmployerVacancies = {
    title: string
    location?: string
    available: boolean
    id: string
}


export type CompanyType = {
    title: string
    company: {
        name: string
        logo: string
        id: string
    }
    description: string
    location?: string
    minSalary?: number
    maxSalary?: number
    requirements: string[]
    offers: string[]
    date: Date
    category: InfoType
    employmentType: InfoType
    tags: InfoType[]
    available: boolean
    id: string
}

export type CompanyById = {
    name: string
    description: string
    logo?: string
    vacancies: TitleInfoType[]
    id: string
}