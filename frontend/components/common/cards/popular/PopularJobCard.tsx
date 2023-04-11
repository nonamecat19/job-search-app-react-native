import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";
import {useRouter} from "expo-router";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  const router = useRouter()
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
            uri: checkImageURL(item?.company?.logo)
              ? item.company?.logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
        <Text
            style={styles.companyName}
            numberOfLines={1}
            onPress={() => router.push(`/company/${item.company.id}`)}
        >
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
            {item?.location ?? ''}
            {item?.minSalary && ` ${item?.minSalary} ${item?.maxSalary !== item?.minSalary && ` - ${item?.maxSalary}`} грн`}
          </Text>
          {/*<Text style={styles.location}> {item.job_country}</Text>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
