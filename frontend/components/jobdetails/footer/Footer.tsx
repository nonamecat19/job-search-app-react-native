import {View, Text, TouchableOpacity, Image, Linking, Alert, ActivityIndicator} from "react-native";

import styles from "./footer.style";
import {COLORS, icons} from "../../../constants";
import {useState} from "react";
import {request} from "../../../utils";
import {DELETE, GET, POST} from "../../../constants/requests";
import {useSearchParams} from "expo-router";
import useFetch from "../../../hook/useFetch";

const Footer = ({url}) => {
    const params = useSearchParams()

    const inSavesRequest = useFetch(GET, `workers/inSaves/${params.id}`)

    const saveHandler = async () => {
        if (inSavesRequest.isLoading) {
            return
        }
        if (inSavesRequest.data) {
            await request(DELETE, `workers/removeSave/${params.id}`)
        } else {
            await request(POST, `workers/addSave/${params.id}`)
        }
        await inSavesRequest.refetch()
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
                onPress={() => Linking.openURL(url)}
            >
                <Text style={styles.applyBtnText}>Подати заявку</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
