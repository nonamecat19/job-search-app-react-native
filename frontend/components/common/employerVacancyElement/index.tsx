import {FC} from "react";
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {EmployerVacancies} from "../../../types/employer";
import {COLORS} from "../../../constants";
import {useRouter} from "expo-router";
import {request} from "../../../utils";
import {POST} from "../../../constants/requests";

interface Props {
    data: EmployerVacancies
}

const EmployerVacancyElement: FC<Props> = ({data}) => {

    const router = useRouter()
    const infoHandler = (): void => {
        router.push(`/employer/vacancies/applications/${data.id}`)
    }

    const editHandler = (): void => {
        // router.push('')

        //TODO
    }

    const closeHandler = (): void => {
        request(POST, `vacancies/close/${data.id}`)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error('Помилка. Спробуйте ще раз.')
                } else {
                    Alert.alert('Успіх!')
                }
            })
            .catch((error) => {
                Alert.alert(error.message)
                console.log(error)
            })
    }

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                padding: 15,
                borderRadius: 20,
                width: '100%',
                marginBottom: 20,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 20
                }}
            >
                <Text style={{color: COLORS.primary}}>
                    {data.title}
                </Text>
                <Text style={{color: COLORS.primary}}>
                    {data.location ?? 'Віддалено'}
                </Text>
            </View>

            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <ElementButton onPress={infoHandler} text={'Відгуки'}/>
                <ElementButton onPress={editHandler} text={'Редагувати'}/>
                {data.available
                    ? <ElementButton onPress={closeHandler} text={'Закрити'}/>
                    : <ElementButton onPress={() => {}} color={COLORS.gray} text={''}/>
                }

            </View>

        </View>
    )
}
export default EmployerVacancyElement


interface ElementButtonProps {
    onPress: () => void
    text: string
    color?: string
}
const ElementButton: FC<ElementButtonProps> = ({onPress, text, color}) => {

    return (
        <TouchableOpacity
            style={{
                paddingVertical: 4,
                backgroundColor: color ?? COLORS.primary,
                borderRadius: 10,
                width: '32%'
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    textAlign: 'center'
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}
