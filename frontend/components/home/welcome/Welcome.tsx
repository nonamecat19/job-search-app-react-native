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
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
    const router = useRouter()


    const [user, setUser] = useState<string>('Гість')

    useEffect(() => {
        AsyncStorage.getItem('@userData')
            .then (data => {
                return JSON.parse(data)
            })
            .catch(() => {})
            .then(data => {
                if (data.firstName) {
                    setUser(data.firstName)
                }
            })
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Привіт {user}</Text>
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
