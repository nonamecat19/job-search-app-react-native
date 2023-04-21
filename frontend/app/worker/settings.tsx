import React, {FC, useEffect, useState} from "react";
import {ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, icons} from "../../constants";
import {ScreenHeaderBtn} from "../../components";
import {GET, PATCH} from "../../constants/requests";
import AppTextInput from "../../components/common/appTextInput";
import {request} from "../../utils";
import useStore from "../../store/store";

const Settings: FC = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        request(GET, 'workers/me')
            .then(data => data.data)
            .then((data: any) => {
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setEmail(data.email)
                setIsLoading(false)
            })
    }, [])

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const updateHome = useStore(state => state.updateData)

    const submitHandler = () => {
        let submitData: any = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        if (password !== '') {
            submitData.password = password
        }
        request(PATCH, 'workers/me', submitData)
            .then((data) => {
                if (data.isError) {
                    Alert.alert('Помилка!')
                } else {
                    Alert.alert('Успіх!')
                    updateHome()
                    router.back()
                }
            })
            .catch((error) => {
                Alert.alert('Помилка! ' + error)
            })
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite
                    },
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
            <ScrollView style={{
                padding: 30
            }}>
                {
                    isLoading
                        ? <ActivityIndicator size={'large'}/>
                        : <View>
                            <Text>Ім'я</Text>
                            <AppTextInput value={firstName} onChangeText={data => setFirstName(data)}/>
                            <Text>Прізвище</Text>
                            <AppTextInput value={lastName} onChangeText={data => setLastName(data)}/>
                            <Text>Електронна пошта</Text>
                            <AppTextInput value={email} onChangeText={data => setEmail(data)}/>
                            <Text>Пароль</Text>
                            <AppTextInput value={password} onChangeText={data => setPassword(data)}/>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 10,
                                    paddingVertical: 20
                                }}
                                onPress={submitHandler}
                            >
                                <Text style={{color: COLORS.white}}>Підтвердити</Text>
                            </TouchableOpacity>
                        </View>
                }

            </ScrollView>
        </SafeAreaView>

    )
}
export default Settings