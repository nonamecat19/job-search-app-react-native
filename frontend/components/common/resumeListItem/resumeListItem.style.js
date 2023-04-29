import {StyleSheet} from 'react-native'
import {COLORS} from "../../../constants";

const styles = StyleSheet.create({
    element: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: COLORS.white,
        fontSize: 15,
        marginTop: 3
    },
    download: {

    }
})
export default styles