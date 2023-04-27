import {FC, ReactNode, useCallback, useState} from "react"
import {ActivityIndicator, RefreshControl, ScrollView, Text} from "react-native"
import {COLORS} from "../../../constants"
interface Props {
    isLoading: boolean
    error?: string
    refetch: () => void
    children: ReactNode
}

const FetchDataTemplate: FC<Props> = ({isLoading, error, refetch, children}) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, [refetch])



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            {isLoading
                ? <ActivityIndicator size='large' color={COLORS.primary}/>
                : error
                    ? <Text>Щось пішло не так</Text>
                    : <>{children}</>
            }
        </ScrollView>
    )
}
export default FetchDataTemplate