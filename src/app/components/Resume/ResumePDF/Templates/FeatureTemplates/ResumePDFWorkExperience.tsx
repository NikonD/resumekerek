import { ResumeWorkExperience } from "lib/redux/types";
import { ResumePDFBulletList, ResumePDFSection, ResumePDFText } from "../../common";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { spacing } from "../../styles";


export const ResumePDFWorkExperience = ({
  theme,
  heading,
  workExperiences,
  themeColor,
}: {
  theme: any,
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {

  const styles = StyleSheet.create({
    block: {
      display: "flex",
      flexDirection: 'column',
      // marginTop: spacing['1.5']
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    position: {
      display: "flex",
      textDecoration:"underline"
    }

  })

  return (
    <ResumePDFSection styleSection={{}}  heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        return (
          <View style={{...styles.block}} key={idx}>
            <View style={{...styles.row}}>
              <ResumePDFText bold={true}>{company}</ResumePDFText>
              <ResumePDFText bold={true}>{date}</ResumePDFText>
            </View>
            <View style={{...styles.position}}>
              <ResumePDFText>{jobTitle}</ResumePDFText>
            </View>
            <View>
              <ResumePDFBulletList items={descriptions}/>
            </View>
          </View>
        )
      })}
    </ResumePDFSection>
  )
}