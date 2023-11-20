import { View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatDateRange } from "lib/formatDateRange";
import type { ResumeEducation } from "lib/redux/types";

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

  let styleEdu = theme.columns.edu

  return (
    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      {educations.map(
        ({ school, degree, start_date, end_date, gpa, descriptions = [] }, idx) => {
          // Hide school name if it is the same as the previous school
          const hideSchoolName =
            idx > 0 && school === educations[idx - 1].school;
          const showDescriptions = descriptions.join() !== "";

          return (
            <View key={idx} style={styleEdu.flow}>
              <View style={styleEdu.company} >
                {!hideSchoolName && (
                  <ResumePDFText bold={true}>{school}</ResumePDFText>
                )}
                <ResumePDFText bold={true}>
                  {formatDateRange(start_date, end_date)}
                  </ResumePDFText>
              </View>

              <View
                style={{
                  ...styles.flexRowBetween,
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
                <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
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
