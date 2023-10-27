import { StyleSheet, View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  // ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeEducation } from "lib/redux/types";
import { ResumePDFSection } from "./ResumePDFSection";
import { formatDateRange } from "lib/formatDateRange";

export const ResumePDFEducation = ({
  theme,
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  theme: any,
  heading: string;
  educations: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {

  const styles = StyleSheet.create({
    block: {
      display: "flex",
      flexDirection:"column"
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    col: {
      display:"flex",
      flexDirection:"column"
    },
    degree: {
      display:"flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  })

  return (
    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, start_date, end_date, gpa, descriptions = [] }, idx) => {
          // Hide school name if it is the same as the previous school
          const hideSchoolName =
            idx > 0 && school === educations[idx - 1].school;
          const showDescriptions = descriptions.join() !== "";

          return (
            <View key={idx} style={{...styles.block}}>
              <View style={{...styles.row}}>
                {!hideSchoolName && (
                  <ResumePDFText bold={true}>{school}</ResumePDFText>
                )}
                <ResumePDFText bold={true}>{formatDateRange(start_date, end_date)}</ResumePDFText>
              </View>

              <View
                style={{
                  ...styles.degree,
                  marginTop: hideSchoolName
                    ? "-" + spacing["1"]
                    : spacing["1.5"],
                }}
              >
                <ResumePDFText>{`${gpa
                  ? `${degree} - ${Number(gpa) ? gpa + " GPA" : gpa}`
                  : degree
                  }`}</ResumePDFText>
              </View>
              {showDescriptions && (
                <View style={{ ...styles.col, marginTop: spacing["1.5"] }}>
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
