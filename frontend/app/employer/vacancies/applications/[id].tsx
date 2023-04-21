import React, {FC, useCallback, useState} from "react"
import {ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View} from "react-native"
import {Stack, useRouter, useSearchParams} from "expo-router"
import useFetch from "../../../../hook/useFetch"
import {GET} from "../../../../constants/requests"
import {COLORS, icons} from "../../../../constants"
import {ScreenHeaderBtn} from "../../../../components"

const Applications: FC = () => {
    const router = useRouter()
    const params = useSearchParams()

    const {data, isLoading, refetch, error} = useFetch<FetchData[]>(GET, `applications/vacancy/${params.id}`)

    const [refreshing, setRefreshing] = useState(false)

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
                    ? (
                        <ActivityIndicator
                            size={'large'}
                            color={COLORS.primary}
                        />
                    )
                    : (
                        <FlatList
                            data={data}
                            renderItem={({item}) => <ApplicationElement data={item}/>}
                            keyExtractor={(item) => item.id}
                        />
                    )
            }

        </ScrollView>
    )
}
export default Applications

type FetchData = {
    vacancy: string
    worker: {
        user: {
            firstName: string
            lastName: string
            email: string
            id: string
        }
        id: string
    }
    date: Date
    status: string
    id: string
}

interface ApplicationElementProps {
    data: FetchData
}

const ApplicationElement: FC<ApplicationElementProps> = ({data}) => {


    return (
        <View>
            <Text>
                {JSON.stringify(data)}
            </Text>
        </View>
    )
}