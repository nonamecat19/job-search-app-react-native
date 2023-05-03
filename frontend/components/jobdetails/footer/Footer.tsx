import {View, Text, TouchableOpacity, Image, Linking, Alert, ActivityIndicator} from "react-native";

import styles from "./footer.style"
import {COLORS, icons} from "../../../constants"
import {FC} from "react"
import {request} from "../../../utils"
import {DELETE, GET, POST} from "../../../constants/requests"
import {useSearchParams} from "expo-router"
import useFetch from "../../../hook/useFetch"
import {ResumeType} from "../../../types/resume";
import moment from "moment";

interface Props {
    available: boolean
}

const Footer: FC<Props> = ({available}) => {
    const {id} = useSearchParams()

    const inSavesRequest = useFetch(GET, `workers/inSaves/${id}`)
    const resumes = useFetch<ResumeType[]>(GET, 'workers/myResumes')

    const saveHandler = async (): Promise<void> => {
        if (inSavesRequest.isLoading) {
            return
        }
        if (inSavesRequest.data) {
            await request(DELETE, `workers/removeSave/${id}`)
        } else {
            await request(POST, `workers/addSave/${id}`)
        }
        await inSavesRequest.refetch()
    }

    const submitHandler = async (): Promise<void> => {
        Alert.alert(
            ' Оберіть резюме',
            '',
            [
                {
                    text: 'Без резюме',
                    onPress: submitRequest
                },
                ...resumes.data.map((item) => ({
                        text: moment(item.date).format('D/M hh:mm').toString(),
                        onPress: () => submitRequest({resume: item.id})
                    })
                )
            ],
            {cancelable: true}
        )
    }

    const submitRequest = (resume?): void => {

        request(POST, `applications/${id}`, resume ?? {})
            .then(() => {
                Alert.alert('Успіх', 'Заявка усппішно подана! Очікуйте на відповідь від роботодавця.')
            })
            .catch((error) => {
                Alert.alert(error.message)
            })
    }

    return (
        <View style={styles.container}>
            {
                inSavesRequest.isLoading
                    ? <ActivityIndicator style={styles.likeBtn} color={COLORS.primary}/>
                    : <TouchableOpacity
                        style={inSavesRequest.data ? styles.dislikeBtn : styles.likeBtn}
                        onPress={saveHandler}
                    >
                        <Image
                            source={icons.heartOutline}
                            resizeMode='contain'
                            style={inSavesRequest.data ? styles.dislikeBtnImage : styles.likeBtnImage}
                        />
                    </TouchableOpacity>
            }
            <FooterButton available={available} isLoading={resumes.isLoading} submitHandler={submitHandler}/>

        </View>
    )
}

interface IFooterButtonProps {
    available: boolean
    isLoading: boolean
    submitHandler: () => void
}
const FooterButton: FC<IFooterButtonProps> = ({available, isLoading, submitHandler}) => {
    if (isLoading) {
        return (
            <TouchableOpacity style={{...styles.applyBtn, backgroundColor: COLORS.white}}>
                <ActivityIndicator color={COLORS.primary} size={'large'}/>
            </TouchableOpacity>
        )
    }

    if (available) {
        return (
            <TouchableOpacity style={styles.applyBtn} onPress={submitHandler}>
                <Text style={styles.applyBtnText}>Подати заявку</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Вакансія закрита</Text>
        </TouchableOpacity>
    )
}

export default Footer
