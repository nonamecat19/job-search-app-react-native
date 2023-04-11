import React, {FC} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import styles from './vacancyCard.style'
import {TitleInfoType} from "../../../types/vacancy";
import {useRouter} from "expo-router";

interface Props {
    data: TitleInfoType
}
const VacancyCard: FC<Props> = ({data}) => {
    let router = useRouter()
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/vacancies/${data.id}`)}
        >
            <Text style={styles.title}>
                {data.title}
            </Text>
        </TouchableOpacity>
    )
}
export default VacancyCard