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
import {WORKER} from "../../constants/roles";
import {CompanyType} from "../../types/employer";

const tabs = ["Про нас", "Ми пропонуємо", "Вимоги"];

const JobDetails: FC = () => {
    const params = useSearchParams();
    const router = useRouter();

    const {data, refetch, error, isLoading} = useFetch<CompanyType>(GET, `vacancies/${params.id}`)


    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, [refetch])


    const zustandData = useStore(state => state.data)

    const DisplayTabContent = () => {
        switch (activeTab) {
            case "Ми пропонуємо":
                return (
                    <Specifics
                        title='Ми пропонуємо'
                        points={data.offers}
                    />
                );

            case "Про нас":
                return (
                    <About info={data.description ?? "No data provided"}/>
                );

            case "Вимоги":
                return (
                    <Specifics
                        title='Вимоги'
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
                    headerTitle: "",
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {isLoading
                    ? <ActivityIndicator size='large' color={COLORS.primary}/>
                    : error
                        ? <Text>Щось пішло не так</Text>
                        : !data
                            ? <Text>Немає даних</Text>
                            : <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                                <Company data={data}/>
                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />

                                <DisplayTabContent/>
                            </View>
                }
            </ScrollView>
            {zustandData?.role === WORKER && <JobFooter available={data.available}/>}

        </SafeAreaView>
    );
};

export default JobDetails;
