import { StyleSheet } from "@react-pdf/renderer";

export const THEME_COLORS = [
  "#f87171", // Red-400
  "#ef4444", // Red-500
  "#fb923c", // Orange-400
  "#f97316", // Orange-500
  "#fbbf24", // Amber-400
  "#f59e0b", // Amber-500
  "#22c55e", // Green-500
  "#15803d", // Green-700
  "#38bdf8", // Sky-400
  "#0ea5e9", // Sky-500
  "#818cf8", // Indigo-400
  "#6366f1", // Indigo-500
];


export const THEME_RESUME = [
  {
    title: "Простой",
    name: "simple",
    requiredPlan: false,
    columns: {
      works: StyleSheet.create({
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row"
        }
      }),
      edu: StyleSheet.create({
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row"
        }
      }),

      project: StyleSheet.create({
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row"
        }
      }),

      skills: StyleSheet.create({
        heading: {
          justifyContent: "flex-start"
        },
        featured: {
          flexDirection: "row",
          display: 'flex',
          gap: "10px"
        },
        bullet: {
          display: "flex",
          flexDirection: "column",
        }
      }),
      custom: StyleSheet.create({
        heading: {
          justifyContent: "flex-start"
        }
      }),
      block: StyleSheet.create({
        block: {
          display: "flex",
          flexDirection: "column",
        }
      })
      // block: StyleSheet.create({
      //   display: "flex",
      //   flexDirection: "column",
      //   // flexFlow: "column wrap",
      //   // placeContent: "space-around space-between",
      // })
    }
  },
  {
    title: "Строгий",
    name: "strict",
    requiredPlan: false,
    columns: {
      works: StyleSheet.create({
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row"
        }
      }),
      edu: StyleSheet.create({
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row"
        }
      }),

      project: StyleSheet.create({
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row"
        }
      }),

      skills: StyleSheet.create({
        heading: {
          justifyContent: "center"
        },
        featured: {
          flexDirection: "column",
          display: 'flex',
          marginLeft: "10.5pt"
          // gap: "10px",
          // alignContent: "space-around",
          // flexWrap: "wrap"
          // placeContent: "space-around space-between",
        },
        featuredBlock: {
          display: "flex",
          flexDirection:"column",
          alignItems: "flex-start"
        },
        bullet: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginLeft: "10.5pt"
        }
      }),
      custom: StyleSheet.create({
        heading: {
          justifyContent: "center"
        },
        block: {
          display: "flex",
          flexDirection: "column",
          justifyContent:"space-between",
          alignContent: "center"
        }
      })
    }
  },
  // {
  //   title: "Современный",
  //   name: "feature"
  // }
]