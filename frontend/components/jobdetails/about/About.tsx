import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ info, text = "Про роботу:" }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{text}</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  )
}

export default About;
