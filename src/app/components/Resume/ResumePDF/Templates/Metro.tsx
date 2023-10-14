import { Image, StyleSheet, View } from "@react-pdf/renderer"
import { Settings } from "lib/redux/settingsSlice"
import { Resume } from "lib/redux/types"
import { ResumePDFSection, ResumePDFText } from "../common"
import { spacing } from "../styles"
import generateContactQRCode from "../QRGenerator"
import { useEffect, useRef, useState } from "react"
import { ResumePDFEducation } from "./MetroTemplates/ResumePDFEducation"
import { ResumePDFWorkExperience } from "./MetroTemplates/ResumePDFWorkExperience"

export const Metro = ({
  isPDF,
  resume,
  settings,
}: {
  isPDF: boolean,
  resume: Resume,
  settings: Settings
}
) => {
  const {
    formToHeading,
    themeColor,
    showBulletPoints
  } = settings
  const { profile, skills, educations, workExperiences, custom, projects } = resume
  const { name, email, phone, url, summary, location, photo } = profile;
  const iconProps = { email, phone, location, url };

  const [qrCodeBase64, setQRCodeBase64] = useState<string | null>(null);
  const qrCodeRef = useRef(null);

  const QRObjectProfile = {
    name: profile.name,
    title: profile.summary,
    phone: profile.phone,
    location: profile.location,
    email: profile.email
  }

  useEffect(() => {
    generateContactQRCode(QRObjectProfile)
      .then((base64) => {
        setQRCodeBase64(base64);
      })
      .catch((error) => {
        console.error('Ошибка при генерации QR-кода:', error);
      });
  }, [QRObjectProfile]);




  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: 'column',
      paddingTop: spacing["14"],
      paddingLeft: spacing["8"],
      paddingRight: spacing["8"],
      paddingBottom: spacing["8"]
    },
    summary: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    title: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      height: "80pt"
    },
    headBorder: {
      marginTop: spacing["5"],
      display: "flex",
      width: "100%",
      height: spacing["2"],
      backgroundColor: themeColor
    },
    photoBlock: {
      display: "flex",
      flexDirection: "row"
    },
    photo: {
      display: "flex",
      width: "80pt",
      height: "80pt",
    },
    fakePhoto: {
      display: "flex",
      width: "80pt",
      height: "80pt",
      position: "absolute",
      // right: "80pt"
    }
  })

  return (
    <View style={{ ...styles.page }}>
      <View style={{ ...styles.summary }}>
        <View style={{ ...styles.title }}>
          <View style={{ fontSize: "24pt" }}>
            <ResumePDFText bold={true}>РЕЗЮМЕ</ResumePDFText>
          </View>
          <View style={{ fontSize: "16pt" }}>
            <ResumePDFText bold={true}>{summary}</ResumePDFText>
          </View>
        </View>
        <View style={{ ...styles.photoBlock }}>
          <img style={{ ...styles.fakePhoto }} src={photo} />
          <Image style={{ ...styles.photo }} src={photo} />
        </View>
      </View>

      <View style={{ ...styles.headBorder }} />

      <ResumePDFEducation
        heading={formToHeading['educations']}
        educations={educations}
        showBulletPoints={showBulletPoints['educations']}
        theme={settings.themeResume}
        themeColor={themeColor}
      />
      {/* <ResumePDFEducation
        heading={formToHeading['educations']}
        educations={educations}
        showBulletPoints={showBulletPoints['educations']}
        theme={settings.themeResume}
        themeColor={themeColor}
      /> */}
      <ResumePDFWorkExperience
        heading={formToHeading['workExperiences']}
        workExperiences={workExperiences}
        // showBulletPoints={showBulletPoints['educations']}
        theme={settings.themeResume}
        themeColor={themeColor}
      />
      <ResumePDFEducation
        heading={formToHeading['educations']}
        educations={educations}
        showBulletPoints={showBulletPoints['educations']}
        theme={settings.themeResume}
        themeColor={themeColor}
      />
    </View>
  )
}