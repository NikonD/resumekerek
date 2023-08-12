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
      works: {
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          fleDirection: "row"
        }
      },
      edu: {
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          fleDirection: "row"
        }
      },

      project: {
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          fleDirection: "row"
        }
      },

      skills: {
        heading: {
          justifyContent: "start"
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
      },
      custom: {
        heading: {
          justifyContent: "start"
        }
      },
      block: {
        display: "flex",
        flexDirection: "column",
        // flexFlow: "column wrap",
        // placeContent: "space-around space-between",
      }
    }
  },
  {
    title: "Строгий",
    name: "strict",
    requiredPlan: false,
    columns: {
      works: {
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          fleDirection: "row"
        }
      },
      edu: {
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          fleDirection: "row"
        }
      },

      project: {
        flow: {
          display: "flex",
          flexDirection: "column"
        },
        company: {
          display: "flex",
          justifyContent: "space-between",
          fleDirection: "row"
        }
      },

      skills: {
        heading: {
          justifyContent: "center"
        },
        featured: {
          flexDirection: "column",
          display: 'flex',
          gap: "10px",
          flexFlow: "column wrap",
          placeContent: "space-around space-between",
        },
        bullet: {
          display: "flex",
          flexDirection: "column",
          flexFlow: "column wrap",
          placeContent: "space-around space-between",
        }
      },
      custom: {
        heading: {
          justifyContent: "center"
        },
        block: {
          display: "flex",
          flexDirection: "column",
          flexFlow: "column wrap",
          placeContent: "space-around space-between",
        }
      }
    }
  }
]