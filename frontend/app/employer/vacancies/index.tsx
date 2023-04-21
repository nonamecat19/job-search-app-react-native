import React, {FC, useCallback, useState} from "react";
import {Text, ActivityIndicator, ScrollView, RefreshControl} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, icons} from "../../../constants";
import {ScreenHeaderBtn} from "../../../components";
import useFetch from "../../../hook/useFetch";
import {GET} from "../../../constants/requests";
import EmployerVacancyContainer from "../../../components/common/employerVacancyContainer";
import {EmployerVacancies} from "../../../types/employer";


const Vacancies: FC = () => {

    const router = useRouter()

    const {data, isLoading, refetch} = useFetch<EmployerVacancies[]>(GET, 'companies/vacancies')

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, [refetch])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
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

            {
                isLoading
                    ? <ActivityIndicator size={"large"} color={COLORS.primary}/>
                    : data.length > 0
                        ? <EmployerVacancyContainer data={data}/>
                        : <Text
                            style={{
                                fontSize: 20,
                                color: COLORS.primary,
                                padding: 20,
                                textAlign: "center"
                            }}
                        >
                            Покищо ви не зберігали вакансії. Це можна зробити натиснувши на сердечко
                        </Text>
            }
        </ScrollView>
    )
}

export default Vacancies