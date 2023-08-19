import { Settings } from "lib/redux/settingsSlice"
import React from "react"
import { Simple } from "./Templates/Simple"
import { Resume } from "lib/redux/types"
import { Strict } from "./Templates/Strict"

export const TemplateGenerator = ({
  resume,
  themeResume,
  themeResumeName,
  formTypeToComponent,
  showFormsOrder,
  profile,
  // allComponents,
  settings
}: {
  resume: Resume,
  themeResume: object,
  themeResumeName: string,
  formTypeToComponent: any,
  showFormsOrder: any
  profile: React.FC
  // allComponents: React.Component
  settings: Settings
}) => {
  return (
    <div>
      {
        themeResumeName == "simple" &&
        <Simple
          settings={settings}
          Profile={profile}
          formTypeToComponent={formTypeToComponent}
          showFormsOrder={showFormsOrder}
        />}
      {
        themeResumeName == "strict" &&
        <Strict
          resume={resume}
          settings={settings}
          formTypeToComponent={formTypeToComponent}
          showFormsOrder={showFormsOrder}
          Profile={profile} />}
    </div>
  )
}

