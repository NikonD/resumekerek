import { StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { spacing } from "components/Resume/ResumePDF/styles";
import { THEME_RESUME } from "components/ResumeForm/ThemeForm/constants";
import { useAppSelector } from "lib/redux/hooks";
import { selectSettings } from "lib/redux/settingsSlice";
import type { FeaturedSkill, ResumeSkills } from "lib/redux/types";
import type { Style } from "@react-pdf/types";

const ResumeFeaturedSkill = ({
  skill,
  style,
  rating,
  themeColor
}: {
  skill: string,
  rating: number,
  themeColor: string,
  style?: Style
}) => {
  const maxRating = 5

  const styles = StyleSheet.create({
    flexRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-around"
    },
    flexCol: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: spacing['5'],
      paddingRight: spacing['5']
    }
  })

  return (
    <View style={{ ...styles.flexCol, width: "100%" }}>
      <ResumePDFText style={{ marginRight: spacing[0.5] }}>
        {skill}
      </ResumePDFText>
      <View style={{
        marginBottom: spacing["4"],
        display: "flex",
        flexDirection: "row",
        height: spacing["2"],
      }}>
        {[...Array(maxRating)].map((_, idx) => (
          <View
            key={idx}
            style={{
              height: spacing["2"],
              width: "30pt",
              borderColor:"#d9d9d9",
              borderBottom: "1px",
              borderTop: "1px",
              backgroundColor: rating >= idx ?  "#d9d9d9": themeColor,
            }}
          />
        ))}

      </View>
    </View>
  )
}

export const ResumePDFSkills = ({
  theme,
  style,
  heading,
  skills,
  themeColor,
  showBulletPoints,
}: {
  theme?: any,
  style?: object,
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions, featuredSkills } = skills;
  const featuredSkillsWithText = featuredSkills.filter((item) => item.skill);
  const featuredSkillsPair = [
    [featuredSkillsWithText[0], featuredSkillsWithText[3]],
    [featuredSkillsWithText[1], featuredSkillsWithText[4]],
    [featuredSkillsWithText[2], featuredSkillsWithText[5]],
  ];

  return (
    <ResumePDFSection styleSection={{}} themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (
        <View style={{
          marginTop: spacing["0.5"],

        }}>
          {featuredSkillsPair.map((pair, idx) => (
            <View
              key={idx}
              style={{}}
            >
              {pair.map((featuredSkill, idx) => {
                if (!featuredSkill) return null;
                return (
                  <ResumeFeaturedSkill
                    key={idx}
                    skill={featuredSkill.skill}
                    rating={featuredSkill.rating}
                    themeColor={themeColor}
                    style={style}
                  />
                );
              })}
            </View>
          ))}
        </View>
      )}
      <View style={{}}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
