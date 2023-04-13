import {create} from "zustand"
import {request} from "../utils"
import {GET, POST} from "../constants/requests"

const useStore = create((set) => ({

    data: {},
    updateData: async () => {


        let response = await request(GET, 'users/me')
        set({data: response.data})

        // let token = response.data.token
        //
        // await AsyncStorage.setItem('@authToken', token)
    }
}))

export default useStore