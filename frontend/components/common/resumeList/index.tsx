import React, {FC} from "react";
import {FlatList, ScrollView, Text} from "react-native";
import {ResumeType} from "../../../types/resume";
import ResumeListItem from "../resumeListItem";

interface Props {
    data: ResumeType[]
}

const ResumeList: FC<Props> = ({data}) => {
    return (
        <ScrollView style={{padding: 20}}>
            <FlatList
                data={data}
                renderItem={({item}) => <ResumeListItem data={item}/>}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    )
}
export default ResumeList