import {InfoType} from "../../../types/vacancy";
import {FC, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import SimpleElement from "../simpleElement";
import AppTextInput from "../appTextInput";
import {COLORS} from "../../../constants";

interface Props {
    data: InfoType[]
    addFunc: (text: string) => void
    deleteFunc: (id: string) => void
}
const SimpleElementList: FC<Props> = ({data, addFunc, deleteFunc}) => {

    const [inputText, setInputText] = useState<string>('')

    return (
        <ScrollView
            style={{
                padding: 10,
                flexDirection: 'column'
            }}
        >
            <AppTextInput
                value={inputText}
                onChangeText={text => setInputText(text)}
            />
            <TouchableOpacity
                onPress={() => addFunc(inputText)}
                style={{
                    backgroundColor: COLORS.primary,
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        textAlign: 'center'
                    }}
                >
                    Додати
                </Text>
            </TouchableOpacity>
            {data.map(item => <SimpleElement data={item} key={item.id} deleteFunc={deleteFunc}/>)}
        </ScrollView>
    )
}
export default SimpleElementList