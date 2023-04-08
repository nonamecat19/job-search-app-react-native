import { useState, useEffect } from "react"
import axios from "axios"
import {RequestMethod, RequestPath} from "../types/request";


const useFetch = (method: RequestMethod, path: RequestPath) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: method,
    url: `https://thankful-yoke-crow.cyclic.app/${path}`,
    // method: 'GET',

    // headers: {
    //   "X-RapidAPI-Key": 'b10428f313msh3ebc9da1d3b5e2cp1f92b2jsn48e26f266e19',
    //   "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    // },
    // params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.request(options)

      console.log(response.data)
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

  return { data, isLoading, error, refetch };
}

export default useFetch
