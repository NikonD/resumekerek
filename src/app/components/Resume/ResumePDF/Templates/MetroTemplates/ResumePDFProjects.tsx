import { StyleSheet, View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeProject } from "lib/redux/types";
import { ResumePDFSection } from "./ResumePDFSection";
import { formatDateRange } from "lib/formatDateRange";

export const ResumePDFProject = ({
  theme,
  heading,
  projects,
  themeColor,
}: {
  theme: any,
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
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
    },
    col: {
      display: "flex",
      flexDirection: "column"
    }
  })

  return (

    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      {projects.map(({ project, start_date, end_date, descriptions }, idx) => (
        <View key={idx} style={{ ...styles.block }}>
          <View
            style={{
              ...styles.row,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFText bold={true} >{project}</ResumePDFText>
            <ResumePDFText bold={true}>{formatDateRange(start_date, end_date)}</ResumePDFText>
          </View>
          <View style={{ ...styles.col, marginTop: spacing["0.5"] }}>
            <ResumePDFBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
