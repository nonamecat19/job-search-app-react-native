import React, {FC} from "react";
import {View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, icons} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import useFetch from "../../hook/useFetch";
import {GET} from "../../constants/requests";


const Favorite: FC = () => {

    const router = useRouter()

    const {data} = useFetch(GET, '/')

    return (
        <View>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
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
        </View>
    )
}
export default Favorite