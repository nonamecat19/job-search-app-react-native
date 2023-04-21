import React, {FC} from "react"
import {Image, Text, TouchableOpacity, View} from "react-native"
import styles from './ApplicationsItem.style'
import {ApplicationElementType} from "../../../types/applications";
import {checkImageURL} from "../../../utils";
import moment from "moment";
import {useRouter} from "expo-router";

interface Props {
    data: ApplicationElementType
}

const ApplicationsItem: FC<Props> = ({data}) => {

    const router = useRouter()

    const pressHandler = () => {
        router.push(`/vacancies/${data?.vacancy?.id}`)
    }

    return (
        <TouchableOpacity
            style={styles.element}
            onPress={pressHandler}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{data?.vacancy?.title ?? ''}</Text>
                <Text>{data?.status}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.companyContainer}>
                    <Image
                        source={{
                            uri: checkImageURL(data?.vacancy?.company?.logo)
                                ? data.vacancy.company.logo
                                : `https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg`
                        }}
                        style={styles.logoImage}
                    />
                    <Text style={styles.companyName}>{data?.vacancy?.company?.name ?? ''}</Text>
                </View>
                <Text>{moment(data?.date).format('dddd MMMM D Y').toString()}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default ApplicationsItem