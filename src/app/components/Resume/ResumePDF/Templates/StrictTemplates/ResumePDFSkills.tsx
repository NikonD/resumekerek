import { Text, View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
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

  return (
    <View style={{ ...styles.flexCol, width: "100%", ...style }}>
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
              backgroundColor: rating >= idx ? themeColor : "#d9d9d9",
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

  // const choosenTheme = THEME_RESUME.filter((el => el.name == settings.themeResume))[0]

  const styleSkills = theme.columns.skills

  return (
    <ResumePDFSection styleSection={styleSkills} themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (
        <View style={{
          ...styleSkills.featured,
          marginTop: spacing["0.5"],

        }}>
          {featuredSkillsPair.map((pair, idx) => (
            <View
              key={idx}
              style={styleSkills.featuredBlock}
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
      <View style={styleSkills.bullet}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
