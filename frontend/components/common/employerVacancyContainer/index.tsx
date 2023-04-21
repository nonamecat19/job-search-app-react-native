import {FC} from "react";
import {FlatList, ScrollView} from "react-native";
import {EmployerVacancies} from "../../../types/employer";
import EmployerVacancyElement from "../employerVacancyElement";

interface Props {
    data: EmployerVacancies[]
}

const EmployerVacancyContainer: FC<Props> = ({data}) => {


    return (
        <ScrollView
            style={{
                padding: 20,
                alignSelf: "stretch",
            }}
        >
            <FlatList
                data={data}
                renderItem={({item}) => <EmployerVacancyElement data={item}/>}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    )
}
export default EmployerVacancyContainer