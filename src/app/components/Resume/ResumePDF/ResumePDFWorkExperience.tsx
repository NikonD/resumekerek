import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { THEME_RESUME } from "components/ResumeForm/ThemeForm/constants";
import type { ResumeWorkExperience } from "lib/redux/types";

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

  let styleWorks = theme.columns.works

  return (
    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company;

        return (
          <View key={idx} style={styleWorks.flow}>
            <View style={styleWorks.company}>
              {!hideCompanyName && (
                <ResumePDFText bold={true}>{company}</ResumePDFText>
              )}

              <ResumePDFText >{date ? `${date}` : ''}</ResumePDFText>
            </View>

            <View
              style={{
                ...styles.flexRowBetween,
                marginTop: hideCompanyName
                  ? "-" + spacing["1"]
                  : spacing["1.5"],
              }}
            >
              <ResumePDFText >{jobTitle}</ResumePDFText>

            </View>

            <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
              <ResumePDFBulletList items={descriptions} />
            </View>
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
