import {FC} from "react";
import ScreenTemplate from "../../components/common/screenTemplate";
import useFetch from "../../hook/useFetch";
import {DELETE, GET, POST} from "../../constants/requests";
import FetchDataTemplate from "../../components/common/FetchDataTemplate";
import {InfoType} from "../../types/vacancy";
import {Alert, Text} from "react-native";
import SimpleElement from "../../components/common/simpleElement";
import SimpleElementList from "../../components/common/simpleElementList";
import {request} from "../../utils";

const AdminEmploymentTypes: FC = ({}) => {

    const {data, isLoading, error, refetch} = useFetch<InfoType[]>(GET, 'employmentTypes')

    const addFunction = (text: string): void => {
        request(POST, 'employmentTypes', {name: text})
            .then(() => {
                Alert.alert('Успіх!')
                refetch()
            })
            .catch((error) => {
                Alert.alert('Помилка ' + error.message)
            })
    }

    const deleteFunction = (id: string): void => {
        request(DELETE, `employmentTypes/${id}`)
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
export default AdminEmploymentTypes