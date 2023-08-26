import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"
import { Settings } from "lib/redux/settingsSlice"
import { Resume } from "lib/redux/types"
import { ResumePDFLink, ResumePDFText } from "../common"
import { spacing } from "../styles"
import { IconType, ResumePDFIcon } from "../common/ResumePDFIcon"

const styles = StyleSheet.create({
  page: {

  },
  leftCol: {
    borderLeft: "1px solid grey",
    flexDirection: "column",
    display: "flex",
    width: "30%"
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    marginRight: "20pt"
  },
  photoBlock: {
    display: "flex",
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
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  flexRow: {
    display:"flex",
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
        <View style={styles.contactBlock}>
          {/* {Object.entries(iconProps).map(([key, value]) => {
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
                <ResumePDFIcon type={iconType} isPDF={isPDF} />
                <Wrapper>
                  <ResumePDFText >{value}</ResumePDFText>
                </Wrapper>
              </View>
            );
          })} */}
        </View>
        <Text>{name}</Text>
      </View>
      <View style={styles.rightCol}>

      </View>
    </View>
  )
}

export { Feature }