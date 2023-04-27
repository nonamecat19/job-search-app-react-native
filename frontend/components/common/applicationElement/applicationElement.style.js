import {StyleSheet} from 'react-native'
import {COLORS} from "../../../constants";

const styles = StyleSheet.create({
    element: {
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: COLORS.white,
        fontSize: 15
    }

})
export default styles