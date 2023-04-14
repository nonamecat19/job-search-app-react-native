import {FC} from "react";
import {TouchableOpacity, Text} from "react-native";
import {useRouter} from "expo-router";
import styles from "./menuItem.style";

interface Props {
    name: string
    path?: string
    func?: () => void
}

const MenuItem: FC<Props> = ({name, path, func}) => {

    const router = useRouter()

    const onPressHandler = () => {
        if (func) {
            func()
        }
        if (path) {
            router.push(`/${path}`)
        }
    }

    return (
        <TouchableOpacity
            onPress={onPressHandler}
            style={styles.item}
        >
            <Text style={styles.text}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}
export default MenuItem