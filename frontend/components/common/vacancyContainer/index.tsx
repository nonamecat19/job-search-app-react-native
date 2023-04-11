import React, {FC} from "react"
import {TitleInfoType} from "../../../types/vacancy";
import {FlatList, Text} from "react-native";
import VacancyCard from "../vacancyCard";

interface Props {
    data: TitleInfoType[]
}

const VacancyContainer: FC<Props> = ({data}) => {


    return (
        <>
            <FlatList
                data={data}
                renderItem={({item}) => <VacancyCard data={item}/>}
                keyExtractor={() => Math.random().toString()}
            />
        </>
    )
}
export default VacancyContainer