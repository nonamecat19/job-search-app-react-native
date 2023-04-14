import React, { useEffect, useState } from 'react'
// import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import {Text, SafeAreaView, View, FlatList, ActivityIndicator} from 'react-native'
// import axios from 'axios'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import useFetch from "../../hook/useFetch";
import {GET} from "../../constants/requests"
import SearchCard from "../../components/common/search";

const JobSearch = () => {
    const [params, setParams] = useState(useSearchParams())

    const router = useRouter()
    //
    const {data, isLoading, error} = useFetch(GET, '/vacancies/search/', params)
    // const [searchLoader, setSearchLoader] = useState(false)
    // const [searchError, setSearchError] = useState(null)
    // const [page, setPage] = useState(1)

    // const handleSearch = async () => {
    //     setSearchLoader(true)
    //     setSearchResult([])
    //
    //     try {
    //         const options = {
    //             method: "GET",
    //             url: `https://jsearch.p.rapidapi.com/search`,
    //             headers: {
    //                 "X-RapidAPI-Key": '',
    //                 "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    //             },
    //             params: {
    //                 query: params.id,
    //                 page: page.toString(),
    //             },
    //         }
    //
    //         // const response = await axios.request(options)
    //         // setSearchResult(response.data.data)
    //     } catch (error) {
    //         setSearchError(error)
    //         console.log(error)
    //     } finally {
    //         setSearchLoader(false)
    //     }
    // }
    //
    // const handlePagination = (direction) => {
    //     if (direction === 'left' && page > 1) {
    //         setPage(page - 1)
    //         handleSearch()
    //     } else if (direction === 'right') {
    //         setPage(page + 1)
    //         handleSearch()
    //     }
    // }
    //
    // useEffect(() => {
    //     handleSearch()
    // }, [])

    if (isLoading) {
        return <ActivityIndicator/>
    }

    if (error) {
        return <Text>Виникла помилка</Text>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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
            {/*<Text>{JSON.stringify(data)}</Text>*/}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    // <NearbyJobCard
                    //     job={item}
                    //     handleNavigate={() => router.push(`/vacancies/${item.job_id}`)}
                    // />
                    <SearchCard data={item}/>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.query}</Text>
                            <Text style={styles.noOfSearchedJobs}>Знайдені вакансії</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {/*{searchLoader ? (*/}
                            {/*    <ActivityIndicator size='large' color={COLORS.primary} />*/}
                            {/*) : searchError && (*/}
                            {/*    <Text>Щось пішло не так</Text>*/}
                            {/*)}*/}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        {/*<TouchableOpacity*/}
                        {/*    style={styles.paginationButton}*/}
                        {/*    onPress={() => handlePagination('left')}*/}
                        {/*>*/}
                        {/*    <Image*/}
                        {/*        source={icons.chevronLeft}*/}
                        {/*        style={styles.paginationImage}*/}
                        {/*        resizeMode="contain"*/}
                        {/*    />*/}
                        {/*</TouchableOpacity>*/}
                        {/*<View style={styles.paginationTextBox}>*/}
                        {/*    <Text style={styles.paginationText}>{page}</Text>*/}
                        {/*</View>*/}
                        {/*<TouchableOpacity*/}
                        {/*    style={styles.paginationButton}*/}
                        {/*    onPress={() => handlePagination('right')}*/}
                        {/*>*/}
                        {/*    <Image*/}
                        {/*        source={icons.chevronRight}*/}
                        {/*        style={styles.paginationImage}*/}
                        {/*        resizeMode="contain"*/}
                        {/*    />*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default JobSearch