import {create} from "zustand"
import {request} from "../utils"
import {GET} from "../constants/requests"
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Actions {
    updateData: () => void
    logout: () => void
}

interface State {
    data: any
}

const useStore = create<Actions & State>((set) => ({
    data: {},
    updateData: async () => {
        let response = await request(GET, 'users/me')
        set({data: response.data})
    },
    logout: () => {
        set({data: null})
        AsyncStorage.setItem('@authToken', "")
    }
}))
export default useStore