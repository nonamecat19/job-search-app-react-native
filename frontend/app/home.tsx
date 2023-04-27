import React, {useCallback, useEffect, useState} from "react"
import {SafeAreaView, View, FlatList, ScrollView, RefreshControl} from "react-native"
import {Stack, useRouter} from "expo-router"
import {COLORS, icons, SIZES} from "../constants"
import {ScreenHeaderBtn} from "../components"
import useFetch from "../hook/useFetch"
import {GET} from "../constants/requests"
import JobTiles from "../components/home/JobTiles/JobTiles"
import Welcome from "../components/home/welcome/Welcome";
import useStore from "../store/store";
import FetchDataTemplate from "../components/common/FetchDataTemplate";
import {Recommendations} from "../types/vacancy";

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>("")

    let recommend = useFetch<Recommendations>(GET, 'vacancies/recommendations')
    const update = useStore(state => state.updateData)
    useEffect(() => {
        update()
    }, [])

    const zustandData = useStore(state => state.data)

    const handleMenu = () => {
        router.push(zustandData?.role ? `/${zustandData.role}/profile` : `/auth/login`)
    }

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = useCallback((): void => {
        setRefreshing(true);
        recommend.refetch()
        setRefreshing(false)
    }, [recommend.refetch])

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerRight: () => <ScreenHeaderBtn
                        iconUrl={icons.menu}
                        dimension='50%'
                        handlePress={handleMenu}
                    />,
                    headerTitle: "",
                }}
            />
            <View
                style={{
                    flex: 1,
                    padding: SIZES.medium,
                }}
            >
                <Welcome
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => {
                        if (searchTerm) {
                            router.push(`/search/${searchTerm}?`)
                        }
                    }}
                />
                <FetchDataTemplate isLoading={recommend.isLoading} refetch={recommend.refetch}>
                    <FlatList
                        data={recommend.data}
                        renderItem={({item}) => (
                            item.length > 0 &&
                            <JobTiles
                                data={item}
                                title={item[0].category.name}
                            />
                        )}
                        keyExtractor={() => Math.random().toString()}
                    />
                </FetchDataTemplate>
            </View>
        </ScrollView>
    )
}
export default Home
