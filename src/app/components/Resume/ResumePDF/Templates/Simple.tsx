import { View } from "@react-pdf/renderer"
import { Settings } from "lib/redux/settingsSlice"
import { spacing, styles } from "../styles"

export const Simple = ({
  settings,
  Profile,
  // allComponents,
  showFormsOrder,
  formTypeToComponent
}: {
  settings: Settings,
  Profile: React.FC,
  // allComponents: any,
  formTypeToComponent: any,
  showFormsOrder: any

  // themeColor: string
}) => {
  return (
    <>
      {Boolean(settings.themeColor) && (
        <View
          style={{
            width: spacing["full"],
            height: spacing[3.5],
            backgroundColor: settings.themeColor,
          }}
        />
      )}
      <View
        style={{
          ...styles.flexCol,
          padding: `${spacing[0]} ${spacing[20]}`,
        }}
      >

        <Profile />
        {showFormsOrder.map((form: any) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
      </View>
    </>


  )

}