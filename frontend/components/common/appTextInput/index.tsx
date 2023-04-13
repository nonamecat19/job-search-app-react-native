import {FC, useState} from 'react'
import {TextInput, TextInputProps} from "react-native";
import {COLORS} from "../../../constants";

const AppTextInput: FC<TextInputProps> = ({ ...otherProps }) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={COLORS.primary}
            style={[
                {
                    // fontFamily: Font["poppins-regular"],
                    fontSize: 14,
                    padding: 20,
                    backgroundColor: COLORS.white,
                    borderRadius: 10,
                    marginVertical: 10,
                    borderWidth: 3,
                    borderColor: COLORS.gray,
                },
                focused && {
                    borderWidth: 3,
                    borderColor: COLORS.primary,
                    shadowOffset: {
                        width: 4,
                        height: 10
                    },
                    shadowColor: COLORS.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                },
            ]}
            {...otherProps}
        />
    );
};
export default AppTextInput;