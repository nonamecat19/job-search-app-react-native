import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants";

const styles = StyleSheet.create({
    element: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: COLORS.gray2
    },
    logoImage: {
        height: 15,
        width: 15,
        marginTop: 3
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: COLORS.primary
    },
    companyContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    companyName: {
        fontSize: 15,
        marginLeft: 5
    }
})
export default styles