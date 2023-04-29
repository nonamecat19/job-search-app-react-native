import React, {FC} from "react";
import ScreenTemplate from "../../components/common/screenTemplate";
import MenuItem from "../../components/common/menuItem";
import {useRouter} from "expo-router";
import useStore from "../../store/store";

const AdminProfile: FC = ({}) => {

    const router = useRouter()
    const logout = useStore(state => state.logout)

    const logoutHandler = (): void => {
        logout()
        router.push('/home')
    }


    return (
        <ScreenTemplate>
            <MenuItem name={'Статистика'} path={'admin/stats'}/>
            <MenuItem name={'Теги'} path={'admin/tags'}/>
            <MenuItem name={'Типи зайнятості'} path={'admin/employmentTypes'}/>
            <MenuItem name={'Налаштування'} path={'admin/settings'}/>
            <MenuItem name={'Вийти'} func={logoutHandler}/>
        </ScreenTemplate>
    )
}
export default AdminProfile