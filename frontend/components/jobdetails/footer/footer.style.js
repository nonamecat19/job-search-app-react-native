import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  dislikeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: COLORS.primary,
  },
  dislikeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: COLORS.white,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});

export default styles;
