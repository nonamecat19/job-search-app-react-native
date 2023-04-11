import React, {FC} from "react"
import {Image, Text, Touchable, TouchableOpacity, View} from "react-native"
import {checkImageURL} from "../../../utils"
import styles from './searchCard.style'
import {useRouter} from "expo-router";


interface Props {
    data: {
        title: string
        company: {
            name: string
            logo?: string
            id: string
        }
        minSalary?: number
        maxSalary?: number
        location?: string
        date: Date
        id: string
    }

}

const SearchCard: FC<Props> = ({data}) => {
    let {title, company, minSalary, maxSalary, location, date, id} = data
    const router = useRouter()
    const getSalary = (): string => {
        if (!minSalary || !maxSalary) {
            return ''
        }
        if (maxSalary === minSalary) {
            return `${maxSalary}грн`
        }
        return `${minSalary}-${maxSalary}грн`
    }

    return (
        <TouchableOpacity style={styles.element}
                          onPress={() => router.push(`/vacancies/${id}`)}
        >
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text>{location ?? 'Віддалено'}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.companyContainer}>
                    <Text style={styles.company}>{company.name}</Text>
                    <Image
                        source={{
                            uri: checkImageURL(company?.logo)
                                ? company?.logo
                                : `https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg`
                        }}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </View>
                <Text style={styles.salary}>{getSalary()}</Text>
            </View>


        </TouchableOpacity>
    )
}
export default SearchCard