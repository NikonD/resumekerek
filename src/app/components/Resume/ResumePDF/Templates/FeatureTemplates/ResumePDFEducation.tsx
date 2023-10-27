import { ResumeEducation } from "lib/redux/types";
import { ResumePDFBulletList, ResumePDFSection, ResumePDFText } from "../../common";
import { StyleSheet, View } from "@react-pdf/renderer";
import { formatDateRange } from "lib/formatDateRange";


export const ResumePDFEducation = ({
  theme,
  heading,
  education,
  themeColor,
  showBulletPoints
}: {
  theme: any,
  heading: string;
  education: ResumeEducation[];
  themeColor: string;
  showBulletPoints: boolean
}) => {

  const styles = StyleSheet.create({
    block: {
      display: "flex",
      flexDirection: 'column',
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    degree: {
      display: "flex",
      flexDirection: "row",
      justifyContent:"space-between",
      textDecoration:"underline"
    }

  })

  return (
    <ResumePDFSection styleSection={{}} heading={heading}>
      {education.map(({ start_date, end_date, school, degree, descriptions, gpa }, idx) => {
        return (
          <View style={{ ...styles.block }} key={idx}>
            <View style={{ ...styles.row }}>
              <ResumePDFText bold={true}>{school}</ResumePDFText>
              <ResumePDFText bold={true}>{formatDateRange(start_date, end_date)}</ResumePDFText>
            </View>
            <View style={{...styles.degree}}>
              <ResumePDFText bold={true}>{gpa}</ResumePDFText>
              <ResumePDFText bold={true}>{degree}</ResumePDFText>
            </View>
            <View>
              <ResumePDFBulletList
                showBulletPoints={showBulletPoints}
                items={descriptions} />
            </View>
          </View>
        )
      })}
    </ResumePDFSection>
  )
}