import {Stack, useRouter, useSearchParams} from "expo-router";
import {useCallback, useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl, Alert,
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
import useStore from "../../store/store";
import {request} from "../../utils";

const tabs = ["Про нас", "Ми пропонуємо", "Вимоги"];

const JobDetails: FC = () => {
    const params = useSearchParams();
    const router = useRouter();

    const vacancyData = useFetch(GET, `vacancies/${params.id}`)


    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        vacancyData.refetch()
        setRefreshing(false)
    }, [])


    const DisplayTabContent = () => {
        switch (activeTab) {
            case "Ми пропонуємо":
                return (
                    <Specifics
                        title='Ми пропонуємо'
                        // @ts-ignore
                        points={vacancyData.data.offers}
                    />
                );

            case "Про нас":
                return (
                    // @ts-ignore
                    <About info={vacancyData.data.description ?? "No data provided"}/>
                );

            case "Вимоги":
                return (
                    <Specifics
                        title='Вимоги'
                        // @ts-ignore
                        points={vacancyData.data.requirements ?? ["N/A"]}
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
                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {vacancyData.isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                ) : vacancyData.error ? (
                    <Text>Щось пішло не так</Text>
                ) : vacancyData.data.length === 0 ? (
                    <Text>Немає даних</Text>
                ) : (
                    <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                        {/*@ts-ignore*/}
                        <Company data={vacancyData.data}/>
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

        </SafeAreaView>
    );
};

export default JobDetails;
