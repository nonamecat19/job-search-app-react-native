import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList, Alert,
} from "react-native"
import {useRouter} from "expo-router"

import styles from "./welcome.style"
import {icons} from "../../../constants"
import useStore from "../../../store/store";

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
    const router = useRouter()

    const zustandData = useStore(state => state.data)

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Привіт {zustandData?.firstName ?? 'Гість'}</Text>
                <Text style={styles.welcomeMessage}>Знайдіть свою ідеальну роботу</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder='Що ви шукаєте?'
                    />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image
                        source={icons.search}
                        resizeMode='contain'
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Welcome
