import React, {useEffect, useState} from "react"
import {SafeAreaView, ScrollView, View, Text, FlatList} from "react-native"
import {Stack, useRouter} from "expo-router"

import {COLORS, icons, images, SIZES} from "../constants"
import {
    ScreenHeaderBtn,
    Welcome,
} from "../components"
import useFetch from "../hook/useFetch"
import {GET} from "../constants/requests"
import JobTiles from "../components/home/JobTiles/JobTiles"

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

    let popularData: any = useFetch(GET, 'vacancies')

    let recommend: any = useFetch(GET, 'vacancies/recommendations')


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.lightWhite
        }}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>,
                    headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension='100%'/>,
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
                            <>
                                <Welcome
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    handleClick={() => {
                                        if (searchTerm) {
                                            router.push(`/search/${searchTerm}`)
                                        }
                                    }}
                                />
                                <JobTiles
                                    data={popularData.data}
                                    title={"Популярні роботи"}
                                />
                            </>
                        }
                        data={recommend.data}
                        renderItem={({item}) => (
                            !recommend.isLoading && item.length > 0
                                ? <JobTiles
                                    data={item}
                                    title={item[0].category.name}
                                />
                                : null
                        )}
                        keyExtractor={() => Math.random().toString()}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default Home
