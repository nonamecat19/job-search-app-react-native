import { View, Text } from "react-native";

import styles from "./about.style";

const About = ({ info }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Про роботу:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  )
}

export default About;
