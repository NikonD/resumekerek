import { StyleSheet, View } from "@react-pdf/renderer";
import {
  // ResumePDFSection,
  ResumePDFBulletList, ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { spacing } from "components/Resume/ResumePDF/styles";
import { THEME_RESUME } from "components/ResumeForm/ThemeForm/constants";
import { useAppSelector } from "lib/redux/hooks";
import { selectSettings } from "lib/redux/settingsSlice";
import type { ResumeSkills } from "lib/redux/types";
import { ResumePDFSection } from "./ResumePDFSection";
import { Style } from "util";

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: "row",
    // justifyContent:"sp"
  },
  mainRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  col: {
    display: "flex",
    flexDirection: "column"
  }
})

const ResumeFeaturedSkill = ({
  skill,
  rating,
  themeColor,
  style = {},
}: {
  skill: string;
  rating: number;
  themeColor: string;
  style?: any;
}) => {
  const numCircles = 5;

  return (
    <View style={{ ...styles.row, alignItems: "center", justifyContent:"space-between" }}>
      <ResumePDFText style={{ marginRight: spacing[0.5] }}>
        {skill}
      </ResumePDFText>
      <View style={{display:"flex", flexDirection: "row"}}>
        {[...Array(numCircles)].map((_, idx) => (
          <View
            key={idx}
            style={{
              height: spacing["2"],
              width: "15pt",
              backgroundColor: rating >= idx ? themeColor : "#d9d9d9",
            }}
          />
        ))}
      </View>

    </View>
  );
};

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
          ...styles.mainRow,
          marginTop: spacing["0.5"],
        }}>
          {featuredSkillsPair.map((pair, idx) => (
            <View
              key={idx}
              style={{ ...styles.col }}
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

                    }}
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
