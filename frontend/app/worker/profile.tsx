import React, {FC} from "react";
import {Stack, useRouter} from "expo-router";
import {View} from "react-native";
import {COLORS, icons, images} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import useStore from "../../store/store";
import {WORKER} from "../../constants/roles";
import MenuItem from "../../components/common/menuItem";


const Profile: FC = () => {

    const router = useRouter()

    const data = useStore(state => state.data)
    const logout = useStore(state => state.logout)

    const logoutHandler = () => {
        logout()
        router.push('/home')
    }

    return (
        <View style={{backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
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

            <MenuItem name={'Мої резюме'} path={'worker/resumes'}/>
            <MenuItem name={'Улюблені вакансії'} path={'worker/favorite'}/>
            <MenuItem name={'Мої відгуки'} path={'worker/applications'}/>
            <MenuItem name={'Налаштування'} path={'worker/settings'}/>
            <MenuItem name={'Вийти'} func={logoutHandler}/>

        </View>
    )
}
export default Profile