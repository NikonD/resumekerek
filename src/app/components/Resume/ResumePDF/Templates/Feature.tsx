import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"
import { Settings } from "lib/redux/settingsSlice"
import { Resume } from "lib/redux/types"
import { spacing } from "../styles"
import { ResumePDFWorkExperience } from "./FeatureTemplates/ResumePDFWorkExperience"
import { ResumePDFEducation } from "./FeatureTemplates/ResumePDFEducation"

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row"
  },
  leftCol: {
    flexDirection: "column",
    display: "flex",
    height: "100vh",
    width: "40%",
    color: "white",
    marginLeft: "1.5rem"
  },
  leftColData: {
    display: "flex",
    flexDirection: "column"
  },
  lefColLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "14pt"
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    height: "100vh",
    marginRight: "1.5rem",
    marginLeft: "1.5rem"
  },
  summaryBlock: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
    marginTop: spacing["5"],
  },
  photoBlock: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    justifyContent: "space-around",
  },
  fakePhoto: {
    width: "120pt",
    height: "120pt",
    position: "absolute",
    // borderRadius: "50%"
  },
  photo: {
    display: "flex",
    width: '120pt',
    height: '120pt',
    // borderRadius: "50%"
  },
  desc: {
    fontSize: "14pt",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: "1.5rem",
    marginTop: "2rem",
    justifyContent: "flex-start",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  contact: {
    fontSize: '12pt',
    marginTop: '5pt',
  },
  contactBlock: {
    marginTop: "0.5rem",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "0.5rem",
    flex: 2
  }
})

const Feature = ({
  resume,
  settings,
}: {
  resume: Resume,
  settings: Settings,
}) => {
  const isPDF = true
  const {
    formToHeading,
    themeColor,
    showBulletPoints
  } = settings
  const { profile, skills, educations, workExperiences, custom } = resume
  const { name, email, phone, url, summary, location, photo } = profile;
  const iconProps = { email, phone, location, url };


  return (
    <View style={{ ...styles.page }}>
      <View style={{ ...styles.leftCol, backgroundColor: themeColor }}>
        <View style={{ ...styles.photoBlock }}>
          <img style={styles.fakePhoto} src={profile.photo} />
          <Image src={profile.photo} style={styles.photo} />
        </View>
        <View>
          <View style={{ ...styles.leftColData }}>
          </View>
          <View style={styles.desc}>
            <View>
              <Text>{name}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rightCol}>
        <Text style={{ color: "#0f6043", fontWeight: 700, fontSize: "16pt" }}>{summary}</Text>
        <View style={{ ...styles.summaryBlock }}>
          <View style={{ ...styles.contactBlock }}>
            <Text>{phone}</Text>
            <Text>{email}</Text>
            <Text>{location}</Text>
            <Text>{url}</Text>
          </View>
        </View>

        <ResumePDFWorkExperience
          themeColor={themeColor}
          theme={settings.themeResume}
          workExperiences={workExperiences}

          heading={formToHeading['workExperiences']} />

        <ResumePDFEducation
          themeColor={themeColor}
          theme={settings.themeResume}
          education={educations}
          showBulletPoints={showBulletPoints['educations']}
          heading={formToHeading['educations']} />


        {/* {workExperiences.length!=0 && workExperiences.map((item) => {
            return (
              <View>
                <View>
                  <Text>{item.company}</Text>
                  <Text>{item.date}</Text>
                </View>
                <View>
                  <Text>{item.jobTitle}</Text>
                </View>
                <View>
                  {item.descriptions.map((item)=>{
                    return (
                      <Text>{item}</Text>
                    )
                  })}
                </View>
              </View>
            )
          })} */}

      </View>
    </View>
  )
}

export { Feature }