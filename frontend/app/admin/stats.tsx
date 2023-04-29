import {FC} from "react";
import ScreenTemplate from "../../components/common/screenTemplate";
import useFetch from "../../hook/useFetch";
import {GET} from "../../constants/requests";
import FetchDataTemplate from "../../components/common/FetchDataTemplate";
import {StatElement} from "../../types/stat";
import {Text} from "react-native";

const AdminStats: FC = ({}) => {

    const {data, isLoading, error, refetch} = useFetch<StatElement[]>(GET, 'statistics')

    return (
        <ScreenTemplate>
            <FetchDataTemplate isLoading={isLoading} refetch={refetch}>
                <Text>
                    {JSON.stringify(data)}
                </Text>

            </FetchDataTemplate>
        </ScreenTemplate>
    )
}
export default AdminStats