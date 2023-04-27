import {ApplicationFetchData} from "../../../types/applications";
import React, {FC} from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import moment from "moment";
import styles from './applicationElement.style'
import {COLORS} from "../../../constants";
import {request} from "../../../utils";
import {PATCH} from "../../../constants/requests";


interface ApplicationElementProps {
    data: ApplicationFetchData
    refetch: () => void
}

const ApplicationElement: FC<ApplicationElementProps> = ({data, refetch}) => {

    const statusLocalization = {
        sent: 'Відправлено',
        checked: 'Перевірено',
        resolved: 'Прийнято',
        rejected: 'Відмовлено'
    }

    const submitHandler = (): void => {
        request(PATCH, `applications/resolve/${data.id}`)
            .then(() => {
                Alert.alert('Успіх!')
                refetch()
            })
            .catch((error) => Alert.alert('Помилка! ' + error.message))
    }

    const rejectHandler = (): void => {
        request(PATCH, `applications/reject/${data.id}`)
            .then(() => {
                Alert.alert('Успіх!')
                refetch()
            })
            .catch((error) => Alert.alert('Помилка! ' + error.message))
    }

    const checkResumeHandler = (): void => {
        request(PATCH, `applications/check/${data.id}`)
            .then(() => {
                Alert.alert('Успіх!')
                refetch()
            })
            .catch((error) => Alert.alert('Помилка! ' + error.message))
    }

    return (
        <View style={styles.element}>
            <View style={styles.row}>
                <Text style={styles.text}>
                    {data.worker.user.firstName} {data.worker.user.lastName}
                </Text>
                <Text style={styles.text}>
                    {data.worker.user.email}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>
                    {statusLocalization[data.status]}
                </Text>
                <Text style={styles.text}>
                    {moment(data.date).format('dddd MMMM D Y').toString()}
                </Text>
            </View>
            <View style={styles.row}>
                <Button onPress={submitHandler} text={'Підтвердити'}/>
                <Button onPress={rejectHandler} text={'Відмовити'}/>
                <Button onPress={checkResumeHandler} text={'Резюме'}/>
            </View>
        </View>
    )
}
export default ApplicationElement

interface ButtonProps {
    text: string
    onPress: () => void
}

const Button: FC<ButtonProps> = ({text, onPress}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: COLORS.white,
                padding: 5,
                borderRadius: 5,
                marginTop: 10,
                width: '32%'
            }}
        >
            <Text
                style={{
                    color: COLORS.primary,
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}