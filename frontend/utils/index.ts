import axios from "axios";
import {RequestMethod, RequestPath, ResponseType} from "../types/request";
import {GET} from "../constants/requests";

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

    const options = {
        method: method,
        url: `https://job-search-app.cyclic.app/${myPath}`,
        data: params,
        // headers: {
        //   "X-RapidAPI-Key": 'b10428f313msh3ebc9da1d3b5e2cp1f92b2jsn48e26f266e19',
        //   "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        // },
    }

    try {
        const response = await axios.request(options)
        return {
            isError: false,
            data: response.data,
            errorMessage: ''
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            errorMessage: error.message
        }
    }
}

