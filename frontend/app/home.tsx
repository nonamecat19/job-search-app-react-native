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

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>("")

    let recommend = useFetch(GET, 'vacancies/recommendations')
    const update = useStore(state => state.updateData)
    useEffect(() => {
        update()
    }, [])

    const zustandData = useStore(state => state.data)

    const handleMenu = () => {
        router.push(zustandData?.role ? `/${zustandData.role}/profile` : `/auth/login`)
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        recommend.refetch()
        setRefreshing(false)
    }, [])

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
            <SafeAreaView style={{flex: 1}}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <FlatList
                        ListHeaderComponent={
                            <Welcome
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleClick={() => {
                                    if (searchTerm) {
                                        router.push(`/search/${searchTerm}?`)
                                    }
                                }}
                            />
                        }
                        data={recommend.data}
                        renderItem={({item}) => (
                            !recommend.isLoading && item.length > 0
                            && <JobTiles
                                data={item}
                                title={item[0].category.name}
                            />
                        )}
                        keyExtractor={() => Math.random().toString()}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
export default Home
