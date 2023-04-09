import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, View, Text, FlatList} from "react-native";
import {Stack, useRouter} from "expo-router";

import {COLORS, icons, images, SIZES} from "../constants";
import {
    ScreenHeaderBtn,
    Welcome,
} from "../components";
import useFetch from "../hook/useFetch";
import {GET} from "../constants/requests";
import JobTiles from "../components/home/JobTiles/JobTiles";

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");

    let popularData: any = useFetch(GET, 'vacancies')

    // let recommend: any = useFetch(GET, 'categories')
    let recommend: any = [
        [
            {
                "title": "Full-Stack Devloper",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T12:18:56.340Z",
                "category": {
                    "name": "IT",
                    "id": "64272cd9ea66eabf36fdc63f"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "6432ad30a979c43451022b4f"
            }
        ],
        [
            {
                "title": "Прораб",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T08:13:27.203Z",
                "category": {
                    "name": "Будівництво",
                    "id": "64326fad78cd03aa454e8322"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "643273a778cd03aa454e8337"
            }
        ],
        [
            {
                "title": "Фізрук",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T12:18:08.461Z",
                "category": {
                    "name": "Спорт",
                    "id": "64326fb478cd03aa454e8324"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "6432ad00a979c43451022b37"
            },
            {
                "title": "Фізрук2",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T12:18:15.532Z",
                "category": {
                    "name": "Спорт",
                    "id": "64326fb478cd03aa454e8324"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "6432ad07a979c43451022b3b"
            },
            {
                "title": "Фізрук3",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T12:18:19.355Z",
                "category": {
                    "name": "Спорт",
                    "id": "64326fb478cd03aa454e8324"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "6432ad0ba979c43451022b3f"
            },
            {
                "title": "Фізрук4",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T12:18:23.229Z",
                "category": {
                    "name": "Спорт",
                    "id": "64326fb478cd03aa454e8324"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "6432ad0fa979c43451022b43"
            },
            {
                "title": "Фізрук5",
                "company": "6427039723f7d781380ef3f8",
                "description": "Ми шукаємо Evently розробника для свого проекту",
                "requirements": [
                    "Знання Evently"
                ],
                "offers": [
                    "Gym"
                ],
                "date": "2023-04-09T12:18:26.809Z",
                "category": {
                    "name": "Спорт",
                    "id": "64326fb478cd03aa454e8324"
                },
                "employmentTypes": [
                    "64271b212de62578ef2e0f11",
                    "643116a79a405e403c1ecb73",
                    "64311715f9df9070c79d6ea2"
                ],
                "tags": [
                    "64272bbbf82b946f94de9393"
                ],
                "available": true,
                "id": "6432ad12a979c43451022b47"
            }
        ],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    const [categoryData, setCategoryData] = useState([])

    useEffect(() => {

    }, [recommend])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension='100%'/>
                    ),
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
                                <JobTiles data={popularData.data} title={"Популярні роботи"}/>
                            </>
                        }
                        data={recommend}
                        renderItem={({item}) => (
                            item.length > 0
                                ? <JobTiles data={item} title={item[0].category.name}/>
                                : null
                        )}
                        keyExtractor={(item) => item.id}

                    />

                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default Home;
