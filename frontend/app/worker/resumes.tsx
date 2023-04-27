import React, {FC, useState} from "react"
import ScreenTemplate from "../../components/common/screenTemplate"
import {Alert, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, Button, Image} from "react-native"
import useFetch from "../../hook/useFetch"
import {GET, POST} from "../../constants/requests"
import {ResumeType} from "../../types/resume"
import FetchDataTemplate from "../../components/common/FetchDataTemplate"
import {COLORS} from "../../constants";
import {request} from "../../utils";
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'expo-image-picker';

const Resumes: FC = () => {

    const {data, isLoading, refetch, error} = useFetch<ResumeType[]>(GET, 'workers/myResumes')

    const [image, setImage] = useState(null)

    const [message, setMessage] = useState<string>('')
    const addResumeHandler = async (): Promise<void> => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        })

        if (result.canceled)
            return

        console.log(result)

        setImage(result.assets[0].uri)

        let requestData = {
            filename: result.assets[0]
        }

        request(POST, 'resumes/add', requestData)
            .then((response) => {
                Alert.alert('Успіх!' + JSON.stringify(response))
                setMessage(JSON.stringify(response))
                // refetch()
            })
            .catch((error) => {
                Alert.alert('Помилка ' + error.message)
                setMessage(JSON.stringify(error))
            })
    }

    return (
        <ScreenTemplate header={'Резюме'}>
            <FetchDataTemplate isLoading={isLoading} refetch={refetch}>
                <TouchableOpacity
                    onPress={addResumeHandler}
                    style={{
                        padding: 10,
                        width: '70%',
                        marginLeft: '15%',
                        marginTop: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            fontSize: 16
                        }}
                    >
                        Додати нове резюме
                    </Text>
                </TouchableOpacity>
                <Text>
                    {/*{JSON.stringify(data)}*/}
                    {message}
                </Text>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Text>{JSON.stringify(item)}</Text>}
                    keyExtractor={(item) => item.id}
                />
            </FetchDataTemplate>

        </ScreenTemplate>
    )
}
export default Resumes
