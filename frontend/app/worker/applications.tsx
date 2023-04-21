import React, {FC} from "react";
import {ActivityIndicator, SafeAreaView} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, icons} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import useFetch from "../../hook/useFetch";
import {GET} from "../../constants/requests";
import ApplicationsContainer from "../../components/applications/ApplicationsContainer";
import {ApplicationFetch} from "../../types/applications";


const Applications: FC = () => {

    const router = useRouter()

    const {data, isLoading, error}: ApplicationFetch = useFetch(GET, 'applications/my')

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
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

            {
                isLoading
                    ? <ActivityIndicator size={'large'} color={COLORS.primary}/>
                    : <ApplicationsContainer data={data}/>
            }

        </SafeAreaView>
    )
}
export default Applications