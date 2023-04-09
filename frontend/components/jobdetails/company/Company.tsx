import React, {FC} from "react"
import {View, Text, Image, FlatList, ScrollView} from "react-native"

import styles from "./company.style"
import {COLORS, icons} from "../../../constants"
import {checkImageURL} from "../../../utils"

interface Props {
    data: any
}

const Company: FC<Props> = ({data}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={{
                        uri: checkImageURL(data.logo)
                            ? data.logo
                            : `https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg`
                    }}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{data.title}</Text>
            </View>

            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{data.company.name} / </Text>
                <View style={styles.locationBox}>
                    <Image
                        source={icons.location}
                        resizeMode='contain'
                        style={styles.locationImage}
                    />
                    <Text
                        style={styles.locationName}
                    >
                        {data.location ?? 'Віддалено'}
                    </Text>
                    {data.minSalary &&
                        <Text style={styles.companyName}> / {data.minSalary}грн - {data.maxSalary}грн</Text>
                    }

                </View>
            </View>

            <ScrollView
                horizontal={true}
                style={{marginTop: 5}}
                showsHorizontalScrollIndicator={false}
            >
                <Tag data={data.employmentType}/>
                <Tag data={data.tags[0]}/>
                <Tag data={data.tags[1]}/>
                <Tag data={data.tags[2]}/>
                <Tag data={data.category}/>
            </ScrollView>
        </View>
    )
}

interface TagProps {
    data: {
        name: string,
        id: string
    }
}
const Tag: FC<TagProps> = ({data}) => {
    return data && <Text style={{
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 30,
        color: COLORS.white,
        fontWeight: "700",
        marginHorizontal: 3,
        backgroundColor: COLORS.primary
    }}>{data.name}</Text>
}

export default Company
