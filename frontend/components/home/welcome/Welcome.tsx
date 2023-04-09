import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import {GET} from "../../../constants/requests";

const jobTypes = ["Повна", "Часткова", "Контракт"]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter()
  const [activeJobType, setActiveJobType] = useState("Повна")

    const employmentTypesData = useFetch(GET, 'employmentTypes')

  let user = 'Олександр'

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
  );
};

export default Welcome;
