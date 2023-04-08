import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 250,
    padding: SIZES.medium,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedJob, item) => ({
    width: 215,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: SIZES.medium,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  }),
  logoImage: {
    width: "80%",
    height: "80%",
    marginTop: 4,
    marginLeft: -80
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.primary,
    width: 120,
    marginTop: SIZES.small,
    marginLeft: -40
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.white,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: COLORS.white,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
