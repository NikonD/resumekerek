import { Image, Text, View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import { use, useEffect, useRef, useState } from "react";
import generateContactQRCode from "./QRGenerator";
import axios from "axios";


export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
  style
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
  style: object
}) => {
  const { name, email, phone, url, summary, location, photo } = profile;
  const iconProps = { email, phone, location, url };
  const [qrCodeBase64, setQRCodeBase64] = useState<string | null>(null);
  const [qrFile, setQRFile] = useState<string | null>(null)

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

  // console.log(photo)

  return (
    <ResumePDFSection styleSection={{ marginTop: spacing["4"] }}>
      <ResumePDFText

        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "16pt" }}
      >
        {name}
      </ResumePDFText>
      {summary && <ResumePDFText >{summary}</ResumePDFText>}
      <View style={{ ...style }}>
        {photo && (<Image style={styles.userPhoto} src={photo} />)}
        <img style={styles.userPhotoFake} src={photo} />
        <View
          style={{
            ...styles.flexRowBetween,
            flexWrap: "wrap",
            marginTop: spacing["0.5"],
          }}
        >
          <View style={{ ...styles.flexRow, alignItems: "center" }}>
            {themeColor && (
              <View
                style={{
                  ...styles.flexCol,
                  height: "3.75pt",
                  width: "30pt",
                  backgroundColor: themeColor,
                  marginRight: spacing["3.5"],
                }}
                debug={DEBUG_RESUME_PDF_FLAG}
              />
            )}
            <Text
              style={{
                fontWeight: "bold",
                width: "100%",
                letterSpacing: "0.3pt", // tracking-wide -> 0.025em * 12 pt = 0.3pt
              }}
              debug={DEBUG_RESUME_PDF_FLAG}
            >
              Контакты
            </Text>
          </View>

          {/* <Text>Контакты</Text> */}
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
                <ResumePDFIcon type={iconType} isPDF={isPDF} />
                <Wrapper>
                  <ResumePDFText >{value}</ResumePDFText>
                </Wrapper>
              </View>
            );
          })}

        </View>
        {qrCodeBase64 && (
          <Image style={styles.image} src={qrCodeBase64} />
        )}
        <img style={styles.imageFake} src={qrCodeBase64 || ""} />

        {/* <View style={{ ...styles.qrRow }}>

        </View> */}

      </View>
    </ResumePDFSection>
  );
};
