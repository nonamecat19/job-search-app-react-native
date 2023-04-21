import React, {FC, useEffect, useState} from "react";
import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, icons} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import AppTextInput from "../../components/common/appTextInput";
import {TagType} from "../../types/tags";
import {request} from "../../utils";
import {GET, POST} from "../../constants/requests";
import {Dropdown} from 'react-native-element-dropdown';
import {AddVacancyType} from "../../types/vacancy";


const Add: FC = () => {
    const router = useRouter()

    const [loading, setIsLoading] = useState<boolean>(true)

    const [tags, setTags] = useState<TagType[]>([])
    const [currentTag, setCurrentTag] = useState<any>([])

    const [categories, setCategories] = useState<any[]>([])
    const [currentCategory, setCurrentCategory] = useState<any>([])

    const [employmentTypes, setEmploymentTypes] = useState<any[]>([])
    const [currentEmploymentTypes, setCurrentEmploymentTypes] = useState<any>([])

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [requirements, setRequirements] = useState<string>('')
    const [offers, setOffers] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [minSalary, setMinSalary] = useState<string>('')
    const [maxSalary, setMaxSalary] = useState<string>('')


    useEffect(() => {
        request(GET, 'tags')
            .then((data) => {
                setTags(data.data)
            })
        request(GET, 'categories')
            .then((data) => {
                setCategories(data.data)
            })
        request(GET, 'employmentTypes')
            .then((data) => {
                setEmploymentTypes(data.data)
            })
        setIsLoading(false)
    }, [])




    const submitHandler = async (): Promise<void> => {
        let data: AddVacancyType = {
            title: name,
            description: description,
            requirements: requirements.split('|'),
            offers: offers.split('|'),
            category: currentCategory,
            employmentType: currentEmploymentTypes,
            tags: [currentTag],
        }
        if (location.length > 0) {
            data.location = location
        }
        if (parseInt(minSalary) > 0 && parseInt(maxSalary) > 0) {
            data.minSalary = parseInt(minSalary)
            data.maxSalary = parseInt(maxSalary)
        }
        request(POST, 'vacancies', data)
            .then((data) => {
                Alert.alert('Успіх')
                router.push('/home')
            })
            .catch((error) => {
                Alert.alert(error)
            })
    }


    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView
                style={{
                    padding: 20,
                }}
            >
                <Text>Назва</Text>
                <AppTextInput value={name} onChangeText={text => setName(text)}/>
                <Text>Опис</Text>
                <AppTextInput value={description} onChangeText={text => setDescription(text)}/>
                <Text>Категорія</Text>
                <MySelect data={categories} value={currentCategory} setValue={setCurrentCategory}/>
                <Text>Тип зайнятості</Text>
                <MySelect data={employmentTypes} value={currentEmploymentTypes} setValue={setCurrentEmploymentTypes}/>
                <Text>Теги</Text>
                <MySelect data={tags} value={currentTag} setValue={setCurrentTag}/>
                <Text>Вимоги (писати через знак "|")</Text>
                <AppTextInput value={requirements} onChangeText={text => setRequirements(text)}/>
                <Text>Пропозиції (писати через знак "|")</Text>
                <AppTextInput value={offers} onChangeText={text => setOffers(text)}/>
                <Text>Місце роботи (залишати пустим якщо віддалено)</Text>
                <AppTextInput value={location} onChangeText={text => setLocation(text)}/>
                <Text>Мінімальна заробітня плата</Text>
                <AppTextInput value={minSalary} onChangeText={text => setMinSalary(text)}/>
                <Text>Максимальна заробітня плата</Text>
                <AppTextInput value={maxSalary} onChangeText={text => setMaxSalary(text)}/>

                <TouchableOpacity
                    style={{
                        padding: 20,
                        backgroundColor: COLORS.primary,
                        borderRadius: 10,
                        marginBottom: 40
                    }}
                    onPress={submitHandler}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            textAlign: 'center'
                        }}
                    >
                        Додати вакансію
                    </Text>
                </TouchableOpacity>

            </ScrollView>


        </SafeAreaView>
    )
}

interface MySelectProps {
    data: any[]
    value: any
    setValue: (any: any) => void
}

const MySelect: FC<MySelectProps> = ({data, value, setValue}) => {
    const [isFocus, setIsFocus] = useState(false)
    return (
        <Dropdown
            style={{
                marginBottom: 20,
                padding: 10,
                height: 50,
                borderBottomColor: COLORS.gray,
                borderBottomWidth: 1,
            }}
            data={data}
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={'Виберіть'}
            value={value}
            onChange={item => setValue(item.id)}
        />
    )
}
export default Add