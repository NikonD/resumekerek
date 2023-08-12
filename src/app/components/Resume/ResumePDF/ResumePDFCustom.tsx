import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
} from "components/Resume/ResumePDF/common";
import { styles } from "components/Resume/ResumePDF/styles";
import type { ResumeCustom } from "lib/redux/types";

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
  const styleCustom = theme.columns.custom
  return (
    <ResumePDFSection styleSection={styleCustom} themeColor={themeColor} heading={heading}>
      <View style={styleCustom.block}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
