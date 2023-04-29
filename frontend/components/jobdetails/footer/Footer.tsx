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

}

const Footer: FC<Props> = () => {
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
            ' sdaf',
            'sdaf',
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
            {
                resumes.isLoading
                    ? <TouchableOpacity style={{...styles.applyBtn, backgroundColor: COLORS.white}}>
                        <ActivityIndicator color={COLORS.primary} size={'large'}/>
                    </TouchableOpacity>
                    : <TouchableOpacity style={styles.applyBtn} onPress={submitHandler}>
                        <Text style={styles.applyBtnText}>Подати заявку</Text>
                    </TouchableOpacity>
            }

        </View>
    )
}

export default Footer
