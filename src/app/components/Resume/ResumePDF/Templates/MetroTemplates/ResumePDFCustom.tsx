import { StyleSheet, View } from "@react-pdf/renderer";
import {
  // ResumePDFSection,
  ResumePDFBulletList,
} from "components/Resume/ResumePDF/common";
import { styles } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";
import { ResumePDFSection } from "./ResumePDFSection";

export const ResumePDFCustom = ({
  theme,
  heading,
  custom,
  themeColor,
  showBulletPoints,
}: {
  theme: any,
  heading: string;
  custom: ResumeCustom;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions } = custom;

  const styles = StyleSheet.create({
    block: {
      display:"flex",
      flexDirection: "column"
    },
    row: {
      display:"flex",
      flexDirection:"row"
    }
  })

  return (
    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      <View style={{...styles.block}}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
