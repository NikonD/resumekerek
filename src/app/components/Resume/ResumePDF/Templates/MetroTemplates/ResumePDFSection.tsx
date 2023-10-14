import { Text, View } from "@react-pdf/renderer";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import { spacing } from "../../styles";

export const ResumePDFSection = ({
  themeColor,
  style,
  heading,
  styleSection,
  children,
}: {
  style?: any,
  themeColor?: string;
  heading?: string;
  styleSection?: any;
  children: React.ReactNode;
}) => (
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      gap: spacing["2"],
      marginTop: spacing["5"],
      ...style
    }}
  >
    {heading && (
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", ...styleSection.heading }}>
        {themeColor && (
          <></>
        )}
        <Text
          style={{
            color: "white",
            backgroundColor: themeColor,
            fontWeight: "bold",
            fontSize: "14pt",
            letterSpacing: "0.3pt", // tracking-wide -> 0.025em * 12 pt = 0.3pt
          }}
          debug={DEBUG_RESUME_PDF_FLAG}
        >
          {heading.toUpperCase()}
        </Text>
      </View>
    )}
    {children}
  </View>
);
