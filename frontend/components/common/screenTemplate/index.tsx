import {FC, ReactNode} from "react";
import {Stack, useRouter} from "expo-router";
import {SafeAreaView} from "react-native";
import {COLORS, icons} from "../../../constants"
import {ScreenHeaderBtn} from "../../index"

interface Props {
    children: ReactNode
    header?: string
}
const ScreenTemplate: FC<Props> = ({children, header}) => {
    const router = useRouter()

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: ` ${header ?? ''}`,
                }}
            />
            {children}
        </SafeAreaView>
    )
}
export default ScreenTemplate