import React, {FC, useEffect, useState} from "react";
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {COLORS, icons} from "../../constants";
import AppTextInput from "../../components/common/appTextInput";
import {Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"
import SwitchSelector from 'react-native-switch-selector'
import {COMPANY, WORKER} from "../../constants/roles";
import {request} from "../../utils";
import {GET, POST} from "../../constants/requests";
import {ScreenHeaderBtn} from "../../components";
import useStore from "../../store/store";

interface Props {

}

const Login: FC<Props> = () => {

    const [isRegister, setIsRegister] = useState(false)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()
    const changeHandler = async () => {
        setIsRegister(!isRegister)
    }


    const [role, setRole] = useState<string>(WORKER)


    const updateData = useStore(state => state.updateData)

    const submitHandler = async () => {

        let data = {
            email: email,
            password: password
        }

        if (isRegister) {
            try {
                //
                Alert.alert(JSON.stringify(data))
                // TODO: LOGIN
            } catch (error) {
                Alert.alert(error.message)
            }
        } else {
            try {
                let response = await request(POST, 'users/login', data)
                let token = response.data.token
                await AsyncStorage.setItem('@authToken', token)
                await updateData()
                router.push('/home')
            } catch (error) {
                Alert.alert(error.message)
            }
        }
    }

    const options = [
        { label: 'Шукаю роботу', value: WORKER },
        { label: 'Я роботодавець', value: COMPANY }
    ]

    return(
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.white2},
                    headerShadowVisible: false,
                    headerBackVisible: false,
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
            <View
                style={{
                    padding: 30,
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            color: COLORS.primary,
                            // fontFamily: Font["poppins-bold"],
                            marginVertical: 20,
                        }}
                    >
                        {isRegister ? 'Зареєструватися' : 'Увійти'}
                    </Text>
                </View>
                <View>
                    <AppTextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <AppTextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>

                {
                    isRegister
                    ? <SwitchSelector
                            options={options}
                            initial={0}
                            onPress={value => setRole(value)}
                            selectedColor={COLORS.white}
                            textColor={COLORS.primary}
                            borderColor={COLORS.primary}
                            buttonColor={COLORS.primary}
                            hasPadding
                        />
                    : <View style={{height: 40}}/>
                }


                <TouchableOpacity
                    style={{
                        padding: 20,
                        backgroundColor: COLORS.primary,
                        marginVertical: 10,
                        borderRadius: 10,
                        shadowColor: COLORS.primary,
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                    }}
                    onPress={submitHandler}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        {isRegister ? 'Зареєструватися' : 'Увійти'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={changeHandler}
                    style={{
                        padding: 10,
                    }}
                >
                    <Text
                        style={{
                            // fontFamily: Font["poppins-semiBold"],
                            color: COLORS.primary,
                            textAlign: "center",
                            fontSize: 14,
                        }}
                    >
                        {isRegister ? 'Вже маєте обліковий запис?' : 'Створити новий обліковий запис'}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )

}
export default Login