import { Image, StyleSheet, Text, View } from "@react-pdf/renderer"
import { Settings } from "lib/redux/settingsSlice"
import { spacing } from "../styles"
import { THEME_RESUME } from "components/ResumeForm/ThemeForm/constants"
import { Resume } from "lib/redux/types"
import { ResumePDFIcon } from "../common/ResumePDFIcon"
import { useEffect, useRef, useState } from "react"
import generateContactQRCode from "../QRGenerator"

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '20pt',
  },
  header: {
    display: "flex",
    flexDirection: 'row',
    backgroundColor: "#262626",
    color: "#ffffff",
    alignItems: 'center',
    marginBottom: '20pt',
  },
  photo: {
    display: "flex",
    width: '80pt',
    height: '80pt',
    borderRadius: '50%',
  },
  fakePhoto: {
    width: "80pt",
    height: "80pt",
    position: "absolute",
    borderRadius: '50%',
  },
  nameAndContacts: {
    display: "flex",
    flexDirection: 'column',
    marginLeft: '30pt'
  },
  name: {
    fontSize: '24pt',
    fontWeight: 'bold',
  },
  contactBlock: {
    gap: "10px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  contact: {
    fontSize: '12pt',
    marginTop: '5pt',
  },
  content: {
    display: "flex",
    flexDirection: "row",
    padding: `${spacing[0]} ${spacing[20]}`
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    marginRight: "20pt"
  },
  rightCol: {
    borderLeft: "1px solid grey",
    flexDirection: "column",
    display: "flex",
    width: "30%"
  },
  skills: {
    flexDirection: "column"
  },
  qr: {
    display: "flex",
    width: "80px",
    height: "80px"
  },
  fakeqr: {
    position: "relative",
    top: "-80px",
    display: "flex",
    width: "80px",
    height: "80px"
  },
  qrContainer: {
    marginTop: "30pt",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    alignContent: "space-around"
  }
});


export const Strict = ({
  resume,
  settings,
  Profile,
  // allComponents,
  showFormsOrder,
  formTypeToComponent
}: {
  resume: Resume,
  settings: Settings,
  Profile: React.FC,
  // allComponents: any,
  formTypeToComponent: any,
  showFormsOrder: any

  // themeColor: string
}) => {
  const { profile } = resume
  const { name, email, phone, url, summary, location, photo } = profile;

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


  return (
    <View>
      <View style={styles.header}>
        <img style={styles.fakePhoto} src={profile.photo} />
        <Image src={profile.photo} style={styles.photo} />
        <View style={styles.nameAndContacts}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactBlock}>
            <Text style={styles.contact}>{profile.email}</Text>
            <Text style={styles.contact}>{profile.phone}</Text>
            <Text style={styles.contact}>{profile.location}</Text>
            <Text style={styles.contact}>{profile.url}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.leftCol}>
          {showFormsOrder.map((form: any) => {
            if ((form != "skills") && (form != "custom")) {
              const Component = formTypeToComponent[form];
              return <Component key={form} />;
            }
          })}
        </View>

        <View style={styles.rightCol}>
          {showFormsOrder.map((form: any) => {
            if ((form == "skills") || (form == "custom")) {
              console.log("ONE SKILL", form)
              const Component = formTypeToComponent[form];
              return <Component style={{ flexDirection: "column" }} key={form} />;
            }
          })}
          <View style={styles.qrContainer}>
            <Text>QR-код</Text>
            {qrCodeBase64 && (
              <Image style={styles.qr} src={qrCodeBase64} />
            )}
            <img style={styles.fakeqr} src={qrCodeBase64 || ""} />
          </View>

        </View>


        {/* Дополнительное содержимое документа */}
      </View>
    </View>
  )
}