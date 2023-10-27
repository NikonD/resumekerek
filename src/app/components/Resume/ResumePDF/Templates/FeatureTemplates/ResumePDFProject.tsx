import { StyleSheet, View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { formatDateRange } from "lib/formatDateRange";
import type { ResumeProject } from "lib/redux/types";

export const ResumePDFProject = ({
  theme,
  heading,
  projects,
  themeColor,
  showBulletPoints
}: {
  theme: any,
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
  showBulletPoints: boolean
}) => {

  const styles = StyleSheet.create({
    block: {
      display: "flex",
      flexDirection: "column"
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  })

  // let styleProject = theme.columns.project

  return (
    <ResumePDFSection styleSection={{}}  heading={heading}>
      {projects.map(({ project, start_date, end_date, descriptions }, idx) => (
        <View key={idx} style={{ ...styles.block }}>
          <View
            style={{
              ...styles.row,
              // ...styleProject.company,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFText bold={true} >{project}</ResumePDFText>
            <ResumePDFText bold={true}>{formatDateRange(start_date, end_date)}</ResumePDFText>
          </View>
          <View style={{ marginTop: spacing["0.5"] }}>
            <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
