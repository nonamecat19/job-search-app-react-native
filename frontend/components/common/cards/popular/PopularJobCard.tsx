import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      //@ts-ignore
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      {/*@ts-ignore*/}
      <TouchableOpacity style={styles.logoContainer()}>
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
        <Text style={styles.companyName} numberOfLines={1}>
          {item.company.name}
        </Text>
      </TouchableOpacity>


      <View style={styles.infoContainer}>
        {/*@ts-ignore*/}
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.infoWrapper}>
          {/*@ts-ignore*/}
          <Text style={styles.publisher(selectedJob, item)}>
            {item?.location ?? ''} -
            {item?.tags.map((element) => element.name)}
          </Text>
          {/*<Text style={styles.location}> {item.job_country}</Text>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
