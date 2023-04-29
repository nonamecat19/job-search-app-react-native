import {InfoType} from "../../../types/vacancy"
import {FC} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {COLORS} from "../../../constants"
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
    data: InfoType
    deleteFunc: (id: string) => void
}
const SimpleElement: FC<Props> = ({data, deleteFunc}) => {



    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                marginBottom: 5,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'

            }}
        >
            <Text style={{
                color: COLORS.white,
                padding: 10
            }}>
                {data.name}
            </Text>
            <TouchableOpacity
                style={{
                    padding: 8
                }}
                onPress={() => deleteFunc(data.id)}
            >
                <MaterialIcons name="delete" size={24} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    )
}
export default SimpleElement