import axios from "axios";
import {RequestMethod, RequestPath, ResponseType} from "../types/request";
import {GET} from "../constants/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
}

export const request = async (method: RequestMethod, path: RequestPath, params: any = {}): Promise<ResponseType> => {

    let myPath = path

    if (params && method === GET) {
        myPath += '?' + new URLSearchParams(params).toString()
    }
    const token = await AsyncStorage.getItem('@authToken')
    const options = {
        method: method,
        url: `https://job-search-app.cyclic.app/${myPath}`,
        data: params,
        headers: {
          "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await axios.request(options)
        console.log(response.data)
        return {
            isError: false,
            data: response.data,
            errorMessage: '',
            status: response.status
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            errorMessage: error.message,
            status: error.status
        }
    }
}

