import {FC, useState} from "react";
import ScreenTemplate from "../../components/common/screenTemplate";
import useFetch from "../../hook/useFetch";
import {DELETE, GET, POST} from "../../constants/requests";
import FetchDataTemplate from "../../components/common/FetchDataTemplate";
import {InfoType} from "../../types/vacancy";
import SimpleElementList from "../../components/common/simpleElementList";
import AppTextInput from "../../components/common/appTextInput";
import {Alert, Text, TouchableOpacity} from "react-native";
import {request} from "../../utils";

const AdminTags: FC = ({}) => {

    const {data, isLoading, error, refetch} = useFetch<InfoType[]>(GET, 'tags')

    const addFunction = (text: string): void => {
        request(POST, 'tags', {name: text})
            .then(() => {
                Alert.alert('Успіх!')
                refetch()
            })
            .catch((error) => {
                Alert.alert('Помилка ' + error.message)
            })
    }
    const deleteFunction = (id: string): void => {
        request(DELETE, `tags/${id}`)
            .then(() => {
                Alert.alert('Успіх!')
                refetch()
            })
            .catch((error) => {
                Alert.alert('Помилка ' + error.message)
            })
    }

    return (
        <ScreenTemplate>
            <FetchDataTemplate isLoading={isLoading} refetch={refetch}>
                <SimpleElementList data={data} addFunc={addFunction} deleteFunc={deleteFunction}/>
            </FetchDataTemplate>
        </ScreenTemplate>
    )
}
export default AdminTags