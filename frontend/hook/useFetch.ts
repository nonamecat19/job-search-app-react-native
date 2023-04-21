import {useState, useEffect} from "react"
import axios, {AxiosResponse} from "axios"
import {RequestMethod, RequestPath} from "../types/request";
import {GET} from "../constants/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

type useFetchReturn<T> = {
    data: T
    isLoading: boolean
    error: string | null
    refetch: () => void
}

const useFetch = <T>(method: RequestMethod, path: RequestPath, params?: any): useFetchReturn<T> => {
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    let myPath: string = path

    if (params && method === GET) {
        myPath += '?' + new URLSearchParams(params).toString()
    }

    let options: any = {
        method: method,
        url: `https://job-search-app.cyclic.app/${myPath}`
    }

    const fetchData = async (): Promise<void> => {
        setIsLoading(true)
        try {
            const token: string = await AsyncStorage.getItem('@authToken')
            options.headers = {
                "Authorization": `Bearer ${token}`
            }
            const response: AxiosResponse = await axios.request(options)
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData().then(() => {})
    }, [])

    const refetch = (): void => {
        setIsLoading(true);
        fetchData().then(() => {})
    }

    return {data, isLoading, error, refetch};
}

export default useFetch



