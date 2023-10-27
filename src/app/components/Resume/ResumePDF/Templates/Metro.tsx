import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"
import { Settings, ShowForm } from "lib/redux/settingsSlice"
import { Resume } from "lib/redux/types"
import { ResumePDFLink, ResumePDFText } from "../common"
import { spacing } from "../styles"
import generateContactQRCode from "../QRGenerator"
import { useEffect, useRef, useState } from "react"
import { ResumePDFEducation } from "./MetroTemplates/ResumePDFEducation"
import { ResumePDFWorkExperience } from "./MetroTemplates/ResumePDFWorkExperience"
import { ResumePDFProject } from "./MetroTemplates/ResumePDFProjects"
import { ResumePDFSkills } from "./MetroTemplates/ResumePDFSkills"
import { ResumePDFCustom } from "./MetroTemplates/ResumePDFCustom"
import { ResumePDFSection } from "./MetroTemplates/ResumePDFSection"

import { IconType, ResumePDFIcon } from "../common/ResumePDFIcon"

export const Metro = ({
  isPDF,
  resume,
  settings,
  showFormsOrder
}: {
  isPDF: boolean,
  resume: Resume,
  settings: Settings,
  showFormsOrder: any
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
    name: profile.name || "",
    title: profile.summary || "",
    phone: profile.phone || "",
    location: profile.location || "",
    email: profile.email || ""
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
      paddingTop: spacing["8"],
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
    },
    row: {
      display: "flex",
      flexDirection: "row"
    },
    qrContainer: {
      display: "flex",
      flexDirection: "row",
    },
    qr: {
      display: "flex",
      width: "80pt",
      height: "80pt"
    },
    qrFake: {
      display: "flex",
      width: "80pt",
      height: "80pt",
      position: "relative",
      left: "-80pt"
    },
    contact: {
      display: "flex",
      flexWrap: "wrap"
    },
    contactRow: {

      width: "50%",

    }
  })

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFWorkExperience
        theme={settings.themeResume}
        heading={formToHeading["workExperiences"]}
        workExperiences={workExperiences}
        themeColor={themeColor} />
    ),
    educations: () => (
      <ResumePDFEducation
        theme={settings.themeResume}
        heading={formToHeading["educations"]}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]} />
    ),
    projects: () => (
      <ResumePDFProject
        theme={settings.themeResume}
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor} />
    ),
    skills: () => (
      <ResumePDFSkills
        theme={settings.themeResume}
        heading={formToHeading["skills"]}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["skills"]} />
    ),
    custom: () => (
      <ResumePDFCustom
        theme={settings.themeResume}
        heading={formToHeading["custom"]}
        custom={custom}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["custom"]}
      />
    ),
  };

  return (
    <View style={{ ...styles.page }}>
      <View style={{ ...styles.summary }}>
        <View style={{ ...styles.row }}>
          <View style={{ ...styles.title }}>
            <View style={{ fontSize: "24pt" }}>
              <ResumePDFText bold={true}>РЕЗЮМЕ</ResumePDFText>
            </View>
            <View style={{ fontSize: "16pt" }}>
              <ResumePDFText bold={true}>{summary}</ResumePDFText>
            </View>
          </View>
          <View style={{ ...styles.qrContainer }}>
            <Image style={{ ...styles.qr }} src={qrCodeBase64 || ""} />
            <img style={{ ...styles.qrFake }} src={qrCodeBase64 || ""} />
          </View>
        </View>
        {
          photo
          && <View style={{ ...styles.photoBlock }}>
            <img style={{ ...styles.fakePhoto }} src={photo} />
            <Image style={{ ...styles.photo }} src={photo} />
          </View>
        }
      </View>

      <View style={{ ...styles.headBorder }} />

      <ResumePDFSection style={{}} styleSection={{}} heading="Персональные данные">
        <View style={{ ...styles.contact }}>
          {Object.entries(iconProps).map(([key, value]) => {
            if (!value) return null;

            let iconType = key as IconType;
            if (key === "url") {
              if (value.includes("github")) {
                iconType = "url_github";
              } else if (value.includes("linkedin")) {
                iconType = "url_linkedin";
              }
            }

            const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
            const Wrapper = ({ children }: { children: React.ReactNode }) => {
              if (!shouldUseLinkWrapper) return <>{children}</>;

              let src = "";
              switch (key) {
                case "email": {
                  src = `mailto:${value}`;
                  break;
                }
                case "phone": {
                  src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                  break;
                }
                default: {
                  src = value.startsWith("http") ? value : `https://${value}`;
                }
              }

              return (
                <ResumePDFLink src={src} isPDF={isPDF}>
                  {children}
                </ResumePDFLink>
              );
            };

            return (
              <View
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  alignItems: "center",
                  gap: spacing["1"],
                }}
              >
                <ResumePDFIcon type={iconType} isPDF={isPDF} _fill={themeColor} />
                <Wrapper>
                  <ResumePDFText >{value}</ResumePDFText>
                </Wrapper>
              </View>
            );
          })}
        </View>
      </ResumePDFSection>

      {showFormsOrder.map((form: ShowForm) => {
        const Component = formTypeToComponent[form];
        return <Component />;
      })}

    </View>
  )
}