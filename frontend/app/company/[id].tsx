import {Stack, useRouter, useSearchParams} from "expo-router"
import React, {useCallback, useState} from "react"
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl, Image,
} from "react-native"

import {
    About,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components"
import {COLORS, icons, SIZES} from "../../constants"
import useFetch from "../../hook/useFetch"
import {GET} from "../../constants/requests"
import {FC} from "react"
import Company from "../../components/jobdetails/company/Company"
import VacancyContainer from "../../components/common/vacancyContainer";
import styles from "../../components/jobdetails/company/company.style";
import {checkImageURL} from "../../utils";
import {CompanyById} from "../../types/employer";

const tabs = ["Про нас", "Вакансії"]

const CompanyDetails: FC = () => {
    const params = useSearchParams()
    const router = useRouter()

    const {data, isLoading, error, refetch} = useFetch<CompanyById>(GET, `companies/${params.id}`);

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, [refetch])

    const DisplayTabContent = () => {
        switch (activeTab) {
            case "Про нас":
                return <About info={data?.description ?? "Немає даних"} text={"Дані про компанію:"}/>

            case "Вакансії":
                return <VacancyContainer data={data?.vacancies ?? []}/>

            default:
                return null
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                ) : error ? (
                    <Text>Щось пішло не так</Text>
                ) : !data ? (
                    <Text>Немає даних</Text>
                ) : (
                    <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                        <View style={styles.container}>
                            <View style={styles.logoBox}>
                                <Image
                                    source={{
                                        uri: checkImageURL(data?.logo)
                                            ? data?.logo
                                            : `https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg`
                                    }}
                                    style={styles.logoImage}
                                />
                            </View>

                            <View style={styles.companyInfoBox}>
                                <Text style={styles.companyName}>{data?.name ?? 'Ім\'я не зазначено'}</Text>
                            </View>
                        </View>
                        <JobTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <DisplayTabContent/>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CompanyDetails
