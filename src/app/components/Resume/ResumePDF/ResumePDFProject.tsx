import { View } from "@react-pdf/renderer";
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
}: {
  theme: any,
  heading: string;
  projects: ResumeProject[];
  themeColor: string;
}) => {

  let styleProject = theme.columns.project

  return (


    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      {projects.map(({ project, start_date, end_date, descriptions }, idx) => (
        <View key={idx} style={styleProject.flow}>
          <View
            style={{
              ...styleProject.company,
              marginTop: spacing["0.5"],
            }}
          >
            <ResumePDFText bold={true}>{project}</ResumePDFText>
            <ResumePDFText bold={true}>
            <div className=" mr-[500px]">
              {formatDateRange(start_date, end_date)}
              </div>
              </ResumePDFText>
          </View>
          <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
            <ResumePDFBulletList items={descriptions} />
          </View>
        </View>
      ))}
    </ResumePDFSection>
  );
};
