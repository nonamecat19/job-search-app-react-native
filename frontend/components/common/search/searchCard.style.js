import {StyleSheet} from "react-native"
import {COLORS, SIZES} from "../../../constants"

const styles = StyleSheet.create({
    element: {
        backgroundColor: COLORS.white,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderRadius: 20,
    },
    companyContainer: {
        flexDirection: "row"
    },
    company: {
        color: COLORS.primary,
        fontSize: 18,
        textDecorationLine: "underline"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: COLORS.primary
    },
    salary: {
        color: COLORS.primary
    }
})
export default styles