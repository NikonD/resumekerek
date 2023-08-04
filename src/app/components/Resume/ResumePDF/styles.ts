import { StyleSheet, Font } from "@react-pdf/renderer";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { FONT_FAMILIES } from "public/fonts/fonts";

FONT_FAMILIES.forEach((fontFamily) => {
  Font.register({
    family: fontFamily,
    fonts: [
      {
        src: `fonts/${fontFamily}-Regular.ttf`,
      },
      {
        src: `fonts/${fontFamily}-Bold.ttf`,
        fontWeight: "bold",
      },
    ],
  });
});

// Disable hyphenation https://github.com/diegomura/react-pdf/issues/311#issuecomment-548301604
Font.registerHyphenationCallback((word) => [word]);

// Tailwindcss Spacing Design System: https://tailwindcss.com/docs/theme#spacing
// It is converted from rem to pt (1rem = 12pt) since https://react-pdf.org/styling only accepts pt unit
export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  7: "21pt",
  8: "24pt",
  9: "27pt",
  10: "30pt",
  11: "33pt",
  12: "36pt",
  14: "42pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
  28: "84pt",
  32: "96pt",
  36: "108pt",
  40: "120pt",
  44: "132pt",
  48: "144pt",
  52: "156pt",
  56: "168pt",
  60: "180pt",
  64: "192pt",
  72: "216pt",
  80: "240pt",
  96: "288pt",
  full: "100%",
} as const;

export const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexContactsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexSkills: {
    display:'flex',
    flexDirection: "row",
    gap: "10px"
  },

  flexRowBetween: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  leftSide: {
    padding: "10px",
    flex: 1,
    maxWidth: "33%",
    height: "100vh",
    
  },
  lefSideFlex: {
    display: 'flex',
    flexDirection: "column",
    alignContent: "space-between"
  },
  rightSide: {
    paddingLeft: "10px",
    paddingRight: "10px",
    flex: 2
  },
  leftHeading: {

  },
  icon: {
    width: "13pt",
    height: "13pt",
    fill: "#525252", // text-neutral-600
  },
  qrRow: {
    display: "flex"
  },
  userPhoto: {
    width: "240px",
    height: "80px",
    // border: "1px solid black",
    // marginRight: "50px"
  },
  userPhotoFake: {
    width: "240px",
    height: "80px",
    position: "relative",
    left: "-120px",

  },
  image: {
    width: "240px",
    // minWidth: "64px",
    // minHeight: "64px",
    height: "80px",
    // border: "1px solid black",
  },
  imageFake: {
    width: "80px",
    height: "80px"
  },
  flexColSkills: {
    flex: 1
    // display: "grid",
  }
});
