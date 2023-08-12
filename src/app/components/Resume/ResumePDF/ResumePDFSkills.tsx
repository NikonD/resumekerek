import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumeFeaturedSkill,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { THEME_RESUME } from "components/ResumeForm/ThemeForm/constants";
import { useAppSelector } from "lib/redux/hooks";
import { selectSettings } from "lib/redux/settingsSlice";
import type { ResumeSkills } from "lib/redux/types";

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
              style={{
                ...styles.flexCol,
              }}
            >
              {pair.map((featuredSkill, idx) => {
                if (!featuredSkill) return null;
                return (
                  <ResumeFeaturedSkill
                    key={idx}
                    skill={featuredSkill.skill}
                    rating={featuredSkill.rating}
                    themeColor={themeColor}
                    style={{
                      justifyContent: "flex-end",
                    }}
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
