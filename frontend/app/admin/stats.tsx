import {FC, useMemo} from "react";
import ScreenTemplate from "../../components/common/screenTemplate";
import useFetch from "../../hook/useFetch";
import {GET} from "../../constants/requests";
import FetchDataTemplate from "../../components/common/FetchDataTemplate";
import {StatElement} from "../../types/stat";
import {ScrollView, Text, View, StyleSheet} from "react-native";

const AdminStats: FC = ({}) => {


    const {data, isLoading, error, refetch} = useFetch<StatElement[]>(GET, 'statistics')


    return (
        <ScreenTemplate>
            <FetchDataTemplate isLoading={isLoading} refetch={refetch}>
                {
                    data.map(item => {
                        return (
                            <MyStatElement data={item}/>
                        )
                    })
                }

            </FetchDataTemplate>
        </ScreenTemplate>
    )
}


const MyStatElement = ({data}) => {

    const labels: string[] = [
        'К-сть компаній',
        'К-сть адміністраторів',
        'К-сть працівників',
        'К-сть вакансій',
        'Вакансії без досвіду роботи',
        'Прийняті заявки',
        'Неперевірені заявни',
        'Перевірені заявки',
        'Відхилені заявки',
        'Дата'
    ]


    let arrayData = []

    let date = new Date(data.date)


    for (let prop in data) {
        if (prop !== 'id' && prop !== 'date')
            arrayData.push(data[prop])
    }

    return (
        <View
            style={{
                marginBottom: 20,
                paddingHorizontal: 40,
            }}
        >
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold'
            }}>
                Дата {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}
            </Text>
            {
                arrayData.map((item, index) => {
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text>{labels[index]}</Text>
                            <Text>{item}</Text>
                        </View>
                    )
                })
            }
        </View>
    )

}

export default AdminStats