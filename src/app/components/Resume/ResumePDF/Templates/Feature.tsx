import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"
import { Settings } from "lib/redux/settingsSlice"
import { Resume } from "lib/redux/types"
import { ResumePDFLink, ResumePDFText } from "../common"
import { spacing } from "../styles"
import { IconType, ResumePDFIcon } from "../common/ResumePDFIcon"
import { UserIcon } from "./FeatureTemplates/Icons/User"

const styles = StyleSheet.create({
  page: {

  },
  leftCol: {
    borderLeft: "1px solid grey",
    flexDirection: "column",
    display: "flex",
    height: "100%",
    width: "40%",
    color: "white"
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
    marginRight: "20pt"
  },
  photoBlock: {
    display: "flex",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
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
    borderRadius: "50%"
  },
  photo: {
    display: "flex",
    width: '120pt',
    height: '120pt',
    borderRadius: "50%"
  },
  contactBlock: {
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
    <View>
      <View style={{ ...styles.leftCol, backgroundColor: themeColor }}>
        <View style={{ ...styles.photoBlock }}>
          <img style={styles.fakePhoto} src={profile.photo} />
          <Image src={profile.photo} style={styles.photo} />
        </View>
        <View>
          <View style={{ ...styles.leftColData }}>
            <View style={styles.lefColLabel}>
              <Text>Персональные данные</Text>
            </View>

          </View>
          <View style={styles.contactBlock}>
            <View>
              <ResumePDFIcon isPDF={false} type="email" _fill="#fff"/>
              <Text>{name}</Text>
            </View>
            <Text>{summary}</Text>


            <Text>{email}</Text>
            <Text>{phone}</Text>
          </View>

        </View>
      </View>

      <View style={styles.rightCol}>

      </View>
    </View>
  )
}

export { Feature }