import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"
import { Settings, ShowForm } from "lib/redux/settingsSlice"
import { Resume } from "lib/redux/types"
import { spacing } from "../styles"
import { ResumePDFWorkExperience } from "./FeatureTemplates/ResumePDFWorkExperience"
import { ResumePDFEducation } from "./FeatureTemplates/ResumePDFEducation"
import { ResumePDFProject } from "./FeatureTemplates/ResumePDFProject"
import { ResumePDFSkills } from "./FeatureTemplates/ResumePDFSkills"
import { ResumePDFCustom } from "./FeatureTemplates/ResumePDFCustom"
import { IconType, ResumePDFIcon } from "../common/ResumePDFIcon"
import { ResumePDFLink, ResumePDFSection, ResumePDFText } from "../common"
import { useEffect, useRef, useState } from "react"
import generateContactQRCode from "../QRGenerator"


const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row"
  },
  leftCol: {
    fontSize: "9pt",
    flexDirection: "column",
    display: "flex",
    height: "100vh",
    width: "30%",
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
    width: "70%",
    height: "100vh",
    marginTop: spacing['3'],
    marginLeft: spacing["1.5"],
  },
  summaryBlock: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
    marginTop: spacing["5"],
    marginBottom: spacing["5"]
  },
  photoBlock: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    justifyContent: "space-around",
    // borderColor: "white",
    marginTop: spacing['5']
  },
  fakePhoto: {
    width: "80pt",
    height: "80pt",
    position: "absolute",
    // borderRadius: "50%"
  },
  photo: {
    display: "flex",
    width: '80pt',
    height: '80pt',
    // borderRadius: "50%"
  },
  border: {
    width: "90pt",
    height: "90pt",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    border: "5pt white solid"
  },
  desc: {
    fontSize: "14pt",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginLeft: "1.5pt",
    marginTop: spacing['5'],
    justifyContent: "center",
    alignContent: "center"
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
    marginTop: "0.5pt",
    marginBottom: spacing["5"],
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "5pt",
  },
  qrContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  qr: {
    display: "flex",
    width: "80pt",
    height: "80pt"
  },
  fakeqr: {
    display: "flex",
    position: "relative",
    top: "-80pt",
    width: "80pt",
    height: "80pt"
  }
})

const Feature = ({
  isPDF,
  resume,
  settings,
  showFormsOrder
}: {
  isPDF: boolean,
  resume: Resume,
  settings: Settings,
  showFormsOrder: any
}) => {
  // const isPDF = true
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
        education={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]} />
    ),
    projects: () => (
      <ResumePDFProject
        theme={settings.themeResume}
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints['projects']} />
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
    additional: () => <></>
  };

  return (
    <View style={{ ...styles.page }}>
      <View style={{ ...styles.leftCol, backgroundColor: themeColor }}>
        <View style={{ ...styles.photoBlock }}>
          {profile.photo &&
            <View style={{ ...styles.border }}>
              <img style={styles.fakePhoto} src={profile.photo} />
              <Image src={profile.photo} style={styles.photo} />
            </View>
          }
        </View>
        <View>
          <View style={{ ...styles.leftColData }}>
          </View>
          <View style={styles.desc}>
            <Text>{name}</Text>
          </View>
        </View>

        <ResumePDFSkills
          theme={settings.themeResume}
          heading={formToHeading["skills"]}
          skills={skills}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints["skills"]} />

        <ResumePDFSection>
          <View style={{ ...styles.qrContainer }}>
            {qrCodeBase64 &&
              (<Image style={{ ...styles.qr }} src={qrCodeBase64} />)
            }
            <img style={styles.fakeqr} src={qrCodeBase64 || ""} alt="QR" />
          </View>
        </ResumePDFSection>

      </View>
      <View style={styles.rightCol}>
        <Text style={{ color: "#0f6043", fontWeight: 700, fontSize: "16pt" }}>{summary}</Text>
        <View style={{ ...styles.summaryBlock }}>
          <View style={{ ...styles.contactBlock }}>
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
                    ...styles.flexRow,
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

            {/* <Text>{phone}</Text>
            <Text>{email}</Text>
            <Text>{location}</Text>
            <Text>{url}</Text> */}
          </View>
        </View>

        {showFormsOrder.map((form: ShowForm, idx: number) => {
          if (
              (form=='workExperiences') ||
              (form=='educations') ||
              (form=='projects') ||
              (form=='custom') 
            ) {
            const Component = formTypeToComponent[form];
            return <Component key={idx} />;
          }
        })}

        {/* <ResumePDFWorkExperience
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

        <ResumePDFProject
          themeColor={themeColor}
          theme={settings.themeResume}
          projects={projects}
          showBulletPoints={showBulletPoints['projects']}
          heading={formToHeading['projects']}
        />

        <ResumePDFCustom
          themeColor={themeColor}
          custom={custom}
          theme={settings.themeResume}
          heading={formToHeading['custom']}
          showBulletPoints={showBulletPoints['custom']}
        /> */}

      </View>
    </View>
  )
}

export { Feature }