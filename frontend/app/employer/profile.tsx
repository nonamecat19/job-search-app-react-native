import React, {FC} from "react";
import {Stack, useRouter} from "expo-router";
import {View} from "react-native";
import {COLORS, icons} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import useStore from "../../store/store";
import MenuItem from "../../components/common/menuItem";
import ScreenTemplate from "../../components/common/screenTemplate";


const Profile: FC = () => {

    const router = useRouter()
    const logout = useStore(state => state.logout)

    const logoutHandler = () => {
        logout()
        router.push('/home')
    }

    return (
        <ScreenTemplate>
            <MenuItem name={'Створити вакансію'} path={'employer/add'}/>
            <MenuItem name={'Мої вакансії'} path={'employer/vacancies'}/>
            <MenuItem name={'Налаштування'} path={'employer/settings'}/>
            <MenuItem name={'Вийти'} func={logoutHandler}/>
        </ScreenTemplate>
    )
}
export default Profile