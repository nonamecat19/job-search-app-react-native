import {Stack, useRouter, useSearchParams} from "expo-router";
import {useCallback, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import {
    About,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import {COLORS, icons, SIZES} from "../../constants";
import useFetch from "../../hook/useFetch";
import {GET} from "../../constants/requests";
import {FC} from "react"
import Company from "../../components/jobdetails/company/Company";

const tabs = ["Про нас", "Ми пропонуємо", "Вимоги"];

const JobDetails: FC = () => {
    const params = useSearchParams();
    const router = useRouter();

    const {data, isLoading, error, refetch} = useFetch(GET, `vacancies/${params.id}`);

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, [])

    const DisplayTabContent = () => {
        switch (activeTab) {
            case "Ми пропонуємо":
                return (
                    <Specifics
                        title='Ми пропонуємо'
                        // @ts-ignore
                        points={data.offers}
                    />
                );

            case "Про нас":
                return (
                    // @ts-ignore
                    <About info={data.description ?? "No data provided"}/>
                );

            case "Вимоги":
                return (
                    <Specifics
                        title='Вимоги'
                        // @ts-ignore
                        points={data.requirements ?? ["N/A"]}
                    />
                );

            default:
                return null;
        }
    };

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
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension='60%'
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary}/>
                    ) : error ? (
                        <Text>Щось пішло не так</Text>
                    ) : data.length === 0 ? (
                        <Text>Немає даних</Text>
                    ) : (
                        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                            {/*@ts-ignore*/}
                            <Company data={data}/>
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            <DisplayTabContent/>
                        </View>
                    )}
                </ScrollView>

                <JobFooter url={'' ?? 'https://careers.google.com/jobs/results/'}/>
            </>
        </SafeAreaView>
    );
};

export default JobDetails;