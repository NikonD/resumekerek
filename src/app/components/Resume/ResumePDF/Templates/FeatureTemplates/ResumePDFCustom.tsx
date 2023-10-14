import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
} from "components/Resume/ResumePDF/common";
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
  return (
    <ResumePDFSection styleSection={{}} heading={heading}>
      <View style={{}}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
