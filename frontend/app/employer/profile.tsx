import React, {FC} from "react";
import {Stack, useRouter} from "expo-router";
import {View} from "react-native";
import {COLORS, icons} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import useStore from "../../store/store";
import MenuItem from "../../components/common/menuItem";


const Profile: FC = () => {

    const router = useRouter()
    const logout = useStore(state => state.logout)

    const logoutHandler = () => {
        logout()
        router.push('/home')
    }

    return (
        <View style={{
            backgroundColor: COLORS.lightWhite
        }}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <MenuItem name={'Створити вакансію'} path={'employer/add'}/>
            <MenuItem name={'Мої вакансії'} path={'employer/vacancies'}/>
            <MenuItem name={'Мої відгуки'} path={'employer/applications'}/>
            <MenuItem name={'Налаштування'} path={'employer/settings'}/>
            <MenuItem name={'Вийти'} func={logoutHandler}/>

        </View>
    )
}
export default Profile