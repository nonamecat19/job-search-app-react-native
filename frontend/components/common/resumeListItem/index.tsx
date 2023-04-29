import {FC} from "react"
import {ResumeType} from "../../../types/resume"
import {Text, TouchableOpacity, View} from "react-native"
import {Link} from "expo-router"
import moment from "moment/moment"
import styles from './resumeListItem.style'
import {FontAwesome5} from '@expo/vector-icons'
import {COLORS} from "../../../constants"
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface Props {
    data: ResumeType
}

const ResumeListItem: FC<Props> = ({data}) => {

    const deleteHandler = (): void => {

    }

    return (
        <View style={styles.element}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {moment(data.date).format('D/M/Y  hh:mm').toString()}
                </Text>
                <View style={styles.container}>
                    <Link href={data.downloadURL} style={styles.download}>
                        <FontAwesome5
                            name="file-download"
                            size={24}
                            color={COLORS.white}
                        />
                    </Link>
                    <TouchableOpacity
                        style={{marginLeft: 15}}
                        onPress={deleteHandler}
                    >
                        <MaterialCommunityIcons
                            name="delete"
                            size={27}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ResumeListItem