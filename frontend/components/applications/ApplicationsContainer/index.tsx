import {FC} from "react"
import {FlatList, ScrollView, View} from "react-native"
import styles from './ApplicationsContainer.style'
import ApplicationsItem from "../ApplicationsItem";
import {ApplicationElementType} from "../../../types/applications";



interface Props {
    data: ApplicationElementType[]
}

const ApplicationsContainer: FC<Props> = ({data}) => {

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <ApplicationsItem data={item}/>}
            />
        </ScrollView>
    )
}
export default ApplicationsContainer