import {useState, useEffect} from "react"
import axios from "axios"
import {RequestMethod, RequestPath} from "../types/request";
import {GET} from "../constants/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";


const useFetch = (method: RequestMethod, path: RequestPath, params?: any) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    let myPath = path

    if (params && method === GET) {
        myPath += '?' + new URLSearchParams(params).toString()
    }

    let options: any = {
        method: method,
        url: `https://job-search-app.cyclic.app/${myPath}`
    }

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const token = await AsyncStorage.getItem('@authToken')
            options.headers = {
                "Authorization": `Bearer ${token}`
            }

            const response = await axios.request(options)
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData()
    };

    return {data, isLoading, error, refetch};
}

export default useFetch
