import {View, Text, TouchableOpacity, Image, Linking, Alert, ActivityIndicator} from "react-native";

import styles from "./footer.style"
import {COLORS, icons} from "../../../constants"
import {FC} from "react"
import {request} from "../../../utils"
import {DELETE, GET, POST} from "../../../constants/requests"
import {useSearchParams} from "expo-router"
import useFetch from "../../../hook/useFetch"

interface Props {

}

const Footer: FC<Props> = () => {
    const {id} = useSearchParams()

    const inSavesRequest = useFetch(GET, `workers/inSaves/${id}`)

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
        request(POST, `applications/${id}`)
            .then(() => {
                Alert.alert('Успіх', 'Заявка усппішно подана! Очікуйте на відповідь від роботодавця.')
            })
            .catch((error) => {
                Alert.alert(error)
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

            <TouchableOpacity
                style={styles.applyBtn}
                onPress={submitHandler}
            >
                <Text style={styles.applyBtnText}>Подати заявку</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer
